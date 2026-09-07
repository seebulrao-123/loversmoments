import React, { useState, useRef } from 'react';
import { 
  Trash2, Copy, Move, RotateCw, RotateCcw, Type, Image as ImageIcon,
  BringToFront, SendToBack, Check, Lock, Unlock, Sliders, Layers, RefreshCw
} from 'lucide-react';
import { 
  DiaryPage, TextItem, PhotoItem, StickerItem, InteractionMode,
  DrawingTool, DrawingStroke, PhotoFrameType
} from '../types';
import { getPageBackgroundStyle } from '../utils/textures';
import { STICKER_CATALOG } from '../utils/stickers';
import { DrawingLayer } from './DrawingLayer';
import { PhotoFrameRenderer } from './PhotoFrameRenderer';
import { PhotoEditorModal } from './PhotoEditorModal';

interface PageCanvasProps {
  page: DiaryPage;
  pageSide?: 'left' | 'right' | 'single';
  width: number;
  height: number;
  mode: InteractionMode;
  showPageNumber?: boolean;
  activeTool: DrawingTool;
  drawingColor: string;
  drawingSize: number;
  drawingOpacity: number;
  onUpdatePage: (updatedPage: DiaryPage) => void;
  onSelectObject?: (type: 'text' | 'photo' | 'sticker', id: string) => void;
}

