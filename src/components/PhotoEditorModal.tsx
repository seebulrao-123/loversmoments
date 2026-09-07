import React, { useState, useRef } from 'react';
import { 
  X, ZoomIn, ZoomOut, Move, RotateCw, RotateCcw, Sliders, 
  Palette, Maximize2, Minimize2, Check, RefreshCw, Layers, Type, Sparkles
} from 'lucide-react';
import { 
  PhotoItem, PhotoFrameType, PhotoAdjustments, PhotoFrameStyle, PhotoCropZoom 
} from '../types';
import { PhotoFrameRenderer, FRAME_DESCRIPTIONS } from './PhotoFrameRenderer';

interface PhotoEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  photo: PhotoItem | null;
  onSavePhoto: (updated: PhotoItem) => void;
}

export const PhotoEditorModal: React.FC<PhotoEditorModalProps> = ({
  isOpen,
  onClose,
  photo,
  onSavePhoto,
}) => {
  if (!isOpen || !photo) return null;

  const [activeTab, setActiveTab] = useState<'crop' | 'frame' | 'adjust' | 'size' | 'caption'>('crop');
  const [selectedFrameCategory, setSelectedFrameCategory] = useState<string>('all');

  // Local draft state
  const [draft, setDraft] = useState<PhotoItem>({ ...photo });

  // Pan dragging inside the crop preview
  const panStartRef = useRef<{ startX: number; startY: number; initialPanX: number; initialPanY: number } | null>(null);

  const cropZoom: PhotoCropZoom = draft.cropZoom || {
    zoom: 100,
    panX: 0,
    panY: 0,
    fitMode: 'cover',
  };

  const adjustments: PhotoAdjustments = draft.adjustments || {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
    warmth: 0,
    blur: 0,
    vintageFaded: false,
  };

  const frameStyle: PhotoFrameStyle = draft.frameStyle || {
    borderThickness: 2,
    padding: 8,
    cornerRadius: 4,
    shadowSize: 12,
    shadowOpacity: 0.25,
  };

  const updateCropZoom = (partial: Partial<PhotoCropZoom>) => {
    setDraft(prev => ({
      ...prev,
      cropZoom: {
        ...(prev.cropZoom || { zoom: 100, panX: 0, panY: 0, fitMode: 'cover' }),
        ...partial,
      },
    }));
  };

  const updateAdjustments = (partial: Partial<PhotoAdjustments>) => {
    setDraft(prev => ({
      ...prev,
      adjustments: {
        ...(prev.adjustments || { brightness: 100, contrast: 100, saturation: 100, sepia: 0, warmth: 0, blur: 0, vintageFaded: false }),
        ...partial,
      },
    }));
  };

  const updateFrameStyle = (partial: Partial<PhotoFrameStyle>) => {
    setDraft(prev => ({
      ...prev,
      frameStyle: {
        ...(prev.frameStyle || {}),
        ...partial,
      },
    }));
  };

  // Preset Zoom options
  const handleZoomPreset = (zoomValue: number) => {
    updateCropZoom({ zoom: zoomValue });
  };

  // Pan gesture inside crop preview
  const handlePanDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    panStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialPanX: cropZoom.panX,
      initialPanY: cropZoom.panY,
    };
  };

  const handlePanMove = (e: React.PointerEvent) => {
    if (!panStartRef.current) return;
    const dx = e.clientX - panStartRef.current.startX;
    const dy = e.clientY - panStartRef.current.startY;

    // Sensible pan scaling
    const panFactor = 0.5;
    const newPanX = Math.round(panStartRef.current.initialPanX + dx * panFactor);
    const newPanY = Math.round(panStartRef.current.initialPanY + dy * panFactor);

    updateCropZoom({ panX: newPanX, panY: newPanY });
  };

  const handlePanUp = (e: React.PointerEvent) => {
    if (panStartRef.current) {
      const target = e.currentTarget as HTMLElement;
      if (target && target.hasPointerCapture(e.pointerId)) {
        target.releasePointerCapture(e.pointerId);
      }
      panStartRef.current = null;
    }
  };

  // Quick rotations
  const handleRotate = (degrees: number) => {
    const newRot = (draft.rotation + degrees) % 360;
    setDraft(prev => ({ ...prev, rotation: newRot }));
  };

  // Frame size presets
  const handleSizePreset = (w: number, h: number) => {
    setDraft(prev => ({ ...prev, width: w, height: h }));
  };

  // Save changes
  const handleSave = () => {
    onSavePhoto(draft);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs">
      <div 
        className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-xl overflow-hidden shadow-2xl border border-[#a67c52]/60 text-[#3b2716]"
        style={{
          backgroundColor: '#f7f1e5',
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(210,180,140,0.2) 0%, transparent 80%)',
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#cca77d]/40 bg-[#eedfc5]/70">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#82542a]" />
            <div>
              <h2 className="text-base font-serif font-bold text-[#442c16]">Advanced Photo & Frame Studio</h2>
              <p className="text-xs text-[#78593a]">Crop, zoom, styling, and vintage frames</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-[#82542a] text-[#fff7ec] text-xs font-serif font-semibold hover:bg-[#68411e] shadow-xs transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" /> Apply Changes
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#735133] hover:bg-[#e4cfb2] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Content: Left = Live Preview, Right = Controls */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* LEFT: Live Interactive Preview Container */}
          <div 
            className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#cca77d]/40"
            style={{
              backgroundColor: '#261910',
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(68,43,26,0.5) 0%, rgba(18,11,6,0.95) 100%)',
            }}
          >
            <div className="text-center mb-3">
              <span className="text-xs font-serif text-[#d6bda0] italic">
                Live Frame & Photo Preview
              </span>
              <p className="text-[11px] text-[#9e7d5d]">
                {activeTab === 'crop' ? 'Drag directly on the photo below to pan / re-position' : 'Preview updates in real-time'}
              </p>
            </div>

            {/* Frame Box */}
            <div 
              className="relative transition-all cursor-move flex items-center justify-center"
              style={{
                width: `${Math.min(300, draft.width)}px`,
                height: `${Math.min(340, draft.height)}px`,
                transform: `rotate(${draft.rotation}deg)`,
              }}
              onPointerDown={activeTab === 'crop' ? handlePanDown : undefined}
              onPointerMove={activeTab === 'crop' ? handlePanMove : undefined}
              onPointerUp={handlePanUp}
            >
              <PhotoFrameRenderer photo={draft} />

              {/* Crop indicator guide overlay when in crop tab */}
              {activeTab === 'crop' && (
                <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-[#82542a]/40 rounded-xs flex items-center justify-center">
                  <span className="p-1 rounded bg-black/60 text-white text-[10px] font-mono shadow-xs backdrop-blur-xs">
                    Zoom: {cropZoom.zoom}% | Pan: {cropZoom.panX}%, {cropZoom.panY}%
                  </span>
                </div>
              )}
            </div>

            {/* Quick Rotate & Reset buttons */}
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => handleRotate(-90)}
                className="p-1.5 rounded-md bg-[#3c2517] text-[#edd9b2] hover:bg-[#523420] text-xs font-serif flex items-center gap-1 border border-[#805934]/60"
                title="Rotate 90° Left"
              >
                <RotateCcw className="w-3.5 h-3.5" /> -90°
              </button>
              <button
                onClick={() => handleRotate(90)}
                className="p-1.5 rounded-md bg-[#3c2517] text-[#edd9b2] hover:bg-[#523420] text-xs font-serif flex items-center gap-1 border border-[#805934]/60"
                title="Rotate 90° Right"
              >
                <RotateCw className="w-3.5 h-3.5" /> +90°
              </button>
              <button
                onClick={() => setDraft(prev => ({ ...prev, rotation: 0 }))}
                className="p-1.5 rounded-md bg-[#3c2517] text-[#edd9b2] hover:bg-[#523420] text-xs font-serif border border-[#805934]/60"
                title="Reset Rotation"
              >
                0° Reset
              </button>
            </div>
          </div>

          {/* RIGHT: Multi-Tab Controls */}
          <div className="w-full md:w-1/2 flex flex-col bg-[#f7f1e5]">
            {/* Tabs Header */}
            <div className="flex border-b border-[#cca77d]/40 bg-[#ebdcc2]/60 overflow-x-auto">
              {[
                { id: 'crop', label: 'Crop & Zoom', icon: ZoomIn },
                { id: 'frame', label: 'Frame Design', icon: Layers },
                { id: 'size', label: 'Size & Style', icon: Maximize2 },
                { id: 'adjust', label: 'Photo Filter', icon: Sparkles },
                { id: 'caption', label: 'Caption', icon: Type },
              ].map(tab => {
                const Icon = tab.icon;
                const isCurrent = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1 px-3 py-2.5 text-xs font-serif font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                      isCurrent
                        ? 'border-[#82542a] text-[#442c16] bg-[#f7f1e5]'
                        : 'border-transparent text-[#78593a] hover:bg-[#e4d4b9]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Body */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 max-h-[55vh] md:max-h-[60vh]">
              {/* ==================================================== */}
              {/* TAB 1: CROP & ZOOM                                   */}
              {/* ==================================================== */}
              {activeTab === 'crop' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-serif font-bold text-[#442c16]">
                        Photo Zoom inside Frame
                      </span>
                      <span className="text-xs font-mono text-[#82542a] font-semibold">
                        {cropZoom.zoom}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="300"
                      step="5"
                      value={cropZoom.zoom}
                      onChange={(e) => updateCropZoom({ zoom: Number(e.target.value) })}
                      className="w-full accent-[#82542a]"
                    />
                  </div>

                  {/* Preset Zoom buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-serif text-[#78593a] mr-1">Presets:</span>
                    {[50, 75, 100, 125, 150, 200, 250].map((z) => (
                      <button
                        key={z}
                        onClick={() => handleZoomPreset(z)}
                        className={`px-2.5 py-1 rounded text-xs font-serif font-medium border transition-colors ${
                          cropZoom.zoom === z
                            ? 'bg-[#82542a] text-white border-[#82542a]'
                            : 'bg-[#faf6ee] text-[#543b24] border-[#cca77d]/60 hover:bg-[#ecd8be]'
                        }`}
                      >
                        {z}%
                      </button>
                    ))}
                  </div>

                  {/* Image Fit Mode */}
                  <div className="p-3 rounded-lg border border-[#cca77d]/40 bg-[#fbf8f0] space-y-2">
                    <span className="text-xs font-serif font-bold text-[#442c16] block">
                      Frame Fitting Mode
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => updateCropZoom({ fitMode: 'cover' })}
                        className={`p-2 rounded border text-xs font-serif font-medium flex items-center justify-center gap-1.5 transition-colors ${
                          cropZoom.fitMode === 'cover'
                            ? 'bg-[#82542a] text-white border-[#82542a]'
                            : 'bg-white text-[#543b24] border-[#cca77d]/60 hover:bg-[#f6ebd9]'
                        }`}
                      >
                        <Maximize2 className="w-3.5 h-3.5" /> Fill Frame (Cover)
                      </button>
                      <button
                        onClick={() => updateCropZoom({ fitMode: 'contain' })}
                        className={`p-2 rounded border text-xs font-serif font-medium flex items-center justify-center gap-1.5 transition-colors ${
                          cropZoom.fitMode === 'contain'
                            ? 'bg-[#82542a] text-white border-[#82542a]'
                            : 'bg-white text-[#543b24] border-[#cca77d]/60 hover:bg-[#f6ebd9]'
                        }`}
                      >
                        <Minimize2 className="w-3.5 h-3.5" /> Fit Image (Contain)
                      </button>
                    </div>
                  </div>

                  {/* Manual Pan sliders */}
                  <div className="p-3 rounded-lg border border-[#cca77d]/40 bg-[#fbf8f0] space-y-3">
                    <span className="text-xs font-serif font-bold text-[#442c16] block">
                      Pan / Move Photo Inside Frame
                    </span>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-serif">
                        <span className="text-[#6e5033]">Horizontal Pan:</span>
                        <span className="font-mono text-[#82542a]">{cropZoom.panX}%</span>
                      </div>
                      <input
                        type="range"
                        min="-100"
                        max="100"
                        value={cropZoom.panX}
                        onChange={(e) => updateCropZoom({ panX: Number(e.target.value) })}
                        className="w-full accent-[#82542a]"
                      />

                      <div className="flex items-center justify-between text-xs font-serif">
                        <span className="text-[#6e5033]">Vertical Pan:</span>
                        <span className="font-mono text-[#82542a]">{cropZoom.panY}%</span>
                      </div>
                      <input
                        type="range"
                        min="-100"
                        max="100"
                        value={cropZoom.panY}
                        onChange={(e) => updateCropZoom({ panY: Number(e.target.value) })}
                        className="w-full accent-[#82542a]"
                      />
                    </div>

                    <button
                      onClick={() => updateCropZoom({ zoom: 100, panX: 0, panY: 0, fitMode: 'cover' })}
                      className="w-full py-1 rounded bg-[#ecd8be] text-[#543b24] text-xs font-serif hover:bg-[#dfc8ac] transition-colors flex items-center justify-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" /> Reset Crop & Zoom
                    </button>
                  </div>
                </div>
              )}

              {/* ==================================================== */}
              {/* TAB 2: FRAME DESIGN (60+ DESIGNS)                    */}
              {/* ==================================================== */}
              {activeTab === 'frame' && (
                <div className="space-y-3">
                  <p className="text-xs font-serif text-[#78593a]">
                    Select any vintage or scrapbook frame design. You can change frames at any time without resetting the photo!
                  </p>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap pb-1">
                    {[
                      { id: 'all', label: 'All (60+)' },
                      { id: 'Simple', label: 'Simple' },
                      { id: 'Polaroid', label: 'Polaroid' },
                      { id: 'Botanical', label: 'Botanical' },
                      { id: 'Vintage', label: 'Vintage' },
                      { id: 'Scrapbook', label: 'Scrapbook' },
                      { id: 'Film', label: 'Film' },
                      { id: 'Decorative', label: 'Decorative' },
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedFrameCategory(cat.id)}
                        className={`px-2 py-1 rounded-full text-xs font-serif transition-colors cursor-pointer ${
                          selectedFrameCategory === cat.id
                            ? 'bg-[#82542a] text-white font-bold shadow-xs'
                            : 'bg-[#ebdcc2] text-[#543b24] hover:bg-[#dfc8ac]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {(Object.keys(FRAME_DESCRIPTIONS) as PhotoFrameType[])
                      .filter(frameId => {
                        if (selectedFrameCategory === 'all') return true;
                        return FRAME_DESCRIPTIONS[frameId].category === selectedFrameCategory;
                      })
                      .map((frameId) => {
                        const info = FRAME_DESCRIPTIONS[frameId];
                        const isSelected = draft.frame === frameId;

                        return (
                          <button
                            key={frameId}
                            onClick={() => setDraft(prev => ({ ...prev, frame: frameId }))}
                            className={`p-2.5 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#82542a] text-white border-[#82542a] shadow-md ring-2 ring-[#82542a]/30'
                                : 'bg-[#fbf8f0] text-[#442c16] border-[#cca77d]/60 hover:bg-[#f3e5d0]'
                            }`}
                          >
                            <div>
                              <span className="text-xs font-serif font-bold block">{info.name}</span>
                              <span className={`text-[10px] uppercase tracking-wider block ${
                                isSelected ? 'text-[#f2deb8]' : 'text-[#8c6742]'
                              }`}>
                                {info.category}
                              </span>
                            </div>
                            {isSelected && <span className="text-right text-xs">✓</span>}
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* ==================================================== */}
              {/* TAB 3: SIZE & FRAME STYLING                          */}
              {/* ==================================================== */}
              {activeTab === 'size' && (
                <div className="space-y-4">
                  {/* Preset Frame Sizes */}
                  <div className="p-3 rounded-lg border border-[#cca77d]/40 bg-[#fbf8f0] space-y-2">
                    <span className="text-xs font-serif font-bold text-[#442c16] block">
                      Frame Dimensions Preset
                    </span>
                    <div className="grid grid-cols-4 gap-2 text-xs font-serif">
                      <button
                        onClick={() => handleSizePreset(160, 190)}
                        className="p-1.5 rounded border border-[#cca77d]/60 bg-white hover:bg-[#ebdcc2] text-center"
                      >
                        Small (160×190)
                      </button>
                      <button
                        onClick={() => handleSizePreset(220, 260)}
                        className="p-1.5 rounded border border-[#cca77d]/60 bg-white hover:bg-[#ebdcc2] text-center"
                      >
                        Medium (220×260)
                      </button>
                      <button
                        onClick={() => handleSizePreset(280, 330)}
                        className="p-1.5 rounded border border-[#cca77d]/60 bg-white hover:bg-[#ebdcc2] text-center"
                      >
                        Large (280×330)
                      </button>
                      <button
                        onClick={() => handleSizePreset(340, 400)}
                        className="p-1.5 rounded border border-[#cca77d]/60 bg-white hover:bg-[#ebdcc2] text-center"
                      >
                        XL (340×400)
                      </button>
                    </div>
                  </div>

                  {/* Free Dimension Sliders */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs font-serif text-[#6e5033] block mb-1">
                        Width: {draft.width}px
                      </span>
                      <input
                        type="range"
                        min="120"
                        max="500"
                        value={draft.width}
                        onChange={(e) => setDraft(prev => ({ ...prev, width: Number(e.target.value) }))}
                        className="w-full accent-[#82542a]"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-serif text-[#6e5033] block mb-1">
                        Height: {draft.height}px
                      </span>
                      <input
                        type="range"
                        min="120"
                        max="500"
                        value={draft.height}
                        onChange={(e) => setDraft(prev => ({ ...prev, height: Number(e.target.value) }))}
                        className="w-full accent-[#82542a]"
                      />
                    </div>
                  </div>

                  {/* Border Thickness & Padding */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs font-serif text-[#6e5033] block mb-1">
                        Border Thickness: {frameStyle.borderThickness ?? 2}px
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={frameStyle.borderThickness ?? 2}
                        onChange={(e) => updateFrameStyle({ borderThickness: Number(e.target.value) })}
                        className="w-full accent-[#82542a]"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-serif text-[#6e5033] block mb-1">
                        Inner Mat Padding: {frameStyle.padding ?? 8}px
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="30"
                        value={frameStyle.padding ?? 8}
                        onChange={(e) => updateFrameStyle({ padding: Number(e.target.value) })}
                        className="w-full accent-[#82542a]"
                      />
                    </div>
                  </div>

                  {/* Corner Radius & Shadow */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs font-serif text-[#6e5033] block mb-1">
                        Corner Rounding: {frameStyle.cornerRadius ?? 4}px
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="40"
                        value={frameStyle.cornerRadius ?? 4}
                        onChange={(e) => updateFrameStyle({ cornerRadius: Number(e.target.value) })}
                        className="w-full accent-[#82542a]"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-serif text-[#6e5033] block mb-1">
                        Drop Shadow: {frameStyle.shadowSize ?? 12}px
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="30"
                        value={frameStyle.shadowSize ?? 12}
                        onChange={(e) => updateFrameStyle({ shadowSize: Number(e.target.value) })}
                        className="w-full accent-[#82542a]"
                      />
                    </div>
                  </div>

                  {/* Frame Colors */}
                  <div className="p-3 rounded-lg border border-[#cca77d]/40 bg-[#fbf8f0] space-y-2">
                    <span className="text-xs font-serif font-bold text-[#442c16] block">
                      Custom Color Overrides
                    </span>
                    <div className="flex items-center gap-4 flex-wrap text-xs font-serif">
                      <label className="flex items-center gap-1.5">
                        <span className="text-[#6e5033]">Mat Color:</span>
                        <input
                          type="color"
                          value={frameStyle.frameColor || '#faf7ee'}
                          onChange={(e) => updateFrameStyle({ frameColor: e.target.value })}
                          className="w-6 h-6 rounded border cursor-pointer p-0 bg-transparent"
                        />
                      </label>
                      <label className="flex items-center gap-1.5">
                        <span className="text-[#6e5033]">Border Color:</span>
                        <input
                          type="color"
                          value={frameStyle.borderColor || '#78593a'}
                          onChange={(e) => updateFrameStyle({ borderColor: e.target.value })}
                          className="w-6 h-6 rounded border cursor-pointer p-0 bg-transparent"
                        />
                      </label>
                      <label className="flex items-center gap-1.5">
                        <span className="text-[#6e5033]">Tape Color:</span>
                        <input
                          type="color"
                          value={frameStyle.tapeColor || '#deb887'}
                          onChange={(e) => updateFrameStyle({ tapeColor: e.target.value })}
                          className="w-6 h-6 rounded border cursor-pointer p-0 bg-transparent"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================================================== */}
              {/* TAB 4: PHOTO ADJUSTMENTS (BRIGHTNESS, CONTRAST, ETC) */}
              {/* ==================================================== */}
              {activeTab === 'adjust' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded bg-[#faf6ee] border border-[#cca77d]/40">
                    <span className="text-xs font-serif font-semibold text-[#442c16]">
                      Vintage Faded Film Effect
                    </span>
                    <input
                      type="checkbox"
                      checked={adjustments.vintageFaded}
                      onChange={(e) => updateAdjustments({ vintageFaded: e.target.checked })}
                      className="w-4 h-4 accent-[#82542a] cursor-pointer"
                    />
                  </div>

                  {/* Brightness */}
                  <div>
                    <div className="flex justify-between text-xs font-serif text-[#6e5033] mb-1">
                      <span>Brightness</span>
                      <span>{adjustments.brightness}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={adjustments.brightness}
                      onChange={(e) => updateAdjustments({ brightness: Number(e.target.value) })}
                      className="w-full accent-[#82542a]"
                    />
                  </div>

                  {/* Contrast */}
                  <div>
                    <div className="flex justify-between text-xs font-serif text-[#6e5033] mb-1">
                      <span>Contrast</span>
                      <span>{adjustments.contrast}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={adjustments.contrast}
                      onChange={(e) => updateAdjustments({ contrast: Number(e.target.value) })}
                      className="w-full accent-[#82542a]"
                    />
                  </div>

                  {/* Saturation */}
                  <div>
                    <div className="flex justify-between text-xs font-serif text-[#6e5033] mb-1">
                      <span>Saturation</span>
                      <span>{adjustments.saturation}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={adjustments.saturation}
                      onChange={(e) => updateAdjustments({ saturation: Number(e.target.value) })}
                      className="w-full accent-[#82542a]"
                    />
                  </div>

                  {/* Sepia */}
                  <div>
                    <div className="flex justify-between text-xs font-serif text-[#6e5033] mb-1">
                      <span>Sepia / Antique Tone</span>
                      <span>{adjustments.sepia}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={adjustments.sepia}
                      onChange={(e) => updateAdjustments({ sepia: Number(e.target.value) })}
                      className="w-full accent-[#82542a]"
                    />
                  </div>

                  {/* Warmth */}
                  <div>
                    <div className="flex justify-between text-xs font-serif text-[#6e5033] mb-1">
                      <span>Warmth Shift</span>
                      <span>{adjustments.warmth}</span>
                    </div>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={adjustments.warmth}
                      onChange={(e) => updateAdjustments({ warmth: Number(e.target.value) })}
                      className="w-full accent-[#82542a]"
                    />
                  </div>

                  {/* Blur */}
                  <div>
                    <div className="flex justify-between text-xs font-serif text-[#6e5033] mb-1">
                      <span>Soft Focus Blur</span>
                      <span>{adjustments.blur}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={adjustments.blur}
                      onChange={(e) => updateAdjustments({ blur: Number(e.target.value) })}
                      className="w-full accent-[#82542a]"
                    />
                  </div>

                  {/* Reset Adjustments */}
                  <button
                    onClick={() => updateAdjustments({
                      brightness: 100,
                      contrast: 100,
                      saturation: 100,
                      sepia: 0,
                      warmth: 0,
                      blur: 0,
                      vintageFaded: false,
                    })}
                    className="w-full py-1.5 rounded bg-[#ecd8be] text-[#543b24] text-xs font-serif hover:bg-[#dfc8ac] transition-colors"
                  >
                    Reset All Photo Filters
                  </button>
                </div>
              )}

              {/* ==================================================== */}
              {/* TAB 5: CAPTION                                       */}
              {/* ==================================================== */}
              {activeTab === 'caption' && (
                <div className="space-y-3">
                  <span className="text-xs font-serif font-bold text-[#442c16] block">
                    Polaroid / Photo Caption
                  </span>
                  <p className="text-xs text-[#78593a]">
                    For Polaroid frames, this text will appear handwritten at the bottom of the photo.
                  </p>
                  <input
                    type="text"
                    value={draft.caption || ''}
                    onChange={(e) => setDraft(prev => ({ ...prev, caption: e.target.value }))}
                    placeholder="E.g., Summer in Provence, 1968"
                    className="w-full p-2 rounded border border-[#cca77d] bg-white font-serif text-sm text-[#442c16]"
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#cca77d]/40 bg-[#eedfc5]/60 flex items-center justify-between">
              <span className="text-xs font-serif text-[#78593a]">
                Non-destructive: original photo data is preserved
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg border border-[#cca77d] bg-white text-[#543b24] text-xs font-serif hover:bg-[#f6ebd9] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-1.5 rounded-lg bg-[#82542a] text-white text-xs font-serif font-semibold hover:bg-[#68411e] shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
