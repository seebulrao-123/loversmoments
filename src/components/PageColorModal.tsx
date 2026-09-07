import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Trash2, RotateCw, Save, Sparkles, Sliders, Palette, Check,
  Layers, ArrowLeftRight
} from 'lucide-react';
import { 
  PageBackground, GradientConfig, ColorStop, VintageTextureId, CustomSavedColor 
} from '../types';
import { VINTAGE_TEXTURES, buildGradientString } from '../utils/textures';
import { loadSavedColors, saveCustomColor, deleteSavedColor } from '../utils/storage';

interface PageColorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPageBackground: PageBackground;
  pageNumber: number;
  onApplyBackground: (newBg: PageBackground) => void;
}

// Preset solid colors as required by prompt:
export const SOLID_PALETTE = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Cream', hex: '#FCF8F0' },
  { name: 'Ivory', hex: '#FFFFF0' },
  { name: 'Light Yellow', hex: '#FFFDE7' },
  { name: 'Vintage Yellow', hex: '#F7E7B4' },
  { name: 'Beige', hex: '#F5F5DC' },
  { name: 'Tan', hex: '#D2B48C' },
  { name: 'Brown', hex: '#8B5A2B' },
  { name: 'Dark Brown', hex: '#4A2E18' },
  { name: 'Sepia', hex: '#704214' },
  { name: 'Light Pink', hex: '#FFE4E1' },
  { name: 'Rose', hex: '#FFC0CB' },
  { name: 'Peach', hex: '#FFDAB9' },
  { name: 'Orange', hex: '#FF8C00' },
  { name: 'Red', hex: '#B22222' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Lavender', hex: '#E6E6FA' },
  { name: 'Blue', hex: '#4169E1' },
  { name: 'Sky Blue', hex: '#87CEEB' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Green', hex: '#2E8B57' },
  { name: 'Olive', hex: '#808000' },
  { name: 'Mint', hex: '#98FF98' },
  { name: 'Black', hex: '#1C1917' },
  { name: 'Gray', hex: '#808080' },
  // Additional popular paper tints:
  { name: 'Warm Parchment', hex: '#F2E8D5' },
  { name: 'Linen', hex: '#FAF0E6' },
  { name: 'Warm Charcoal', hex: '#2A2421' },
];

export const PRESET_GRADIENTS: { name: string; gradient: GradientConfig }[] = [
  {
    name: 'Vintage Parchment (Default)',
    gradient: {
      type: 'linear',
      angle: 125,
      opacity: 1,
      stops: [
        { id: '1', color: '#F6E7C8', offset: 0 },
        { id: '2', color: '#D8B48A', offset: 50 },
        { id: '3', color: '#8B5E3C', offset: 100 },
      ]
    }
  },
  {
    name: 'Antique Gold',
    gradient: {
      type: 'linear',
      angle: 140,
      opacity: 1,
      stops: [
        { id: '1', color: '#FFF3DC', offset: 0 },
        { id: '2', color: '#E8CA94', offset: 60 },
        { id: '3', color: '#B58540', offset: 100 },
      ]
    }
  },
  {
    name: 'Pressed Rose',
    gradient: {
      type: 'linear',
      angle: 135,
      opacity: 1,
      stops: [
        { id: '1', color: '#FDF2F0', offset: 0 },
        { id: '2', color: '#E9C7C7', offset: 50 },
        { id: '3', color: '#9C6868', offset: 100 },
      ]
    }
  },
  {
    name: 'Twilight Leather',
    gradient: {
      type: 'radial',
      angle: 0,
      opacity: 1,
      positionX: 50,
      positionY: 50,
      stops: [
        { id: '1', color: '#523A2B', offset: 0 },
        { id: '2', color: '#2B1A11', offset: 75 },
        { id: '3', color: '#1A0E07', offset: 100 },
      ]
    }
  },
  {
    name: 'Morning Mist',
    gradient: {
      type: 'linear',
      angle: 180,
      opacity: 1,
      stops: [
        { id: '1', color: '#EBF4F6', offset: 0 },
        { id: '2', color: '#D2E3E8', offset: 55 },
        { id: '3', color: '#A3BCC4', offset: 100 },
      ]
    }
  },
  {
    name: 'Sage Botanical',
    gradient: {
      type: 'linear',
      angle: 110,
      opacity: 1,
      stops: [
        { id: '1', color: '#F2F6ED', offset: 0 },
        { id: '2', color: '#CBD8C1', offset: 60 },
        { id: '3', color: '#889B7A', offset: 100 },
      ]
    }
  },
];

// Color conversion helpers
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let cleaned = hex.replace('#', '');
  if (cleaned.length === 3) {
    cleaned = cleaned.split('').map(c => c + c).join('');
  }
  const num = parseInt(cleaned, 16) || 0;
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360; s /= 100; l /= 100;
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

export const PageColorModal: React.FC<PageColorModalProps> = ({
  isOpen,
  onClose,
  currentPageBackground,
  pageNumber,
  onApplyBackground,
}) => {
  const [activeTab, setActiveTab] = useState<'preset' | 'gradient' | 'custom' | 'saved' | 'texture'>('preset');
  
  // Current working background state
  const [currentBg, setCurrentBg] = useState<PageBackground>(currentPageBackground);
  const [savedColors, setSavedColors] = useState<CustomSavedColor[]>([]);
  const [activeStopId, setActiveStopId] = useState<string>('1');

  // Custom Color inputs (HEX, RGB, HSL, Brightness)
  const [customHex, setCustomHex] = useState('#F6E7C8');
  const [customRgb, setCustomRgb] = useState(hexToRgb('#F6E7C8'));
  const [customHsl, setCustomHsl] = useState(rgbToHsl(customRgb.r, customRgb.g, customRgb.b));
  const [customOpacity, setCustomOpacity] = useState(1);
  const [brightness, setBrightness] = useState(100);

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentBg(currentPageBackground);
      setSavedColors(loadSavedColors());
      if (currentPageBackground.type === 'gradient' && currentPageBackground.gradient.stops.length > 0) {
        setActiveStopId(currentPageBackground.gradient.stops[0].id);
      }
    }
  }, [isOpen, currentPageBackground]);

  if (!isOpen) return null;

  // Immediate live update to page
  const updateLiveBackground = (newBg: PageBackground) => {
    setCurrentBg(newBg);
    onApplyBackground(newBg);
  };

  // Handler for picking a solid color
  const handleSelectSolid = (hex: string) => {
    const newBg: PageBackground = {
      ...currentBg,
      type: 'color',
      color: hex,
    };
    updateLiveBackground(newBg);
  };

  // Handler for custom color change
  const handleHexChange = (val: string) => {
    setCustomHex(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      const rgb = hexToRgb(val);
      setCustomRgb(rgb);
      setCustomHsl(rgbToHsl(rgb.r, rgb.g, rgb.b));
      if (activeTab === 'gradient') {
        updateActiveStopColor(val);
      } else {
        handleSelectSolid(val);
      }
    }
  };

  const handleRgbChange = (part: 'r' | 'g' | 'b', val: number) => {
    const updated = { ...customRgb, [part]: Math.max(0, Math.min(255, val || 0)) };
    setCustomRgb(updated);
    const hex = rgbToHex(updated.r, updated.g, updated.b);
    setCustomHex(hex);
    setCustomHsl(rgbToHsl(updated.r, updated.g, updated.b));
    if (activeTab === 'gradient') {
      updateActiveStopColor(hex);
    } else {
      handleSelectSolid(hex);
    }
  };

  const handleHslChange = (part: 'h' | 's' | 'l', val: number) => {
    const updated = { ...customHsl, [part]: val };
    setCustomHsl(updated);
    const rgb = hslToRgb(updated.h, updated.s, updated.l);
    setCustomRgb(rgb);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setCustomHex(hex);
    if (activeTab === 'gradient') {
      updateActiveStopColor(hex);
    } else {
      handleSelectSolid(hex);
    }
  };

  // Gradient controls
  const activeGradient = currentBg.gradient || PRESET_GRADIENTS[0].gradient;

  const updateGradient = (partial: Partial<GradientConfig>) => {
    const updatedGrad: GradientConfig = {
      ...activeGradient,
      ...partial,
    };
    const newBg: PageBackground = {
      ...currentBg,
      type: 'gradient',
      gradient: updatedGrad,
    };
    updateLiveBackground(newBg);
  };

  const updateActiveStopColor = (color: string) => {
    const newStops = activeGradient.stops.map(stop => 
      stop.id === activeStopId ? { ...stop, color } : stop
    );
    updateGradient({ stops: newStops });
  };

  const updateStopOffset = (id: string, offset: number) => {
    const newStops = activeGradient.stops.map(stop => 
      stop.id === id ? { ...stop, offset: Math.max(0, Math.min(100, offset)) } : stop
    );
    updateGradient({ stops: newStops });
  };

  const addColorStop = () => {
    const stops = [...activeGradient.stops];
    const newId = 'stop_' + Date.now();
    // Default midway between last two or at 50%
    const lastStop = stops[stops.length - 1];
    const newOffset = lastStop ? Math.min(100, lastStop.offset + 15) : 50;
    const newColor = customHex || '#E6C894';
    stops.push({ id: newId, color: newColor, offset: newOffset });
    setActiveStopId(newId);
    updateGradient({ stops });
  };

  const removeColorStop = (id: string) => {
    if (activeGradient.stops.length <= 2) return; // Must have at least 2 stops
    const stops = activeGradient.stops.filter(s => s.id !== id);
    if (activeStopId === id && stops.length > 0) {
      setActiveStopId(stops[0].id);
    }
    updateGradient({ stops });
  };

  const reverseGradient = () => {
    const reversed = [...activeGradient.stops].reverse().map((stop, idx, arr) => {
      return {
        ...stop,
        offset: arr[arr.length - 1 - idx].offset,
      };
    });
    updateGradient({ stops: reversed });
  };

  const resetGradient = () => {
    updateGradient(PRESET_GRADIENTS[0].gradient);
  };

  // Save to "MY COLORS"
  const handleSaveCustomColor = () => {
    const id = 'custom_' + Date.now();
    let newSaved: CustomSavedColor;
    if (currentBg.type === 'gradient') {
      newSaved = {
        id,
        name: `Gradient (${activeGradient.type} ${activeGradient.angle}°)`,
        type: 'gradient',
        gradient: JSON.parse(JSON.stringify(activeGradient)),
      };
    } else {
      newSaved = {
        id,
        name: `Color ${currentBg.color}`,
        type: 'solid',
        color: currentBg.color,
      };
    }
    const updated = saveCustomColor(newSaved);
    setSavedColors(updated);
    alert('Color saved to "MY COLORS" successfully!');
  };

  const handleDeleteSavedColor = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = deleteSavedColor(id);
    setSavedColors(updated);
  };

  const activeStop = activeGradient.stops.find(s => s.id === activeStopId) || activeGradient.stops[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-xl overflow-hidden shadow-2xl border border-[#a67c52]/60 text-[#3b2716]"
        style={{
          backgroundColor: '#f7f1e5',
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(210,180,140,0.2) 0%, transparent 80%)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#cca77d]/40 bg-[#eedfc5]/60">
          <div className="flex items-center gap-2.5">
            <Palette className="w-5 h-5 text-[#82542a]" />
            <div>
              <h2 className="text-lg font-serif font-bold text-[#442c16]">Page Background & Color</h2>
              <p className="text-xs text-[#78593a]">Customizing Page {pageNumber === 0 ? 'Cover' : pageNumber}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#735133] hover:bg-[#e4cfb2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview Strip */}
        <div className="px-5 py-3 border-b border-[#cca77d]/30 bg-[#fbf7ee] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div 
              className="w-14 h-10 rounded-md border border-[#9b724c]/40 shadow-inner shrink-0 transition-all duration-200"
              style={
                currentBg.type === 'gradient'
                  ? { background: buildGradientString(currentBg.gradient) }
                  : currentBg.type === 'color'
                  ? { backgroundColor: currentBg.color }
                  : currentBg.type === 'texture'
                  ? VINTAGE_TEXTURES[currentBg.texture]?.style
                  : { backgroundColor: '#ffffff' }
              }
            />
            <div className="min-w-0">
              <span className="text-xs font-medium text-[#7d5939] uppercase tracking-wider block">Live Preview</span>
              <span className="text-xs font-serif text-[#4d331d] truncate block">
                {currentBg.type === 'gradient' ? `Custom ${currentBg.gradient.type} gradient` :
                 currentBg.type === 'color' ? `Solid ${currentBg.color}` :
                 currentBg.type === 'texture' ? VINTAGE_TEXTURES[currentBg.texture]?.name : 'Clean Blank Paper'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                updateLiveBackground({ ...currentBg, type: 'none' });
              }}
              className="text-xs px-2.5 py-1.5 rounded border border-[#b89572] bg-[#f5ede0] hover:bg-[#eddcc7] font-serif transition-colors"
            >
              Reset to Blank
            </button>
            <button
              onClick={handleSaveCustomColor}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded bg-[#82542a] text-[#fbf7f0] hover:bg-[#68411e] font-serif transition-colors shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              Save to My Colors
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex px-4 pt-2 border-b border-[#cca77d]/40 gap-1 bg-[#ede0c9]/50 overflow-x-auto">
          {[
            { id: 'preset', label: 'Preset Colors', icon: Palette },
            { id: 'gradient', label: 'Gradient Creator', icon: Sparkles },
            { id: 'custom', label: 'Custom Color', icon: Sliders },
            { id: 'saved', label: 'My Colors', icon: Save },
            { id: 'texture', label: 'Paper Textures', icon: Layers },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-serif font-medium border-b-2 transition-all whitespace-nowrap ${
                  active 
                    ? 'border-[#82542a] text-[#4d2d14] bg-[#f7f1e5] rounded-t-md font-bold' 
                    : 'border-transparent text-[#7d5939] hover:text-[#4d2d14] hover:bg-[#f1e5d3]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-5 overflow-y-auto max-h-[60vh] space-y-5">
          
          {/* TAB 1: PRESET SOLID COLORS */}
          {activeTab === 'preset' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif uppercase tracking-wider text-[#7d5939] font-semibold">Vintage & Classic Solids</span>
                <span className="text-[11px] text-[#8f6d4d]">Click any swatch to apply</span>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-7 gap-2.5">
                {SOLID_PALETTE.map((c) => {
                  const isSelected = currentBg.type === 'color' && currentBg.color.toLowerCase() === c.hex.toLowerCase();
                  return (
                    <button
                      key={c.name}
                      onClick={() => handleSelectSolid(c.hex)}
                      className={`group relative flex flex-col items-center p-1.5 rounded-lg border transition-all ${
                        isSelected 
                          ? 'border-[#82542a] ring-2 ring-[#82542a]/30 bg-[#eddcc7]' 
                          : 'border-[#c9aa88]/60 hover:border-[#82542a] bg-[#fcf8f0]'
                      }`}
                    >
                      <div 
                        className="w-full aspect-square rounded-md shadow-xs border border-black/10 flex items-center justify-center transition-transform group-hover:scale-105"
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && <Check className="w-4 h-4 text-[#82542a] drop-shadow-sm" />}
                      </div>
                      <span className="mt-1 text-[10px] font-serif text-[#543b24] text-center truncate w-full">
                        {c.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Ready Made Gradients Preview row */}
              <div className="pt-3 border-t border-[#cca77d]/30">
                <span className="text-xs font-serif uppercase tracking-wider text-[#7d5939] font-semibold block mb-2.5">Featured Gradients</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {PRESET_GRADIENTS.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => {
                        updateLiveBackground({
                          ...currentBg,
                          type: 'gradient',
                          gradient: JSON.parse(JSON.stringify(p.gradient)),
                        });
                      }}
                      className="p-2 rounded-lg border border-[#cca77d]/60 bg-[#fdfaf3] hover:border-[#82542a] transition-all text-left flex items-center gap-2.5"
                    >
                      <div 
                        className="w-10 h-10 rounded border border-black/10 shadow-xs shrink-0"
                        style={{ background: buildGradientString(p.gradient) }}
                      />
                      <span className="text-xs font-serif text-[#4a311b] font-medium leading-tight">{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ADVANCED GRADIENT CREATOR */}
          {activeTab === 'gradient' && (
            <div className="space-y-5">
              {/* Type, Angle, and Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-[#efe3ce]/60 border border-[#cca77d]/40">
                <div>
                  <label className="text-xs font-serif text-[#5c3e24] font-medium block mb-1">Gradient Type</label>
                  <select
                    value={activeGradient.type}
                    onChange={(e) => updateGradient({ type: e.target.value as GradientConfig['type'] })}
                    className="w-full text-xs p-1.5 rounded border border-[#bfa282] bg-[#fbf7f0] text-[#4d2d14] font-serif"
                  >
                    <option value="linear">Linear</option>
                    <option value="radial">Radial</option>
                    <option value="conic">Conic</option>
                  </select>
                </div>

                {activeGradient.type === 'linear' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-serif text-[#5c3e24] font-medium">Angle</label>
                      <span className="text-xs font-mono text-[#7a5535]">{activeGradient.angle}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={activeGradient.angle}
                      onChange={(e) => updateGradient({ angle: Number(e.target.value) })}
                      className="w-full accent-[#82542a]"
                    />
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-serif text-[#5c3e24] font-medium">Opacity</label>
                    <span className="text-xs font-mono text-[#7a5535]">{Math.round((activeGradient.opacity ?? 1) * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={activeGradient.opacity ?? 1}
                    onChange={(e) => updateGradient({ opacity: Number(e.target.value) })}
                    className="w-full accent-[#82542a]"
                  />
                </div>
              </div>

              {/* Interactive Color Stops Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif text-[#5c3e24] font-semibold uppercase tracking-wider">
                    Color Stops ({activeGradient.stops.length})
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={reverseGradient}
                      className="flex items-center gap-1 text-[11px] px-2 py-1 rounded border border-[#b89572] bg-[#f7f0e4] hover:bg-[#ebdcc8] text-[#543b24]"
                      title="Reverse Stops"
                    >
                      <ArrowLeftRight className="w-3 h-3" /> Reverse
                    </button>
                    <button
                      onClick={resetGradient}
                      className="flex items-center gap-1 text-[11px] px-2 py-1 rounded border border-[#b89572] bg-[#f7f0e4] hover:bg-[#ebdcc8] text-[#543b24]"
                      title="Reset Gradient"
                    >
                      <RotateCw className="w-3 h-3" /> Reset
                    </button>
                    <button
                      onClick={addColorStop}
                      className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-[#82542a] text-white hover:bg-[#6b421d]"
                    >
                      <Plus className="w-3 h-3" /> Add Stop
                    </button>
                  </div>
                </div>

                {/* Gradient Stop Slider Track */}
                <div 
                  className="h-9 w-full rounded-md border border-[#9b724c]/40 relative flex items-center shadow-inner overflow-hidden"
                  style={{ background: buildGradientString(activeGradient) }}
                />

                {/* Stop Cards List */}
                <div className="space-y-2 pt-1">
                  {activeGradient.stops.map((stop, index) => {
                    const isSelected = stop.id === activeStopId;
                    return (
                      <div
                        key={stop.id}
                        onClick={() => {
                          setActiveStopId(stop.id);
                          setCustomHex(stop.color);
                          const rgb = hexToRgb(stop.color);
                          setCustomRgb(rgb);
                          setCustomHsl(rgbToHsl(rgb.r, rgb.g, rgb.b));
                        }}
                        className={`p-2.5 rounded-lg border transition-all flex items-center gap-3 cursor-pointer ${
                          isSelected 
                            ? 'border-[#82542a] bg-[#eddcc7] shadow-xs ring-1 ring-[#82542a]' 
                            : 'border-[#cca77d]/40 bg-[#faf6ee] hover:bg-[#f3e7d5]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-serif font-bold text-[#63452c] w-4">#{index + 1}</span>
                          <input
                            type="color"
                            value={stop.color}
                            onChange={(e) => {
                              updateActiveStopColor(e.target.value);
                              setCustomHex(e.target.value);
                            }}
                            className="w-7 h-7 rounded border border-[#8b6540] cursor-pointer p-0 bg-transparent"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-[11px] text-[#63452c] mb-1 font-mono">
                            <span>{stop.color.toUpperCase()}</span>
                            <span>Offset: {stop.offset}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={stop.offset}
                            onChange={(e) => updateStopOffset(stop.id, Number(e.target.value))}
                            className="w-full accent-[#82542a]"
                          />
                        </div>

                        {activeGradient.stops.length > 2 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeColorStop(stop.id);
                            }}
                            className="p-1.5 rounded text-[#993b3b] hover:bg-[#e8c0c0] transition-colors"
                            title="Remove Stop"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stop Color Tuner */}
              {activeStop && (
                <div className="p-3 rounded-lg border border-[#cca77d]/40 bg-[#fbf8f0] space-y-2">
                  <span className="text-xs font-serif font-semibold text-[#5c3e24]">Selected Stop Color Quick Palette</span>
                  <div className="flex flex-wrap gap-1.5">
                    {SOLID_PALETTE.slice(0, 14).map((c) => (
                      <button
                        key={c.name}
                        onClick={() => updateActiveStopColor(c.hex)}
                        className="w-6 h-6 rounded-md border border-black/15 hover:scale-110 transition-transform"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CUSTOM COLOR PICKER (HEX, RGB, HSL) */}
          {activeTab === 'custom' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-[#fcf8f0] border border-[#cca77d]/40">
                {/* Native Picker & Preview */}
                <div className="flex flex-col items-center gap-2">
                  <div 
                    className="w-24 h-24 rounded-lg shadow-inner border border-[#9b724c]/50 flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: customHex }}
                  >
                    <input
                      type="color"
                      value={customHex}
                      onChange={(e) => handleHexChange(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                  <span className="text-[11px] text-[#7d5939] font-serif">Click box to pick</span>
                </div>

                {/* Input Fields */}
                <div className="flex-1 space-y-3">
                  {/* HEX */}
                  <div>
                    <label className="text-xs font-serif text-[#5c3e24] font-medium block mb-1">HEX Code</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={customHex}
                        onChange={(e) => handleHexChange(e.target.value)}
                        placeholder="#F6E7C8"
                        className="w-32 text-xs font-mono p-1.5 rounded border border-[#bfa282] bg-white uppercase text-[#3b2716]"
                      />
                      <button
                        onClick={() => handleSelectSolid(customHex)}
                        className="text-xs px-3 py-1.5 rounded bg-[#82542a] text-white hover:bg-[#68411e] font-serif"
                      >
                        Apply Color
                      </button>
                    </div>
                  </div>

                  {/* RGB */}
                  <div>
                    <label className="text-xs font-serif text-[#5c3e24] font-medium block mb-1">RGB Channels</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['r', 'g', 'b'] as const).map(ch => (
                        <div key={ch} className="flex items-center gap-1 text-xs">
                          <span className="uppercase font-mono text-[#7a5535]">{ch}:</span>
                          <input
                            type="number"
                            min="0"
                            max="255"
                            value={customRgb[ch]}
                            onChange={(e) => handleRgbChange(ch, Number(e.target.value))}
                            className="w-full text-xs font-mono p-1 rounded border border-[#bfa282] bg-white text-[#3b2716]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* HSL */}
                  <div>
                    <label className="text-xs font-serif text-[#5c3e24] font-medium block mb-1">HSL Values</label>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex items-center gap-1 text-xs">
                        <span className="font-mono text-[#7a5535]">H:</span>
                        <input
                          type="number"
                          min="0"
                          max="360"
                          value={customHsl.h}
                          onChange={(e) => handleHslChange('h', Number(e.target.value))}
                          className="w-full text-xs font-mono p-1 rounded border border-[#bfa282] bg-white text-[#3b2716]"
                        />
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="font-mono text-[#7a5535]">S%:</span>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={customHsl.s}
                          onChange={(e) => handleHslChange('s', Number(e.target.value))}
                          className="w-full text-xs font-mono p-1 rounded border border-[#bfa282] bg-white text-[#3b2716]"
                        />
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="font-mono text-[#7a5535]">L%:</span>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={customHsl.l}
                          onChange={(e) => handleHslChange('l', Number(e.target.value))}
                          className="w-full text-xs font-mono p-1 rounded border border-[#bfa282] bg-white text-[#3b2716]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MY COLORS (SAVED) */}
          {activeTab === 'saved' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif uppercase tracking-wider text-[#7d5939] font-semibold">
                  Saved Colors & Gradients ({savedColors.length})
                </span>
                <span className="text-[11px] text-[#8f6d4d]">Click to reuse anytime</span>
              </div>

              {savedColors.length === 0 ? (
                <div className="p-8 text-center text-[#7d5939] border border-dashed border-[#cca77d]/60 rounded-lg bg-[#faf6ee]">
                  <Save className="w-8 h-8 mx-auto mb-2 text-[#9e7650]" />
                  <p className="font-serif text-sm">No saved colors yet</p>
                  <p className="text-xs text-[#9c7855] mt-1">Create your favorite gradient or solid color and tap "Save to My Colors"!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {savedColors.map((sc) => (
                    <div
                      key={sc.id}
                      onClick={() => {
                        if (sc.type === 'gradient' && sc.gradient) {
                          updateLiveBackground({
                            ...currentBg,
                            type: 'gradient',
                            gradient: JSON.parse(JSON.stringify(sc.gradient)),
                          });
                        } else if (sc.color) {
                          handleSelectSolid(sc.color);
                        }
                      }}
                      className="group p-2.5 rounded-lg border border-[#cca77d]/60 bg-[#fdfaf3] hover:border-[#82542a] transition-all text-left flex items-center justify-between cursor-pointer shadow-xs hover:shadow-md"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div 
                          className="w-9 h-9 rounded border border-black/10 shadow-xs shrink-0"
                          style={
                            sc.type === 'gradient' && sc.gradient
                              ? { background: buildGradientString(sc.gradient) }
                              : { backgroundColor: sc.color }
                          }
                        />
                        <div className="min-w-0">
                          <span className="text-xs font-serif font-medium text-[#4a311b] truncate block">{sc.name}</span>
                          <span className="text-[10px] text-[#856548] uppercase tracking-wider block">{sc.type}</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleDeleteSavedColor(e, sc.id)}
                        className="p-1 rounded text-[#a64848] opacity-0 group-hover:opacity-100 hover:bg-[#fadcdc] transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: VINTAGE PAPER TEXTURES */}
          {activeTab === 'texture' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif uppercase tracking-wider text-[#7d5939] font-semibold">
                  Authentic Vintage Papers
                </span>
                <span className="text-[11px] text-[#8f6d4d]">Optional natural papers & parchments</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.values(VINTAGE_TEXTURES).map((tex) => {
                  const isSelected = currentBg.type === 'texture' && currentBg.texture === tex.id;
                  return (
                    <button
                      key={tex.id}
                      onClick={() => {
                        updateLiveBackground({
                          ...currentBg,
                          type: tex.id === 'none' ? 'none' : 'texture',
                          texture: tex.id,
                        });
                      }}
                      className={`p-3 rounded-lg border text-left transition-all relative overflow-hidden flex flex-col justify-between h-28 ${
                        isSelected 
                          ? 'border-[#82542a] ring-2 ring-[#82542a]/30 shadow-md' 
                          : 'border-[#cca77d]/60 hover:border-[#82542a] shadow-xs'
                      }`}
                      style={tex.style}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-serif font-bold text-[#4a2e16] drop-shadow-xs">
                          {tex.name}
                        </span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#82542a] text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#5e4128] font-serif leading-tight">
                        {tex.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-[#cca77d]/40 bg-[#eedfc5]/60">
          <span className="text-xs font-serif text-[#664b32]">
            Changes apply instantly to current page
          </span>
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-lg bg-[#82542a] text-[#fbf7f0] font-serif text-sm font-semibold hover:bg-[#68411e] shadow-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