export const PageCanvas: React.FC<PageCanvasProps> = ({
  page,
  pageSide = 'single',
  width,
  height,
  mode,
  showPageNumber = true,
  activeTool,
  drawingColor,
  drawingSize,
  drawingOpacity,
  onUpdatePage,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'text' | 'photo' | 'sticker' | null>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);

  // Photo Editor Modal state
  const [photoForEditor, setPhotoForEditor] = useState<PhotoItem | null>(null);
  const [isPhotoEditorOpen, setIsPhotoEditorOpen] = useState<boolean>(false);

  // File input ref for replacing photo
  const replacePhotoInputRef = useRef<HTMLInputElement | null>(null);
  const replacingPhotoIdRef = useRef<string | null>(null);

  // Dragging & transformation refs
  const dragStartRef = useRef<{
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    initialWidth: number;
    initialHeight: number;
    initialRotation: number;
    action: 'move' | 'resize' | 'rotate';
  } | null>(null);

  // Background style
  const bgStyle = getPageBackgroundStyle(page.background);

  // Cover page rendering
  if (page.isCover) {
    return (
      <div 
        className="relative w-full h-full overflow-hidden select-none flex flex-col items-center justify-center p-6 sm:p-8 rounded-r-lg shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #3c2417 0%, #28170e 50%, #1a0f09 100%)',
          boxShadow: 'inset 0 0 80px rgba(0,0,0,0.8), inset 0 0 15px rgba(212,175,55,0.15)',
        }}
      >
        {/* Leather grain & texture effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, transparent 40%, #000 100%), repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 4px)`
          }}
        />

        {/* Vintage Gilded Embossed Border */}
        <div className="absolute inset-4 sm:inset-7 rounded-sm border-2 border-[#c8a165]/50 pointer-events-none flex flex-col justify-between p-2">
          <div className="w-full flex justify-between">
            <span className="text-[#c8a165]/60 text-xs font-serif">❦</span>
            <span className="text-[#c8a165]/60 text-xs font-serif">❦</span>
          </div>
          <div className="w-full flex justify-between">
            <span className="text-[#c8a165]/60 text-xs font-serif">❦</span>
            <span className="text-[#c8a165]/60 text-xs font-serif">❦</span>
          </div>
        </div>
        <div className="absolute inset-6 sm:inset-9 rounded-sm border border-[#c8a165]/25 pointer-events-none" />

        {/* Center Leather Medallion & Calligraphy Title */}
        <div className="relative z-10 text-center px-4 max-w-sm">
          <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-full border border-[#d4af37]/40 flex items-center justify-center bg-[#2b180f]/80 shadow-lg">
            <span className="text-[#e6ca85] text-xl sm:text-2xl font-serif">✦</span>
          </div>

          <h1 
            className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#ebd69e] tracking-wide font-normal mb-2 sm:mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            style={{ fontFamily: "'Alex Brush', 'Pinyon Script', cursive" }}
          >
            Moments..
          </h1>

          <div className="w-20 sm:w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent my-2 sm:my-3" />

          <p className="text-[11px] sm:text-sm font-serif italic text-[#c2a67e]/80 tracking-wider">
            A vintage collection of memories & thoughts
          </p>
        </div>

        {/* Physical book spine ridge on left */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
      </div>
    );
  }

  // Handle object updates
  const updateTextItem = (id: string, partial: Partial<TextItem>) => {
    const updated = page.texts.map(t => t.id === id ? { ...t, ...partial } : t);
    onUpdatePage({ ...page, texts: updated });
  };

  const updatePhotoItem = (id: string, partial: Partial<PhotoItem>) => {
    const updated = page.photos.map(p => p.id === id ? { ...p, ...partial } : p);
    onUpdatePage({ ...page, photos: updated });
  };

  const updateStickerItem = (id: string, partial: Partial<StickerItem>) => {
    const updated = page.stickers.map(s => s.id === id ? { ...s, ...partial } : s);
    onUpdatePage({ ...page, stickers: updated });
  };

  const deleteSelectedItem = () => {
    if (!selectedId) return;
    if (selectedType === 'text') {
      onUpdatePage({ ...page, texts: page.texts.filter(t => t.id !== selectedId) });
    } else if (selectedType === 'photo') {
      onUpdatePage({ ...page, photos: page.photos.filter(p => p.id !== selectedId) });
    } else if (selectedType === 'sticker') {
      onUpdatePage({ ...page, stickers: page.stickers.filter(s => s.id !== selectedId) });
    }
    setSelectedId(null);
    setSelectedType(null);
  };

  const duplicateSelectedItem = () => {
    if (!selectedId) return;
    const offset = 20;
    if (selectedType === 'text') {
      const item = page.texts.find(t => t.id === selectedId);
      if (item) {
        const copy: TextItem = {
          ...item,
          id: 'text_' + Date.now(),
          x: item.x + offset,
          y: item.y + offset,
        };
        onUpdatePage({ ...page, texts: [...page.texts, copy] });
        setSelectedId(copy.id);
      }
    } else if (selectedType === 'photo') {
      const item = page.photos.find(p => p.id === selectedId);
      if (item) {
        const copy: PhotoItem = {
          ...item,
          id: 'photo_' + Date.now(),
          x: item.x + offset,
          y: item.y + offset,
        };
        onUpdatePage({ ...page, photos: [...page.photos, copy] });
        setSelectedId(copy.id);
      }
    } else if (selectedType === 'sticker') {
      const item = page.stickers.find(s => s.id === selectedId);
      if (item) {
        const copy: StickerItem = {
          ...item,
          id: 'sticker_' + Date.now(),
          x: item.x + offset,
          y: item.y + offset,
        };
        onUpdatePage({ ...page, stickers: [...page.stickers, copy] });
        setSelectedId(copy.id);
      }
    }
  };

  const bringToFront = () => {
    if (!selectedId) return;
    const maxZ = Math.max(
      ...page.texts.map(t => t.zIndex || 1),
      ...page.photos.map(p => p.zIndex || 1),
      ...page.stickers.map(s => s.zIndex || 1),
      1
    ) + 1;

    if (selectedType === 'text') updateTextItem(selectedId, { zIndex: maxZ });
    else if (selectedType === 'photo') updatePhotoItem(selectedId, { zIndex: maxZ });
    else if (selectedType === 'sticker') updateStickerItem(selectedId, { zIndex: maxZ });
  };

  const sendToBack = () => {
    if (!selectedId) return;
    const minZ = Math.max(1, Math.min(
      ...page.texts.map(t => t.zIndex || 1),
      ...page.photos.map(p => p.zIndex || 1),
      ...page.stickers.map(s => s.zIndex || 1),
      1
    ) - 1);

    if (selectedType === 'text') updateTextItem(selectedId, { zIndex: minZ });
    else if (selectedType === 'photo') updatePhotoItem(selectedId, { zIndex: minZ });
    else if (selectedType === 'sticker') updateStickerItem(selectedId, { zIndex: minZ });
  };

  const toggleLockSelected = () => {
    if (!selectedId) return;
    if (selectedType === 'photo') {
      const p = page.photos.find(ph => ph.id === selectedId);
      if (p) updatePhotoItem(selectedId, { locked: !p.locked });
    } else if (selectedType === 'text') {
      const t = page.texts.find(tx => tx.id === selectedId);
      if (t) updateTextItem(selectedId, { locked: !t.locked });
    } else if (selectedType === 'sticker') {
      const s = page.stickers.find(st => st.id === selectedId);
      if (s) updateStickerItem(selectedId, { locked: !s.locked });
    }
  };

  // Replace photo file handling
  const handleTriggerReplacePhoto = (photoId: string) => {
    replacingPhotoIdRef.current = photoId;
    replacePhotoInputRef.current?.click();
  };

  const handleFileReplaced = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const targetId = replacingPhotoIdRef.current;
    if (!file || !targetId) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newUrl = event.target?.result as string;
      if (newUrl) {
        updatePhotoItem(targetId, { url: newUrl });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
    replacingPhotoIdRef.current = null;
  };

  // Drawing stroke completion
  const handleStrokeComplete = (stroke: DrawingStroke) => {
    onUpdatePage({
      ...page,
      drawings: [...page.drawings, stroke],
    });
  };

  // Object dragging helper
  const handlePointerDownObject = (
    e: React.PointerEvent,
    id: string,
    type: 'text' | 'photo' | 'sticker',
    action: 'move' | 'resize' | 'rotate',
    item: { x: number; y: number; width: number; height: number; rotation: number; locked?: boolean }
  ) => {
    if (mode === 'draw' || mode === 'turn') return;
    e.stopPropagation();

    setSelectedId(id);
    setSelectedType(type);

    // If locked, cannot move, resize, or rotate
    if (item.locked && action !== 'move') return;
    if (item.locked) return;

    const target = e.currentTarget as HTMLElement;
    try {
      target.setPointerCapture(e.pointerId);
    } catch (_) {}

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: item.x,
      initialY: item.y,
      initialWidth: item.width,
      initialHeight: item.height,
      initialRotation: item.rotation || 0,
      action,
    };
  };

  const handlePointerMoveObject = (
    e: React.PointerEvent,
    id: string,
    type: 'text' | 'photo' | 'sticker'
  ) => {
    const ds = dragStartRef.current;
    if (!ds || selectedId !== id) return;
    e.stopPropagation();

    const dx = e.clientX - ds.startX;
    const dy = e.clientY - ds.startY;

    if (ds.action === 'move') {
      const newX = Math.round(ds.initialX + dx);
      const newY = Math.round(ds.initialY + dy);
      if (type === 'text') updateTextItem(id, { x: newX, y: newY });
      else if (type === 'photo') updatePhotoItem(id, { x: newX, y: newY });
      else if (type === 'sticker') updateStickerItem(id, { x: newX, y: newY });
    } else if (ds.action === 'resize') {
      const newW = Math.max(60, Math.round(ds.initialWidth + dx));
      const newH = Math.max(40, Math.round(ds.initialHeight + dy));
      if (type === 'text') updateTextItem(id, { width: newW, height: newH });
      else if (type === 'photo') updatePhotoItem(id, { width: newW, height: newH });
      else if (type === 'sticker') updateStickerItem(id, { width: newW, height: newH });
    } else if (ds.action === 'rotate') {
      const newRot = Math.round((ds.initialRotation + dx * 0.7) % 360);
      if (type === 'text') updateTextItem(id, { rotation: newRot });
      else if (type === 'photo') updatePhotoItem(id, { rotation: newRot });
      else if (type === 'sticker') updateStickerItem(id, { rotation: newRot });
    }
  };

  const handlePointerUpObject = (e: React.PointerEvent) => {
    if (dragStartRef.current) {
      const target = e.currentTarget as HTMLElement;
      try {
        if (target && target.hasPointerCapture(e.pointerId)) {
          target.releasePointerCapture(e.pointerId);
        }
      } catch (_) {}
      dragStartRef.current = null;
    }
  };

  // Deselect on canvas click
  const handleCanvasClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === `page_surface_${page.id}`) {
      setSelectedId(null);
      setSelectedType(null);
      setEditingTextId(null);
    }
  };

  return (
    <div
      id={`page_surface_${page.id}`}
      onClick={handleCanvasClick}
      style={{
        ...bgStyle,
        width: `${width}px`,
        height: `${height}px`,
      }}
      className="relative overflow-hidden select-none touch-none shadow-sm transition-colors duration-200"
    >
      {/* Hidden file input for replacing selected photo */}
      <input
        type="file"
        ref={replacePhotoInputRef}
        onChange={handleFileReplaced}
        accept="image/*"
        className="hidden"
      />

      {/* Physical Paper Edge Patina & Depth */}
      <div 
        className="absolute inset-0 pointer-events-none border border-[#8b6540]/15"
        style={{
          boxShadow: 'inset 0 0 35px rgba(139, 90, 43, 0.08)'
        }}
      />

      {/* Center Spine Depth Shadow */}
      {pageSide === 'left' && (
        <div 
          className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, rgba(40, 25, 15, 0.35) 0%, rgba(40, 25, 15, 0.12) 40%, transparent 100%)'
          }}
        />
      )}
      {pageSide === 'right' && (
        <div 
          className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(40, 25, 15, 0.35) 0%, rgba(40, 25, 15, 0.12) 40%, transparent 100%)'
          }}
        />
      )}

      {/* Optional Vintage Page Number */}
      {showPageNumber && page.pageNumber > 0 && (
        <div 
          className={`absolute bottom-3 font-serif text-[11px] text-[#825c38]/70 pointer-events-none select-none ${
            pageSide === 'left' ? 'left-6' : pageSide === 'right' ? 'right-6' : 'left-1/2 -translate-x-1/2'
          }`}
        >
          ~ {page.pageNumber} ~
        </div>
      )}

      {/* High-DPI Drawing Canvas Layer */}
      <DrawingLayer
        width={width}
        height={height}
        strokes={page.drawings}
        currentTool={activeTool}
        currentColor={drawingColor}
        currentSize={drawingSize}
        currentOpacity={drawingOpacity}
        isDrawMode={mode === 'draw'}
        onStrokeComplete={handleStrokeComplete}
      />

      {/* ======================================================= */}
      {/* PHOTOS LAYER                                            */}
      {/* ======================================================= */}
      {page.photos.map((photo) => {
        const isSelected = selectedId === photo.id && mode !== 'draw' && mode !== 'turn';
        const isLocked = photo.locked;

        return (
          <div
            key={photo.id}
            id={`photo_${photo.id}`}
            style={{
              position: 'absolute',
              left: `${photo.x}px`,
              top: `${photo.y}px`,
              width: `${photo.width}px`,
              height: `${photo.height}px`,
              transform: `rotate(${photo.rotation}deg)`,
              opacity: photo.opacity ?? 1,
              zIndex: photo.zIndex || 5,
            }}
            className={`group transition-shadow ${
              isLocked ? 'cursor-default' : 'cursor-move'
            } ${
              isSelected ? 'ring-2 ring-[#82542a] shadow-xl' : 'hover:ring-1 hover:ring-[#82542a]/40'
            }`}
            onPointerDown={(e) => handlePointerDownObject(e, photo.id, 'photo', 'move', photo)}
            onPointerMove={(e) => handlePointerMoveObject(e, photo.id, 'photo')}
            onPointerUp={handlePointerUpObject}
          >
            {/* Render with the advanced frame renderer */}
            <PhotoFrameRenderer photo={photo} />

            {/* Locked Badge */}
            {isLocked && (
              <div 
                className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-[#dfc28d] shadow-sm backdrop-blur-xs pointer-events-none z-20"
                title="Photo is locked"
              >
                <Lock className="w-3 h-3" />
              </div>
            )}

            {/* Transform Handles and Interactive Menu when selected */}
            {isSelected && (
              <>
                {/* Resize Handle (bottom right) - disabled when locked */}
                {!isLocked && (
                  <div
                    onPointerDown={(e) => handlePointerDownObject(e, photo.id, 'photo', 'resize', photo)}
                    className="absolute -bottom-2.5 -right-2.5 w-6 h-6 rounded-full bg-[#82542a] text-white flex items-center justify-center cursor-nwse-resize shadow-md z-30 hover:scale-110 active:scale-95 transition-transform"
                    title="Resize Frame"
                  >
                    <Move className="w-3 h-3" />
                  </div>
                )}

                {/* Rotate Handle (top center) - disabled when locked */}
                {!isLocked && (
                  <div
                    onPointerDown={(e) => handlePointerDownObject(e, photo.id, 'photo', 'rotate', photo)}
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#82542a] text-white flex items-center justify-center cursor-ew-resize shadow-md z-30 hover:scale-110 active:scale-95 transition-transform"
                    title="Rotate Photo"
                  >
                    <RotateCw className="w-3 h-3" />
                  </div>
                )}

                {/* FLOATING PHOTO OBJECT MENU */}
                <div 
                  className="absolute -top-11 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 rounded-lg bg-[#27170c]/95 backdrop-blur-md text-white text-xs shadow-2xl border border-[#966b44]/60 z-40 whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  {/* Edit Photo / Crop / Zoom button */}
                  <button
                    onClick={() => {
                      setPhotoForEditor(photo);
                      setIsPhotoEditorOpen(true);
                    }}
                    className="px-2 py-1 hover:bg-[#82542a] rounded flex items-center gap-1 text-[#f5ebd6] transition-colors cursor-pointer"
                    title="Edit Photo, Zoom & Crop"
                  >
                    <Sliders className="w-3.5 h-3.5 text-[#e5b364]" />
                    <span className="font-serif">Edit & Crop</span>
                  </button>

                  {/* Frame picker quick shortcut */}
                  <button
                    onClick={() => {
                      setPhotoForEditor(photo);
                      setIsPhotoEditorOpen(true);
                    }}
                    className="px-2 py-1 hover:bg-[#82542a] rounded flex items-center gap-1 text-[#f5ebd6] transition-colors cursor-pointer"
                    title="Change Frame Design"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#e5b364]" />
                    <span className="font-serif hidden sm:inline">Frame</span>
                  </button>

                  {/* Quick 90° Rotate */}
                  {!isLocked && (
                    <button
                      onClick={() => updatePhotoItem(photo.id, { rotation: (photo.rotation + 90) % 360 })}
                      className="p-1 hover:bg-white/20 rounded text-[#f5ebd6]"
                      title="Rotate 90°"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Replace photo */}
                  <button
                    onClick={() => handleTriggerReplacePhoto(photo.id)}
                    className="p-1 hover:bg-white/20 rounded text-[#f5ebd6]"
                    title="Replace Photo"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>

                  {/* Lock / Unlock */}
                  <button
                    onClick={toggleLockSelected}
                    className={`p-1 rounded transition-colors ${
                      isLocked ? 'bg-[#c99738] text-[#2b170c]' : 'hover:bg-white/20 text-[#f5ebd6]'
                    }`}
                    title={isLocked ? 'Unlock Photo' : 'Lock Photo'}
                  >
                    {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  </button>

                  {/* Bring Forward / Send Backward */}
                  <button
                    onClick={bringToFront}
                    className="p-1 hover:bg-white/20 rounded text-[#f5ebd6]"
                    title="Bring Forward"
                  >
                    <BringToFront className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={sendToBack}
                    className="p-1 hover:bg-white/20 rounded text-[#f5ebd6]"
                    title="Send Backward"
                  >
                    <SendToBack className="w-3.5 h-3.5" />
                  </button>

                  {/* Duplicate */}
                  <button
                    onClick={duplicateSelectedItem}
                    className="p-1 hover:bg-white/20 rounded text-[#f5ebd6]"
                    title="Duplicate Photo"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={deleteSelectedItem}
                    className="p-1 hover:bg-red-600/60 text-red-200 rounded"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* ======================================================= */}
      {/* STICKERS LAYER                                          */}
      {/* ======================================================= */}
      {page.stickers.map((sticker) => {
        const isSelected = selectedId === sticker.id && mode !== 'draw' && mode !== 'turn';
        const def = STICKER_CATALOG.find(s => s.id === sticker.stickerId);
        const isLocked = sticker.locked;

        return (
          <div
            key={sticker.id}
            id={`sticker_${sticker.id}`}
            style={{
              position: 'absolute',
              left: `${sticker.x}px`,
              top: `${sticker.y}px`,
              width: `${sticker.width}px`,
              height: `${sticker.height}px`,
              transform: `rotate(${sticker.rotation}deg)`,
              opacity: sticker.opacity ?? 1,
              zIndex: sticker.zIndex || 6,
            }}
            className={`group transition-shadow ${
              isLocked ? 'cursor-default' : 'cursor-move'
            } ${
              isSelected ? 'ring-2 ring-[#82542a] shadow-xl' : 'hover:ring-1 hover:ring-[#82542a]/40'
            }`}
            onPointerDown={(e) => handlePointerDownObject(e, sticker.id, 'sticker', 'move', sticker)}
            onPointerMove={(e) => handlePointerMoveObject(e, sticker.id, 'sticker')}
            onPointerUp={handlePointerUpObject}
          >
            {def && (
              <div 
                className="w-full h-full select-none pointer-events-none drop-shadow-sm"
                dangerouslySetInnerHTML={{ __html: def.svg }}
              />
            )}

            {isLocked && (
              <div className="absolute top-1 right-1 p-0.5 rounded-full bg-black/60 text-[#dfc28d] pointer-events-none z-20">
                <Lock className="w-2.5 h-2.5" />
              </div>
            )}

            {isSelected && (
              <>
                {!isLocked && (
                  <>
                    <div
                      onPointerDown={(e) => handlePointerDownObject(e, sticker.id, 'sticker', 'resize', sticker)}
                      className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-[#82542a] text-white flex items-center justify-center cursor-nwse-resize shadow-md"
                      title="Resize"
                    >
                      <Move className="w-2.5 h-2.5" />
                    </div>
                    <div
                      onPointerDown={(e) => handlePointerDownObject(e, sticker.id, 'sticker', 'rotate', sticker)}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#82542a] text-white flex items-center justify-center cursor-ew-resize shadow-md"
                      title="Rotate"
                    >
                      <RotateCw className="w-2.5 h-2.5" />
                    </div>
                  </>
                )}

                <div 
                  className="absolute -top-9 left-0 flex items-center gap-1 p-1 rounded-md bg-[#2d1c11]/90 backdrop-blur-xs text-white text-xs shadow-lg z-30"
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <button onClick={toggleLockSelected} className="p-1 hover:bg-white/20 rounded" title={isLocked ? 'Unlock' : 'Lock'}>
                    {isLocked ? <Lock className="w-3.5 h-3.5 text-[#dfc28d]" /> : <Unlock className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={bringToFront} className="p-1 hover:bg-white/20 rounded" title="Bring Forward">
                    <BringToFront className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={duplicateSelectedItem} className="p-1 hover:bg-white/20 rounded" title="Duplicate">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={deleteSelectedItem} className="p-1 hover:bg-red-500/40 text-red-300 rounded" title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* ======================================================= */}
      {/* TEXT LAYER                                              */}
      {/* ======================================================= */}
      {page.texts.map((textItem) => {
        const isSelected = selectedId === textItem.id && mode !== 'draw' && mode !== 'turn';
        const isEditing = editingTextId === textItem.id;
        const isLocked = textItem.locked;

        return (
          <div
            key={textItem.id}
            id={`text_${textItem.id}`}
            style={{
              position: 'absolute',
              left: `${textItem.x}px`,
              top: `${textItem.y}px`,
              width: `${textItem.width}px`,
              minHeight: `${textItem.height}px`,
              transform: `rotate(${textItem.rotation}deg)`,
              opacity: textItem.opacity ?? 1,
              zIndex: textItem.zIndex || 10,
            }}
            className={`group transition-shadow p-1.5 rounded-xs ${
              isLocked ? 'cursor-default' : 'cursor-move'
            } ${
              isSelected ? 'ring-2 ring-[#82542a] bg-[#fbf7ee]/40' : 'hover:ring-1 hover:ring-[#82542a]/30'
            }`}
            onPointerDown={(e) => {
              if (!isEditing) {
                handlePointerDownObject(e, textItem.id, 'text', 'move', textItem);
              }
            }}
            onPointerMove={(e) => handlePointerMoveObject(e, textItem.id, 'text')}
            onPointerUp={handlePointerUpObject}
            onDoubleClick={(e) => {
              e.stopPropagation();
              if (!isLocked) setEditingTextId(textItem.id);
            }}
          >
            {isLocked && (
              <div className="absolute top-1 right-1 p-0.5 rounded-full bg-black/60 text-[#dfc28d] pointer-events-none z-20">
                <Lock className="w-2.5 h-2.5" />
              </div>
            )}

            {isEditing ? (
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <textarea
                  autoFocus
                  value={textItem.text}
                  onChange={(e) => updateTextItem(textItem.id, { text: e.target.value })}
                  style={{
                    fontFamily: textItem.font,
                    fontSize: `${textItem.fontSize}px`,
                    color: textItem.color,
                    letterSpacing: `${textItem.letterSpacing}px`,
                    lineHeight: '1.4',
                  }}
                  className="w-full min-h-[60px] bg-transparent resize-none outline-none border border-[#82542a] p-1 rounded-xs"
                />
                <button
                  onClick={() => setEditingTextId(null)}
                  className="absolute -top-7 right-0 px-2 py-0.5 rounded bg-[#82542a] text-white text-[10px] font-serif flex items-center gap-1 shadow-xs"
                >
                  <Check className="w-3 h-3" /> Done
                </button>
              </div>
            ) : (
              <p
                style={{
                  fontFamily: textItem.font,
                  fontSize: `${textItem.fontSize}px`,
                  color: textItem.color,
                  letterSpacing: `${textItem.letterSpacing}px`,
                  textShadow: textItem.shadow ? '1px 2px 3px rgba(0,0,0,0.22)' : 'none',
                  filter: textItem.fadedVintage ? 'sepia(0.35) contrast(0.85)' : 'none',
                  lineHeight: '1.4',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
                className="select-none pointer-events-none"
              >
                {textItem.text}
              </p>
            )}

            {isSelected && !isEditing && (
              <>
                {!isLocked && (
                  <>
                    <div
                      onPointerDown={(e) => handlePointerDownObject(e, textItem.id, 'text', 'resize', textItem)}
                      className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-[#82542a] text-white flex items-center justify-center cursor-nwse-resize shadow-md"
                      title="Resize"
                    >
                      <Move className="w-2.5 h-2.5" />
                    </div>
                    <div
                      onPointerDown={(e) => handlePointerDownObject(e, textItem.id, 'text', 'rotate', textItem)}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#82542a] text-white flex items-center justify-center cursor-ew-resize shadow-md"
                      title="Rotate"
                    >
                      <RotateCw className="w-2.5 h-2.5" />
                    </div>
                  </>
                )}

                <div 
                  className="absolute -top-9 left-0 flex items-center gap-1 p-1 rounded-md bg-[#2d1c11]/90 backdrop-blur-xs text-white text-xs shadow-lg z-30"
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  {!isLocked && (
                    <button
                      onClick={() => setEditingTextId(textItem.id)}
                      className="p-1 hover:bg-white/20 rounded flex items-center gap-1 text-[11px]"
                      title="Edit Text"
                    >
                      <Type className="w-3.5 h-3.5" /> Edit
                    </button>
                  )}
                  <button onClick={toggleLockSelected} className="p-1 hover:bg-white/20 rounded" title={isLocked ? 'Unlock' : 'Lock'}>
                    {isLocked ? <Lock className="w-3.5 h-3.5 text-[#dfc28d]" /> : <Unlock className="w-3.5 h-3.5 text-white" />}
                  </button>
                  <button onClick={bringToFront} className="p-1 hover:bg-white/20 rounded" title="Bring Forward">
                    <BringToFront className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={duplicateSelectedItem} className="p-1 hover:bg-white/20 rounded" title="Duplicate">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={deleteSelectedItem} className="p-1 hover:bg-red-500/40 text-red-300 rounded" title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* PHOTO EDITOR MODAL */}
      <PhotoEditorModal
        isOpen={isPhotoEditorOpen}
        onClose={() => {
          setIsPhotoEditorOpen(false);
          setPhotoForEditor(null);
        }}
        photo={photoForEditor}
        onSavePhoto={(updated) => {
          updatePhotoItem(updated.id, updated);
        }}
      />
    </div>
  );
};
