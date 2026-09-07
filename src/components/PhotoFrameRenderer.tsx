import React from 'react';
import { PhotoItem, PhotoFrameType } from '../types';

interface PhotoFrameRendererProps {
  photo: PhotoItem;
  onImagePointerDown?: (e: React.PointerEvent) => void;
}

export const FRAME_DESCRIPTIONS: Record<PhotoFrameType, { name: string; category: string }> = {
  // Simple
  'thin-white': { name: 'Thin White Mat', category: 'Simple' },
  'thin-black': { name: 'Thin Ink Line', category: 'Simple' },
  'cream': { name: 'Warm Cream Border', category: 'Simple' },
  'brown': { name: 'Chestnut Cardstock', category: 'Simple' },
  'thick-border': { name: 'Gallery Mat Border', category: 'Simple' },
  'double-border': { name: 'Double Ruled Border', category: 'Simple' },
  'rounded': { name: 'Soft Rounded Edge', category: 'Simple' },
  'square': { name: 'Sharp Square Cut', category: 'Simple' },
  'shadow-frame': { name: 'Elevated Drop Shadow', category: 'Simple' },
  'minimal-vintage': { name: 'Notched Sepia Mat', category: 'Simple' },

  // Polaroid
  'polaroid': { name: 'Classic Polaroid', category: 'Polaroid' },
  'vintage-polaroid': { name: 'Aged Polaroid', category: 'Polaroid' },
  'polaroid-cream': { name: 'Cream Matte Polaroid', category: 'Polaroid' },
  'polaroid-dark': { name: 'Dark Sepia Polaroid', category: 'Polaroid' },
  'polaroid-wide': { name: 'Wide Panorama Polaroid', category: 'Polaroid' },
  'polaroid-tilted': { name: 'Pinned Snapshot', category: 'Polaroid' },
  'polaroid-handwritten': { name: 'Dated Handwritten Polaroid', category: 'Polaroid' },
  'polaroid-double': { name: 'Dual Snapshot Mat', category: 'Polaroid' },

  // Flower & Botanical
  'flower-corner': { name: 'Rose Corner Vines', category: 'Botanical' },
  'rose-garden': { name: 'Victorian Rose Border', category: 'Botanical' },
  'daisy-meadow': { name: 'Wild Daisy Border', category: 'Botanical' },
  'botanical-leaves': { name: 'Olive Botanical Garland', category: 'Botanical' },
  'dried-flower': { name: 'Pressed Herbarium Frame', category: 'Botanical' },
  'flower-wreath': { name: 'Oval Floral Wreath', category: 'Botanical' },
  'pressed-fern': { name: 'Forest Fern Fronds', category: 'Botanical' },
  'lavender-sprig': { name: 'Lavender Tied Sprigs', category: 'Botanical' },
  'golden-sunflower': { name: 'Sunburst Botanical', category: 'Botanical' },
  'autumn-leaves': { name: 'Golden Autumn Foliage', category: 'Botanical' },

  // Vintage
  'parchment': { name: 'Burnt Edge Parchment', category: 'Vintage' },
  'torn-paper': { name: 'Hand-Deckled Paper', category: 'Vintage' },
  'old-newspaper': { name: '1920s News Gazette', category: 'Vintage' },
  'sepia': { name: 'Antique Portrait Board', category: 'Vintage' },
  'aged-paper': { name: 'Water-Stained Paper', category: 'Vintage' },
  'postcard': { name: '1910 Postcard Card', category: 'Vintage' },
  'old-letter': { name: 'Airmail Registered Border', category: 'Vintage' },
  'distressed': { name: 'Weathered Antique Emulsion', category: 'Vintage' },
  'cabinet-card': { name: 'Victorian Cabinet Card', category: 'Vintage' },
  'antique-oval': { name: 'Baroque Oval Mat', category: 'Vintage' },

  // Scrapbook
  'tape': { name: 'Translucent Tape Strips', category: 'Scrapbook' },
  'tape-corners': { name: 'Four Corner Washi Tapes', category: 'Scrapbook' },
  'paper-corners': { name: 'Black Album Mounts', category: 'Scrapbook' },
  'scrapbook': { name: 'Album Photo Corners', category: 'Scrapbook' },
  'layered-paper': { name: 'Torn Kraft Layered Mat', category: 'Scrapbook' },
  'paper-clip': { name: 'Brass Clipped Mat', category: 'Scrapbook' },
  'ribbon-sash': { name: 'Diagonal Silk Sash', category: 'Scrapbook' },
  'collage': { name: 'Ephemera Collage Mat', category: 'Scrapbook' },
  'handmade-paper': { name: 'Raw Cotton Rag Paper', category: 'Scrapbook' },
  'washi-strips': { name: 'Dual Floral Washi Tape', category: 'Scrapbook' },
  'stamp-corners': { name: 'Antique Stamp Corners', category: 'Scrapbook' },

  // Film
  'film': { name: 'Classic 35mm Strip', category: 'Film' },
  'film-35mm': { name: 'Sprocket Negative Roll', category: 'Film' },
  'film-negative': { name: 'Amber Film Emulsion', category: 'Film' },
  'vintage-camera': { name: 'Viewfinder Crop Mask', category: 'Film' },
  'contact-sheet': { name: 'Proof Contact Sheet', category: 'Film' },
  'cinema-scope': { name: '16mm Cinema Frame', category: 'Film' },
  'slide-mount': { name: 'Cardboard Slide Mount', category: 'Film' },
  'medium-format': { name: '120 Hasselblad Mask', category: 'Film' },

  // Decorative
  'wooden': { name: 'Dark Mahogany Frame', category: 'Decorative' },
  'carved-wood': { name: 'Carved Baroque Wood', category: 'Decorative' },
  'lace': { name: 'Bobbin Lace Border', category: 'Decorative' },
  'ribbon': { name: 'Tied Satin Ribbon Border', category: 'Decorative' },
  'heart-corner': { name: 'Gilt Heart Corners', category: 'Decorative' },
  'star-corner': { name: 'Antique Star Studs', category: 'Decorative' },
  'ornamental': { name: 'Rococo Gilded Flourish', category: 'Decorative' },
  'classic-vintage': { name: 'Gold Beaded Walnut Frame', category: 'Decorative' },
  'postage': { name: 'Perforated Postage Stamp', category: 'Decorative' },
  'embossed-gold': { name: 'Gold Leaf Museum Frame', category: 'Decorative' },

  // Aliases & Extras
  'brown-vintage': { name: 'Chestnut Vintage Board', category: 'Vintage' },
  'cream-paper': { name: 'Ivory Fine Art Paper', category: 'Simple' },
  'old-paper': { name: 'Yellowed Antique Mat', category: 'Vintage' },
  'hand-torn': { name: 'Deckled Rag Edge', category: 'Vintage' },
  'none': { name: 'No Frame (Borderless)', category: 'Simple' },
};

