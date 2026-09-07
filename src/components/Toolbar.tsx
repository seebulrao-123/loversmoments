import React, { useState, useRef } from 'react';
import { 
  MousePointer, Type, PenTool, Image as ImageIcon, Sparkles, Palette,
  Undo, Redo, Plus, BookOpen, Download, Settings, Layers,
  ChevronDown, Eraser, Feather, Brush, Highlighter, Check, Stamp
} from 'lucide-react';
import { 
  InteractionMode, DrawingTool, PhotoFrame, TextItem, PhotoItem, StickerItem, StickerCategory 
} from '../types';
import { VINTAGE_FONTS, VINTAGE_PHRASES } from '../utils/fonts';
import { STICKER_CATALOG } from '../utils/stickers';
import { SOLID_PALETTE } from './PageColorModal';

interface ToolbarProps {
  mode: InteractionMode;
  onSetMode: (mode: InteractionMode) => void;
  // Drawing tools
  drawingTool: DrawingTool;
  onSetDrawingTool: (tool: DrawingTool) => void;
  drawingColor: string;
  onSetDrawingColor: (color: string) => void;
  drawingSize: number;
  onSetDrawingSize: (size: number) => void;
  drawingOpacity: number;
  onSetDrawingOpacity: (opacity: number) => void;
  // Text controls
  onAddText: (font?: string, initialText?: string) => void;
  // Photo controls
  onAddPhoto: (url: string, frame: PhotoFrame) => void;
  // Sticker controls
  onAddSticker: (stickerId: string, category: StickerCategory) => void;
  onOpenStickerLibrary?: () => void;
  // Page operations
  onOpenColorModal: () => void;
  onOpenThumbnails: () => void;
  onOpenExport: () => void;
  onOpenSettings: () => void;
  onAddBlankPage: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  pageNumber: number;
  totalPages: number;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  mode,
  onSetMode,
  drawingTool,
  onSetDrawingTool,
  drawingColor,
  onSetDrawingColor,
  drawingSize,
  onSetDrawingSize,
  drawingOpacity,
  onSetDrawingOpacity,
  onAddText,
  onAddPhoto,
  onAddSticker,
  onOpenStickerLibrary,
  onOpenColorModal,
  onOpenThumbnails,
  onOpenExport,
  onOpenSettings,
  onAddBlankPage,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  pageNumber,
  totalPages,
}) => {
  const [activeSubPanel, setActiveSubPanel] = useState<'none' | 'draw' | 'text' | 'photo' | 'sticker'>('none');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Text quick options
  const [selectedFont, setSelectedFont] = useState(VINTAGE_FONTS[0].family);
  const [recentDrawColors, setRecentDrawColors] = useState<string[]>([
    '#2E1E14', '#593416', '#8B2500', '#2E4C2E', '#1C3144', '#7D5BA6', '#C4820A'
  ]);

  // Handle Photo upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      if (url) {
        onAddPhoto(url, 'polaroid');
        setActiveSubPanel('none');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const addColorToRecents = (color: string) => {
    onSetDrawingColor(color);
    if (!recentDrawColors.includes(color)) {
      setRecentDrawColors([color, ...recentDrawColors.slice(0, 8)]);
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none z-30">
      {/* Top Main Navigation Bar */}
      <header 
        className="w-full px-3 sm:px-6 py-2.5 flex items-center justify-between border-b border-[#cca77d]/40 shadow-sm"
        style={{
          backgroundColor: '#382416',
          backgroundImage: 'radial-gradient(ellipse at center top, rgba(95, 60, 35, 0.4) 0%, rgba(26, 16, 9, 0.8) 100%)',
          color: '#eddcc5',
        }}
      >
        {/* Brand & Page Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-baseline gap-2">
            <h1 
              className="text-2xl sm:text-3xl font-normal text-[#edd69e] tracking-wide"
              style={{ fontFamily: "'Alex Brush', 'Pinyon Script', cursive" }}
            >
              Moments..
            </h1>
            <span className="hidden md:inline-block text-[11px] font-serif text-[#b89572] italic">
              vintage memoirs
            </span>
          </div>

          <div className="h-5 w-px bg-[#7a5538] mx-1 hidden sm:block" />

          {/* Current Page Tag */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#24170e]/80 border border-[#7a5538]/50 text-xs font-serif text-[#dec29b]">
            <span>{pageNumber === 0 ? 'Cover' : `Page ${pageNumber}`}</span>
            <span className="text-[#8f6e4e]">/ {totalPages - 1}</span>
          </div>
        </div>

        {/* Primary Interactive Modes Toolbar */}
        <div className="flex items-center gap-1 sm:gap-1.5 bg-[#26180f]/90 p-1 rounded-lg border border-[#7a5538]/60 shadow-inner">
          {/* Select Mode */}
          <button
            onClick={() => {
              onSetMode('select');
              setActiveSubPanel('none');
            }}
            className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-md text-xs font-serif font-medium transition-all ${
              mode === 'select' && activeSubPanel === 'none'
                ? 'bg-[#82542a] text-[#fff6ea] shadow-xs'
                : 'text-[#d9bf9f] hover:bg-[#3d2719] hover:text-[#fff6ea]'
            }`}
            title="Select & Move Objects"
          >
            <MousePointer className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Select</span>
          </button>

          {/* Text Tool */}
          <button
            onClick={() => {
              onSetMode('text');
              setActiveSubPanel(activeSubPanel === 'text' ? 'none' : 'text');
            }}
            className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-md text-xs font-serif font-medium transition-all ${
              mode === 'text' || activeSubPanel === 'text'
                ? 'bg-[#82542a] text-[#fff6ea] shadow-xs'
                : 'text-[#d9bf9f] hover:bg-[#3d2719] hover:text-[#fff6ea]'
            }`}
            title="Write & Format Text"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Text</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {/* Draw Tool */}
          <button
            onClick={() => {
              onSetMode('draw');
              setActiveSubPanel(activeSubPanel === 'draw' ? 'none' : 'draw');
            }}
            className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-md text-xs font-serif font-medium transition-all ${
              mode === 'draw' || activeSubPanel === 'draw'
                ? 'bg-[#82542a] text-[#fff6ea] shadow-xs'
                : 'text-[#d9bf9f] hover:bg-[#3d2719] hover:text-[#fff6ea]'
            }`}
            title="Fountain Pen & Drawing"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Draw</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {/* Photo Tool */}
          <button
            onClick={() => {
              onSetMode('select');
              setActiveSubPanel(activeSubPanel === 'photo' ? 'none' : 'photo');
            }}
            className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-md text-xs font-serif font-medium transition-all ${
              activeSubPanel === 'photo'
                ? 'bg-[#82542a] text-[#fff6ea] shadow-xs'
                : 'text-[#d9bf9f] hover:bg-[#3d2719] hover:text-[#fff6ea]'
            }`}
            title="Add Photos with Frames"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Photo</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {/* Sticker Tool */}
          <button
            onClick={() => {
              onSetMode('select');
              setActiveSubPanel(activeSubPanel === 'sticker' ? 'none' : 'sticker');
            }}
            className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-md text-xs font-serif font-medium transition-all ${
              activeSubPanel === 'sticker'
                ? 'bg-[#82542a] text-[#fff6ea] shadow-xs'
                : 'text-[#d9bf9f] hover:bg-[#3d2719] hover:text-[#fff6ea]'
            }`}
            title="Vintage Stamps & Stickers"
          >
            <Stamp className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Stickers</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {/* Page Color & Gradient Tool */}
          <button
            onClick={onOpenColorModal}
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-md text-xs font-serif font-medium text-[#ebd69e] hover:bg-[#4a321f] transition-all border border-[#966b44]/40"
            title="Page Background & Custom Gradient Creator"
          >
            <Palette className="w-3.5 h-3.5 text-[#e5b364]" />
            <span className="hidden lg:inline">Page Color</span>
          </button>
        </div>

        {/* Global Page Operations & Utilities */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Undo / Redo */}
          <div className="flex items-center gap-0.5 bg-[#26180f]/80 p-0.5 rounded-md border border-[#7a5538]/50">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className="p-1.5 rounded text-[#d9bf9f] hover:bg-[#3d2719] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Undo className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className="p-1.5 rounded text-[#d9bf9f] hover:bg-[#3d2719] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Redo (Ctrl+Y)"
            >
              <Redo className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add Page */}
          <button
            onClick={onAddBlankPage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-[#82542a] text-[#fff7ea] hover:bg-[#6e431d] text-xs font-serif font-medium shadow-xs transition-colors"
            title="Add Clean Blank Page"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Page</span>
          </button>

          {/* Page Thumbnails */}
          <button
            onClick={onOpenThumbnails}
            className="p-2 rounded-md bg-[#26180f]/80 text-[#d9bf9f] hover:bg-[#3d2719] hover:text-[#fff7ea] border border-[#7a5538]/50 transition-colors"
            title="Page Thumbnails & Reordering"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Export */}
          <button
            onClick={onOpenExport}
            className="p-2 rounded-md bg-[#26180f]/80 text-[#d9bf9f] hover:bg-[#3d2719] hover:text-[#fff7ea] border border-[#7a5538]/50 transition-colors"
            title="Export Page as Image / Diary as PDF"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-md bg-[#26180f]/80 text-[#d9bf9f] hover:bg-[#3d2719] hover:text-[#fff7ea] border border-[#7a5538]/50 transition-colors"
            title="Diary Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hidden file input for photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* ========================================================= */}
      {/* SECONDARY FLOATING TOOL SUB-PANELS                       */}
      {/* ========================================================= */}

      {/* 1. DRAWING SUB-PANEL */}
      {activeSubPanel === 'draw' && (
        <div 
          className="w-full px-4 py-2 bg-[#f4ecd8] border-b border-[#cca77d]/60 shadow-md flex flex-wrap items-center justify-between gap-3 text-[#3d2716]"
        >
          {/* Drawing Tool Selection */}
          <div className="flex items-center gap-1 bg-[#eadbc3] p-1 rounded-md border border-[#c9b499]">
            {[
              { id: 'fountain', label: 'Fountain Pen', icon: Feather },
              { id: 'pen', label: 'Classic Pen', icon: PenTool },
              { id: 'pencil', label: 'Pencil', icon: Type },
              { id: 'brush', label: 'Artist Brush', icon: Brush },
              { id: 'highlighter', label: 'Highlighter', icon: Highlighter },
              { id: 'eraser', label: 'Eraser', icon: Eraser },
            ].map(tool => {
              const Icon = tool.icon;
              const isCurrent = drawingTool === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    onSetDrawingTool(tool.id as DrawingTool);
                    onSetMode('draw');
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-serif font-medium transition-all ${
                    isCurrent 
                      ? 'bg-[#82542a] text-white shadow-xs' 
                      : 'text-[#543b25] hover:bg-[#dfceb5]'
                  }`}
                  title={tool.label}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tool.label}</span>
                </button>
              );
            })}
          </div>

          {/* Size and Opacity controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-serif">
              <span className="text-[#694b2f]">Size: {drawingSize}px</span>
              <input
                type="range"
                min="1"
                max="30"
                value={drawingSize}
                onChange={(e) => onSetDrawingSize(Number(e.target.value))}
                className="w-20 sm:w-24 accent-[#82542a]"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-serif">
              <span className="text-[#694b2f]">Ink: {Math.round(drawingOpacity * 100)}%</span>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={drawingOpacity}
                onChange={(e) => onSetDrawingOpacity(Number(e.target.value))}
                className="w-16 sm:w-20 accent-[#82542a]"
              />
            </div>
          </div>

          {/* Color palette */}
          <div className="flex items-center gap-1.5">
            {recentDrawColors.map((hex) => (
              <button
                key={hex}
                onClick={() => addColorToRecents(hex)}
                className="w-5 h-5 rounded-full border border-black/20 shadow-xs hover:scale-110 transition-transform relative"
                style={{ backgroundColor: hex }}
              >
                {drawingColor.toLowerCase() === hex.toLowerCase() && (
                  <Check className="w-3 h-3 text-white absolute inset-0 m-auto drop-shadow-sm" />
                )}
              </button>
            ))}
            <input
              type="color"
              value={drawingColor}
              onChange={(e) => addColorToRecents(e.target.value)}
              className="w-6 h-6 rounded border border-[#8b6540] cursor-pointer p-0 bg-transparent"
              title="Custom Ink Color"
            />
          </div>
        </div>
      )}

      {/* 2. TEXT SUB-PANEL */}
      {activeSubPanel === 'text' && (
        <div 
          className="w-full px-4 py-2.5 bg-[#f4ecd8] border-b border-[#cca77d]/60 shadow-md flex flex-wrap items-center justify-between gap-3 text-[#3d2716]"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                onAddText(selectedFont);
                setActiveSubPanel('none');
              }}
              className="px-3 py-1 rounded bg-[#82542a] text-white text-xs font-serif font-medium hover:bg-[#69421d] shadow-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Text Box
            </button>

            {/* Font selector */}
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="text-xs p-1 rounded border border-[#bfa282] bg-white font-serif text-[#4d2d14] max-w-[180px]"
            >
              {VINTAGE_FONTS.map(f => (
                <option key={f.name} value={f.family}>
                  {f.name} ({f.category})
                </option>
              ))}
            </select>

            {/* Ready-made vintage phrases */}
            <div className="flex items-center gap-1 overflow-x-auto max-w-md py-0.5">
              <span className="text-[11px] font-serif text-[#78593a] whitespace-nowrap">Phrases:</span>
              {VINTAGE_PHRASES.slice(0, 4).map(ph => (
                <button
                  key={ph}
                  onClick={() => {
                    onAddText(selectedFont, ph);
                    setActiveSubPanel('none');
                  }}
                  className="text-[11px] font-serif italic px-2 py-0.5 rounded border border-[#cca77d]/60 bg-[#fdfaf3] hover:bg-[#ecd8be] text-[#543b24] whitespace-nowrap"
                >
                  "{ph}"
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. PHOTO SUB-PANEL */}
      {activeSubPanel === 'photo' && (
        <div 
          className="w-full px-4 py-2.5 bg-[#f4ecd8] border-b border-[#cca77d]/60 shadow-md flex flex-wrap items-center justify-between gap-3 text-[#3d2716]"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#82542a] text-white text-xs font-serif font-medium hover:bg-[#68411e] shadow-xs"
            >
              <ImageIcon className="w-3.5 h-3.5" /> Upload from Computer
            </button>
            <span className="text-xs text-[#78593a] font-serif">
              Upload any personal photo or portrait to place into your diary.
            </span>
          </div>
        </div>
      )}

      {/* 4. STICKER SUB-PANEL */}
      {activeSubPanel === 'sticker' && (
        <div 
          className="w-full px-4 py-2 bg-[#f4ecd8] border-b border-[#cca77d]/60 shadow-md flex items-center gap-3 overflow-x-auto"
        >
          {onOpenStickerLibrary && (
            <button
              onClick={() => {
                onOpenStickerLibrary();
                setActiveSubPanel('none');
              }}
              className="px-3 py-1.5 rounded-lg bg-[#82542a] text-white text-xs font-serif font-medium hover:bg-[#6b421d] transition-colors shadow-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Browse 80+ Stickers & Search</span>
            </button>
          )}

          <div className="h-6 w-px bg-[#cca77d]/50 shrink-0" />
          <span className="text-xs font-serif text-[#78593a] font-medium whitespace-nowrap">Quick pick:</span>
          <div className="flex items-center gap-2 py-0.5">
            {STICKER_CATALOG.slice(0, 15).map((stk) => (
              <button
                key={stk.id}
                onClick={() => {
                  onAddSticker(stk.id, stk.category);
                  setActiveSubPanel('none');
                }}
                className="w-10 h-10 p-1 rounded-md border border-[#cca77d]/70 bg-[#faf6ee] hover:bg-[#eedfc5] hover:scale-110 transition-all shrink-0 flex items-center justify-center shadow-xs cursor-pointer"
                title={stk.name}
              >
                <div 
                  className="w-full h-full pointer-events-none"
                  dangerouslySetInnerHTML={{ __html: stk.svg }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