export const PhotoFrameRenderer: React.FC<PhotoFrameRendererProps> = ({
  photo,
  onImagePointerDown,
}) => {
  const { url, frame = 'polaroid', caption, cropZoom, adjustments, frameStyle } = photo;

  // Compute CSS filter string for adjustments
  const adj = adjustments || {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
    warmth: 0,
    blur: 0,
    vintageFaded: false,
  };

  let filterParts: string[] = [];
  if (adj.brightness !== 100) filterParts.push(`brightness(${adj.brightness}%)`);
  if (adj.contrast !== 100) filterParts.push(`contrast(${adj.contrast}%)`);
  if (adj.saturation !== 100) filterParts.push(`saturate(${adj.saturation}%)`);
  if (adj.sepia > 0) filterParts.push(`sepia(${adj.sepia}%)`);
  if (adj.blur > 0) filterParts.push(`blur(${adj.blur}px)`);
  if (adj.vintageFaded) {
    filterParts.push('sepia(25%) contrast(88%) brightness(105%)');
  }
  if (adj.warmth !== 0) {
    const warmthSepia = Math.max(0, adj.warmth * 0.4);
    filterParts.push(`sepia(${warmthSepia}%)`);
  }
  const imgFilter = filterParts.length > 0 ? filterParts.join(' ') : 'none';

  // Compute transform for zoom and pan
  const zoom = cropZoom?.zoom ?? 100;
  const panX = cropZoom?.panX ?? 0;
  const panY = cropZoom?.panY ?? 0;
  const fitMode = cropZoom?.fitMode ?? 'cover';

  const imgTransform = `scale(${zoom / 100}) translate(${panX}%, ${panY}%)`;

  // Custom frame styles
  const fColor = frameStyle?.frameColor;
  const bColor = frameStyle?.borderColor;
  const tColor = frameStyle?.tapeColor || '#deb887';
  const bThick = frameStyle?.borderThickness !== undefined ? `${frameStyle.borderThickness}px` : undefined;
  const fPadding = frameStyle?.padding !== undefined ? `${frameStyle.padding}px` : undefined;
  const cRadius = frameStyle?.cornerRadius !== undefined ? `${frameStyle.cornerRadius}px` : undefined;
  const sSize = frameStyle?.shadowSize ?? 12;
  const sOpacity = frameStyle?.shadowOpacity ?? 0.25;

  const shadowCss = `0 ${Math.round(sSize * 0.5)}px ${sSize}px rgba(0,0,0,${sOpacity})`;

  // Inner image element
  const renderInnerImage = () => (
    <div 
      className="w-full h-full overflow-hidden relative select-none"
      onPointerDown={onImagePointerDown}
      style={{
        borderRadius: cRadius ? `calc(${cRadius} - 4px)` : undefined,
      }}
    >
      <img
        src={url}
        alt={caption || 'Memory'}
        className="w-full h-full pointer-events-none select-none"
        referrerPolicy="no-referrer"
        style={{
          objectFit: fitMode,
          transform: imgTransform,
          filter: imgFilter,
          transformOrigin: 'center center',
          transition: 'filter 0.15s ease',
        }}
      />
    </div>
  );

  // ============================================================
  // 1. SIMPLE FRAMES
  // ============================================================
  if (frame === 'thin-white') {
    return (
      <div 
        className="w-full h-full p-2 bg-white flex items-center justify-center"
        style={{
          border: '1px solid rgba(0,0,0,0.12)',
          boxShadow: shadowCss,
          padding: fPadding,
          borderRadius: cRadius || '1px',
        }}
      >
        <div className="w-full h-full overflow-hidden">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'thin-black') {
    return (
      <div 
        className="w-full h-full p-1.5 bg-[#fdfbf7] flex items-center justify-center"
        style={{
          border: '1.5px solid #1a1612',
          boxShadow: shadowCss,
          padding: fPadding,
          borderRadius: cRadius || '1px',
        }}
      >
        <div className="w-full h-full overflow-hidden">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'cream' || frame === 'cream-paper') {
    return (
      <div 
        className="w-full h-full p-3 flex items-center justify-center"
        style={{
          backgroundColor: fColor || '#faf5e8',
          border: `${bThick || '1px'} solid ${bColor || '#d4c2a5'}`,
          boxShadow: shadowCss,
          padding: fPadding,
          borderRadius: cRadius || '2px',
        }}
      >
        <div className="w-full h-full overflow-hidden border border-[#e8d8bf]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'brown' || frame === 'brown-vintage') {
    return (
      <div 
        className="w-full h-full p-3 flex items-center justify-center"
        style={{
          backgroundColor: fColor || '#543721',
          border: `${bThick || '2px'} solid ${bColor || '#382212'}`,
          boxShadow: shadowCss,
          padding: fPadding,
          borderRadius: cRadius || '2px',
        }}
      >
        <div className="w-full h-full overflow-hidden border border-[#7a5537]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'thick-border') {
    return (
      <div 
        className="w-full h-full p-4 bg-[#fcf9f2] flex items-center justify-center"
        style={{
          border: `${bThick || '6px'} solid ${bColor || '#422d1b'}`,
          boxShadow: shadowCss,
          padding: fPadding,
          borderRadius: cRadius || '2px',
        }}
      >
        <div className="w-full h-full overflow-hidden border border-[#d6c4a8]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'double-border') {
    return (
      <div 
        className="w-full h-full p-2.5 bg-[#fcf8f0] flex items-center justify-center"
        style={{
          border: '4px double #5e3f24',
          boxShadow: shadowCss,
          padding: fPadding,
          borderRadius: cRadius || '2px',
        }}
      >
        <div className="w-full h-full overflow-hidden border border-[#b89c7d]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'rounded') {
    return (
      <div 
        className="w-full h-full p-2 bg-[#faf5ec] flex items-center justify-center"
        style={{
          borderRadius: cRadius || '14px',
          border: '1px solid #d9c8b0',
          boxShadow: shadowCss,
          padding: fPadding,
        }}
      >
        <div className="w-full h-full overflow-hidden rounded-[10px]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'square') {
    return (
      <div 
        className="w-full h-full bg-black/10 flex items-center justify-center"
        style={{
          boxShadow: shadowCss,
        }}
      >
        <div className="w-full h-full overflow-hidden">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'shadow-frame') {
    return (
      <div 
        className="w-full h-full p-2 bg-[#fffdfa] flex items-center justify-center"
        style={{
          boxShadow: '0 20px 35px -5px rgba(0, 0, 0, 0.4), 0 10px 15px -5px rgba(0, 0, 0, 0.2)',
          border: '1px solid #e8dec8',
          borderRadius: cRadius || '2px',
          padding: fPadding,
        }}
      >
        <div className="w-full h-full overflow-hidden">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'minimal-vintage') {
    return (
      <div 
        className="relative w-full h-full p-3 bg-[#f8f1e2] flex items-center justify-center"
        style={{
          border: '1px solid #c2a785',
          boxShadow: shadowCss,
          padding: fPadding,
        }}
      >
        <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-[#875d34]" />
        <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-[#875d34]" />
        <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-[#875d34]" />
        <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-[#875d34]" />
        <div className="w-full h-full overflow-hidden border border-[#d9c4a7]">{renderInnerImage()}</div>
      </div>
    );
  }

  // ============================================================
  // 2. POLAROID FRAMES
  // ============================================================
  if (frame === 'polaroid') {
    return (
      <div 
        className="w-full h-full flex flex-col justify-between p-2.5 pb-8 rounded-xs"
        style={{
          backgroundColor: fColor || '#faf6ee',
          borderColor: bColor || '#ded4c3',
          borderWidth: bThick || '1px',
          borderStyle: 'solid',
          boxShadow: shadowCss,
          borderRadius: cRadius || '2px',
          padding: fPadding,
        }}
      >
        <div className="w-full flex-1 overflow-hidden rounded-xs bg-[#24170d]/10 border border-[#e3d7c3]">
          {renderInnerImage()}
        </div>
        {caption ? (
          <div className="mt-2 text-center text-xs font-serif text-[#422c1b] truncate px-1 italic">
            {caption}
          </div>
        ) : (
          <div className="mt-1 h-3" />
        )}
      </div>
    );
  }

  if (frame === 'vintage-polaroid') {
    return (
      <div 
        className="w-full h-full flex flex-col justify-between p-3 pb-9 rounded-xs relative"
        style={{
          backgroundColor: fColor || '#ede0c4',
          borderColor: bColor || '#bda580',
          borderWidth: bThick || '1px',
          borderStyle: 'solid',
          boxShadow: shadowCss,
          borderRadius: cRadius || '2px',
          padding: fPadding,
        }}
      >
        <div className="w-full flex-1 overflow-hidden border border-[#9c825e] shadow-inner bg-[#3d2716]/10">
          {renderInnerImage()}
        </div>
        <div className="mt-2 flex items-center justify-between px-1 text-[10px] font-mono text-[#7a5c37] select-none">
          <span>{caption || 'MOMENTS'}</span>
          <span className="opacity-75">1934</span>
        </div>
      </div>
    );
  }

  if (frame === 'polaroid-cream') {
    return (
      <div 
        className="w-full h-full flex flex-col justify-between p-3 pb-8 bg-[#fdfaf2] border border-[#e8dcce]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full flex-1 overflow-hidden border border-[#f0e4d5]">{renderInnerImage()}</div>
        <div className="mt-2 text-center text-xs font-serif text-[#69543e] italic">{caption || 'Cherished'}</div>
      </div>
    );
  }

  if (frame === 'polaroid-dark') {
    return (
      <div 
        className="w-full h-full flex flex-col justify-between p-3 pb-8 bg-[#2d221a] border border-[#47372c]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full flex-1 overflow-hidden border border-[#1a130e]">{renderInnerImage()}</div>
        <div className="mt-2 text-center text-xs font-mono text-[#d1b897]">{caption || 'ARCHIVE'}</div>
      </div>
    );
  }

  if (frame === 'polaroid-wide') {
    return (
      <div 
        className="w-full h-full flex flex-col justify-between p-2 pb-7 bg-[#fcf8f0] border border-[#d9cdba]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full flex-1 overflow-hidden border border-[#d1c2ab]">{renderInnerImage()}</div>
        <div className="mt-1.5 text-center text-xs font-serif text-[#543b24]">{caption || 'Panorama'}</div>
      </div>
    );
  }

  if (frame === 'polaroid-tilted') {
    return (
      <div 
        className="relative w-full h-full flex flex-col justify-between p-2.5 pb-8 bg-[#faf4e6] border border-[#d9caa9]"
        style={{ boxShadow: shadowCss }}
      >
        {/* Brass pushpin at top */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#d4af37] border border-[#7a5f13] shadow-md z-20" />
        <div className="w-full flex-1 overflow-hidden border border-[#c4b391]">{renderInnerImage()}</div>
        <div className="mt-2 text-center text-xs font-serif text-[#4a321f]">{caption || 'Remember'}</div>
      </div>
    );
  }

  if (frame === 'polaroid-handwritten') {
    return (
      <div 
        className="w-full h-full flex flex-col justify-between p-3 pb-9 bg-[#f7eedc] border border-[#ccb491]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full flex-1 overflow-hidden border border-[#ba9f79]">{renderInnerImage()}</div>
        <div className="mt-2 text-center text-sm font-serif italic text-[#4f3319]">{caption || 'Forever & always'}</div>
      </div>
    );
  }

  if (frame === 'polaroid-double') {
    return (
      <div 
        className="w-full h-full p-2 pb-6 bg-[#faf5ea] border border-[#d6c4a8] flex flex-col"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full flex-1 overflow-hidden border-2 border-[#b89e7d] p-0.5">{renderInnerImage()}</div>
        <div className="mt-1.5 text-center text-[10px] font-mono text-[#8a6845] uppercase tracking-widest">{caption || 'NO. 01 / 02'}</div>
      </div>
    );
  }

  // ============================================================
  // 3. FLOWER & BOTANICAL FRAMES
  // ============================================================
  if (frame === 'flower-corner') {
    return (
      <div 
        className="relative w-full h-full p-3 bg-[#fdfbf7] border border-[#dbc6ab]"
        style={{ boxShadow: shadowCss }}
      >
        {/* Top-left floral corner */}
        <svg className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-10" viewBox="0 0 40 40">
          <path d="M4,36 Q4,4 36,4" fill="none" stroke="#4a633a" strokeWidth="2.5" />
          <circle cx="12" cy="12" r="5" fill="#a83b3b" />
          <circle cx="24" cy="6" r="3.5" fill="#c46262" />
          <circle cx="6" cy="24" r="3.5" fill="#c46262" />
        </svg>
        {/* Bottom-right floral corner */}
        <svg className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-10" viewBox="0 0 40 40">
          <path d="M36,4 Q36,36 4,36" fill="none" stroke="#4a633a" strokeWidth="2.5" />
          <circle cx="28" cy="28" r="5" fill="#a83b3b" />
          <circle cx="16" cy="34" r="3.5" fill="#c46262" />
          <circle cx="34" cy="16" r="3.5" fill="#c46262" />
        </svg>
        <div className="w-full h-full overflow-hidden border border-[#d6be9f]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'rose-garden') {
    return (
      <div 
        className="w-full h-full p-3.5 bg-[#faf0ea] border-2 border-[#b84d4d]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border border-[#d97c7c]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'daisy-meadow') {
    return (
      <div 
        className="w-full h-full p-3 bg-[#f9f8f2] border-2 border-[#cca856]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border border-[#e0c479]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'botanical-leaves') {
    return (
      <div 
        className="w-full h-full p-3 bg-[#f3f7f0] border-2 border-[#4d6943]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border border-[#7a9e6d]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'dried-flower') {
    return (
      <div 
        className="relative w-full h-full p-3 bg-[#f7eedc] border border-[#ba9a6a]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border border-[#d6ba94] bg-[#faf5ec]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'flower-wreath' || frame === 'antique-oval') {
    return (
      <div 
        className="w-full h-full p-3 bg-[#fcf8f0] border border-[#ccb08d] rounded-[24px]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden rounded-[18px] border-2 border-[#a3794b]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'pressed-fern') {
    return (
      <div 
        className="w-full h-full p-3 bg-[#edf2e8] border border-[#527049]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border border-[#7e9c74]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'lavender-sprig') {
    return (
      <div 
        className="w-full h-full p-3 bg-[#f6f2f7] border border-[#8b6f9e]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border border-[#bfa8cf]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'golden-sunflower') {
    return (
      <div 
        className="w-full h-full p-3.5 bg-[#fffaf0] border-2 border-[#cc9425]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border border-[#deb04e]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'autumn-leaves') {
    return (
      <div 
        className="w-full h-full p-3 bg-[#faeee6] border-2 border-[#a85226]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border border-[#c77a54]">{renderInnerImage()}</div>
      </div>
    );
  }

  // ============================================================
  // 4. VINTAGE FRAMES
  // ============================================================
  if (frame === 'parchment') {
    return (
      <div 
        className="w-full h-full p-3 bg-[#e8d8b5] border border-[#a1824a]"
        style={{
          boxShadow: `${shadowCss}, inset 0 0 16px rgba(120,80,30,0.35)`,
        }}
      >
        <div className="w-full h-full overflow-hidden border border-[#8f6d32]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'torn-paper' || frame === 'old-paper') {
    return (
      <div 
        className="w-full h-full p-2.5 bg-[#f4ebdb] border border-[#c4ae8a]"
        style={{
          boxShadow: `${shadowCss}, inset 0 0 10px rgba(138,102,60,0.25)`,
        }}
      >
        <div className="w-full h-full overflow-hidden border border-[#ab926c]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'old-newspaper') {
    return (
      <div 
        className="w-full h-full flex flex-col justify-between p-2 pb-5 bg-[#eae2d3] border-2 border-[#2b241c]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="text-[8px] font-serif uppercase tracking-widest text-[#2b241c] text-center border-b border-[#2b241c] pb-0.5 mb-1 font-bold">
          DAILY CHRONICLE • 1928
        </div>
        <div className="w-full flex-1 overflow-hidden border border-[#2b241c]">{renderInnerImage()}</div>
        <div className="text-[7px] font-serif text-[#473b2d] text-center mt-1 truncate">
          {caption || 'Photograph recorded for archive'}
        </div>
      </div>
    );
  }

  if (frame === 'sepia') {
    return (
      <div 
        className="w-full h-full p-3 bg-[#704d2e] border-2 border-[#472d16]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border-2 border-[#a67d58]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'aged-paper') {
    return (
      <div 
        className="w-full h-full p-3 bg-[#ebdcc0] border border-[#a88a5b]"
        style={{ boxShadow: `${shadowCss}, inset 0 0 20px rgba(100,60,20,0.3)` }}
      >
        <div className="w-full h-full overflow-hidden border border-[#8c6f41]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'postcard') {
    return (
      <div 
        className="relative w-full h-full p-2 pb-6 bg-[#f7eedc] border border-[#b89b70]"
        style={{ boxShadow: shadowCss }}
      >
        {/* Postcard stamp */}
        <div className="absolute top-2 right-2 w-5 h-6 border border-[#a13b3b] bg-[#f5e6e6] flex items-center justify-center text-[7px] text-[#a13b3b] font-mono z-10">
          5¢
        </div>
        <div className="w-full flex-1 overflow-hidden border border-[#c4ae8d]">{renderInnerImage()}</div>
        <div className="text-[8px] font-serif text-[#63492e] text-center mt-1">POST CARD</div>
      </div>
    );
  }

  if (frame === 'old-letter') {
    return (
      <div 
        className="w-full h-full p-2 bg-[#fcf9f2] border-4 border-dashed border-[#b83b3b]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border border-[#cca77d]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'distressed') {
    return (
      <div 
        className="w-full h-full p-2.5 bg-[#523d2b] border-2 border-[#26190f]"
        style={{ boxShadow: `${shadowCss}, inset 0 0 12px rgba(0,0,0,0.6)` }}
      >
        <div className="w-full h-full overflow-hidden border border-[#806349]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'cabinet-card') {
    return (
      <div 
        className="w-full h-full flex flex-col justify-between p-3 pb-8 bg-[#3d2716] border-2 border-[#241306]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full flex-1 overflow-hidden border border-[#7d5635] shadow-inner">{renderInnerImage()}</div>
        <div className="mt-1.5 text-center text-[9px] font-serif tracking-widest text-[#d9b882] font-bold">
          {caption || 'PARIS • 1912'}
        </div>
      </div>
    );
  }

  // ============================================================
  // 5. SCRAPBOOK FRAMES
  // ============================================================
  if (frame === 'tape' || frame === 'tape-corners') {
    return (
      <div 
        className="relative w-full h-full p-2 bg-[#faf5ea]"
        style={{
          boxShadow: shadowCss,
          border: '1px solid #dfd2be',
        }}
      >
        {/* Top-left tape */}
        <div 
          className="absolute -top-2 -left-3 w-8 h-3.5 opacity-85 pointer-events-none z-10"
          style={{
            backgroundColor: tColor,
            transform: 'rotate(-32deg)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        />
        {/* Top-right tape */}
        <div 
          className="absolute -top-2 -right-3 w-8 h-3.5 opacity-85 pointer-events-none z-10"
          style={{
            backgroundColor: tColor,
            transform: 'rotate(32deg)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        />
        {/* Bottom-left tape */}
        <div 
          className="absolute -bottom-2 -left-3 w-8 h-3.5 opacity-85 pointer-events-none z-10"
          style={{
            backgroundColor: tColor,
            transform: 'rotate(32deg)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        />
        {/* Bottom-right tape */}
        <div 
          className="absolute -bottom-2 -right-3 w-8 h-3.5 opacity-85 pointer-events-none z-10"
          style={{
            backgroundColor: tColor,
            transform: 'rotate(-32deg)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        />
        <div className="w-full h-full overflow-hidden">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'paper-corners' || frame === 'scrapbook') {
    return (
      <div 
        className="relative w-full h-full p-2 bg-[#faf4e6] border border-[#dfd2ba]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[#1f150d] z-10" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[#1f150d] z-10" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[#1f150d] z-10" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[#1f150d] z-10" />
        <div className="w-full h-full overflow-hidden">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'layered-paper') {
    return (
      <div 
        className="relative w-full h-full p-3 bg-[#ebd7ba] border border-[#ab8a5b]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="absolute inset-1 bg-[#fcf8f0] border border-[#c7ab83]" />
        <div className="relative w-full h-full overflow-hidden z-10">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'paper-clip') {
    return (
      <div 
        className="relative w-full h-full p-2 bg-[#faf5e8] border border-[#cca77d]"
        style={{ boxShadow: shadowCss }}
      >
        {/* Brass clip on top */}
        <svg className="absolute -top-3 left-4 w-5 h-8 pointer-events-none z-20" viewBox="0 0 30 60">
          <path d="M10,50 L10,15 C10,6 20,6 20,15 L20,45 C20,52 14,52 14,45 L14,20" fill="none" stroke="#d4af37" strokeWidth="3.5" />
        </svg>
        <div className="w-full h-full overflow-hidden">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'ribbon-sash') {
    return (
      <div 
        className="relative w-full h-full p-2 bg-[#fdfbf7] border border-[#d4c0a5]"
        style={{ boxShadow: shadowCss }}
      >
        {/* Diagonal silk ribbon in corner */}
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none z-10">
          <div className="w-16 h-3 bg-[#9e2d2d] transform rotate-45 translate-x-2 -translate-y-1 shadow-sm" />
        </div>
        <div className="w-full h-full overflow-hidden">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'collage') {
    return (
      <div 
        className="w-full h-full p-3 bg-[#e8d2b0] border-2 border-[#8c673b]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border border-[#ad8857] bg-[#fcf9f2]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'handmade-paper') {
    return (
      <div 
        className="w-full h-full p-3 bg-[#f5ede1] border-2 border-dotted border-[#ad906a]"
        style={{ boxShadow: `${shadowCss}, inset 0 0 10px rgba(120,80,30,0.15)` }}
      >
        <div className="w-full h-full overflow-hidden border border-[#cca87d]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'washi-strips') {
    return (
      <div 
        className="relative w-full h-full p-2 bg-[#fcf7ee] border border-[#dec9ab]"
        style={{ boxShadow: shadowCss }}
      >
        {/* Top washi strip */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#e8c3b0]/90 border border-[#b88f7b] z-10 shadow-xs" />
        {/* Bottom washi strip */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#e8c3b0]/90 border border-[#b88f7b] z-10 shadow-xs" />
        <div className="w-full h-full overflow-hidden">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'stamp-corners') {
    return (
      <div 
        className="relative w-full h-full p-2.5 bg-[#fbf6ec] border border-[#d1baa0]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border border-[#bfa282]">{renderInnerImage()}</div>
      </div>
    );
  }

  // ============================================================
  // 6. FILM FRAMES
  // ============================================================
  if (frame === 'film' || frame === 'film-35mm') {
    return (
      <div 
        className="w-full h-full flex flex-col justify-between p-1 bg-[#1a1612] rounded-xs"
        style={{ boxShadow: shadowCss }}
      >
        {/* Top sprocket holes */}
        <div className="flex items-center justify-around py-0.5">
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="w-2.5 h-1.5 bg-[#ecd5b5] rounded-xs" />
          ))}
        </div>
        <div className="w-full flex-1 overflow-hidden border border-[#382b20]">{renderInnerImage()}</div>
        {/* Bottom sprocket holes */}
        <div className="flex items-center justify-around py-0.5">
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="w-2.5 h-1.5 bg-[#ecd5b5] rounded-xs" />
          ))}
        </div>
      </div>
    );
  }

  if (frame === 'film-negative') {
    return (
      <div 
        className="w-full h-full p-2 bg-[#2e1d0f] border-2 border-[#57391f]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border border-[#805731]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'vintage-camera') {
    return (
      <div 
        className="relative w-full h-full p-2 bg-[#211b15] border-2 border-[#45382b]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-white/40 pointer-events-none z-10" />
        <div className="w-full h-full overflow-hidden">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'contact-sheet') {
    return (
      <div 
        className="relative w-full h-full p-2 pb-5 bg-[#171411] border border-[#3b3024]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full flex-1 overflow-hidden border border-[#42372c]">{renderInnerImage()}</div>
        <div className="text-[8px] font-mono text-[#e65c5c] text-center mt-1">FRAME 24A</div>
      </div>
    );
  }

  if (frame === 'cinema-scope') {
    return (
      <div 
        className="w-full h-full p-2 bg-black rounded-[14px]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden rounded-[8px]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'slide-mount') {
    return (
      <div 
        className="w-full h-full flex flex-col justify-between p-3 pb-7 bg-[#fcf9f2] border-2 border-[#d9cbb8]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full flex-1 overflow-hidden border border-[#ab9982] shadow-inner">{renderInnerImage()}</div>
        <div className="mt-1 text-center text-[8px] font-mono text-[#786146]">KODACHROME 1965</div>
      </div>
    );
  }

  if (frame === 'medium-format') {
    return (
      <div 
        className="w-full h-full p-2 bg-[#1c1813] border border-[#473b2d]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border-2 border-[#2b241c]">{renderInnerImage()}</div>
      </div>
    );
  }

  // ============================================================
  // 7. DECORATIVE FRAMES
  // ============================================================
  if (frame === 'wooden' || frame === 'carved-wood') {
    return (
      <div 
        className="w-full h-full p-3 rounded-xs flex items-center justify-center"
        style={{
          background: fColor || 'linear-gradient(135deg, #4a2810 0%, #2b1406 50%, #4a2810 100%)',
          borderColor: bColor || '#1f0d04',
          borderWidth: bThick || '4px',
          borderStyle: 'solid',
          boxShadow: `${shadowCss}, inset 0 0 8px rgba(0,0,0,0.8)`,
          borderRadius: cRadius || '3px',
          padding: fPadding,
        }}
      >
        <div className="w-full h-full overflow-hidden border-2 border-[#805020]/70 rounded-xs shadow-inner">
          {renderInnerImage()}
        </div>
      </div>
    );
  }

  if (frame === 'lace') {
    return (
      <div 
        className="w-full h-full p-3 bg-[#faf6ee] border-4 border-dotted border-[#cca87a]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border border-[#d9c09c]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'ribbon') {
    return (
      <div 
        className="relative w-full h-full p-2.5 bg-[#fdfaf5] border-2 border-[#9e3a38]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border border-[#d68585]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'heart-corner') {
    return (
      <div 
        className="relative w-full h-full p-2.5 bg-[#fdf8f4] border border-[#d9b89c]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="absolute top-1 left-1 text-[10px] text-[#b84d4d]">♥</div>
        <div className="absolute top-1 right-1 text-[10px] text-[#b84d4d]">♥</div>
        <div className="absolute bottom-1 left-1 text-[10px] text-[#b84d4d]">♥</div>
        <div className="absolute bottom-1 right-1 text-[10px] text-[#b84d4d]">♥</div>
        <div className="w-full h-full overflow-hidden border border-[#e8ceb5]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'star-corner') {
    return (
      <div 
        className="relative w-full h-full p-2.5 bg-[#fcfaf5] border border-[#cca752]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="absolute top-1 left-1 text-[9px] text-[#cca752]">★</div>
        <div className="absolute top-1 right-1 text-[9px] text-[#cca752]">★</div>
        <div className="absolute bottom-1 left-1 text-[9px] text-[#cca752]">★</div>
        <div className="absolute bottom-1 right-1 text-[9px] text-[#cca752]">★</div>
        <div className="w-full h-full overflow-hidden border border-[#e6d091]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'ornamental') {
    return (
      <div 
        className="w-full h-full p-3 bg-[#faf4e6] border-2 border-[#a8823b]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border-2 border-[#cca354]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'classic-vintage') {
    return (
      <div 
        className="w-full h-full p-3 bg-[#422914] border-4 border-[#784e2a]"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border border-[#c49a37]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'postage') {
    return (
      <div 
        className="w-full h-full p-2.5 bg-[#f5ede1] border-4 border-dashed border-[#8c5737] rounded-xs"
        style={{ boxShadow: shadowCss }}
      >
        <div className="w-full h-full overflow-hidden border border-[#ab7b57]">{renderInnerImage()}</div>
      </div>
    );
  }

  if (frame === 'embossed-gold') {
    return (
      <div 
        className="w-full h-full p-3.5 bg-[#3b2d13] border-4 border-[#cca73d]"
        style={{
          boxShadow: `${shadowCss}, inset 0 0 10px rgba(255,215,0,0.3)`,
        }}
      >
        <div className="w-full h-full overflow-hidden border-2 border-[#ffd700]">{renderInnerImage()}</div>
      </div>
    );
  }

  // Fallback: None (pure borderless)
  return (
    <div 
      className="w-full h-full overflow-hidden"
      style={{
        boxShadow: shadowCss,
        borderRadius: cRadius || '1px',
      }}
    >
      {renderInnerImage()}
    </div>
  );
};
