export type InteractionMode = 'select' | 'text' | 'draw' | 'turn';

export type DrawingTool = 'fountain' | 'pen' | 'pencil' | 'brush' | 'highlighter' | 'eraser';

export interface DrawingPoint {
  x: number;
  y: number;
  pressure?: number;
  time?: number;
}

export interface DrawingStroke {
  id: string;
  tool: DrawingTool;
  color: string;
  size: number;
  opacity: number;
  points: DrawingPoint[];
}

export type PhotoFrameType = 
  // Simple
  | 'thin-white'
  | 'thin-black'
  | 'cream'
  | 'brown'
  | 'thick-border'
  | 'double-border'
  | 'rounded'
  | 'square'
  | 'shadow-frame'
  | 'minimal-vintage'
  // Polaroid
  | 'polaroid'
  | 'vintage-polaroid'
  | 'polaroid-cream'
  | 'polaroid-dark'
  | 'polaroid-wide'
  | 'polaroid-tilted'
  | 'polaroid-handwritten'
  | 'polaroid-double'
  // Flower & Botanical
  | 'flower-corner'
  | 'rose-garden'
  | 'daisy-meadow'
  | 'botanical-leaves'
  | 'dried-flower'
  | 'flower-wreath'
  | 'pressed-fern'
  | 'lavender-sprig'
  | 'golden-sunflower'
  | 'autumn-leaves'
  // Vintage
  | 'parchment'
  | 'torn-paper'
  | 'old-newspaper'
  | 'sepia'
  | 'aged-paper'
  | 'postcard'
  | 'old-letter'
  | 'distressed'
  | 'cabinet-card'
  | 'antique-oval'
  // Scrapbook
  | 'tape'
  | 'tape-corners'
  | 'paper-corners'
  | 'scrapbook'
  | 'layered-paper'
  | 'paper-clip'
  | 'ribbon-sash'
  | 'collage'
  | 'handmade-paper'
  | 'washi-strips'
  | 'stamp-corners'
  // Film
  | 'film'
  | 'film-35mm'
  | 'film-negative'
  | 'vintage-camera'
  | 'contact-sheet'
  | 'cinema-scope'
  | 'slide-mount'
  | 'medium-format'
  // Decorative
  | 'wooden'
  | 'carved-wood'
  | 'lace'
  | 'ribbon'
  | 'heart-corner'
  | 'star-corner'
  | 'ornamental'
  | 'classic-vintage'
  | 'postage'
  | 'embossed-gold'
  | 'brown-vintage'
  | 'cream-paper'
  | 'old-paper'
  | 'hand-torn'
  | 'none';

// Backward compatibility alias
export type PhotoFrame = PhotoFrameType;

export interface PhotoAdjustments {
  brightness: number; // 50 to 150 (%)
  contrast: number; // 50 to 150 (%)
  saturation: number; // 0 to 200 (%)
  sepia: number; // 0 to 100 (%)
  warmth: number; // -50 to 50
  blur: number; // 0 to 10 (px)
  vintageFaded: boolean;
}

export interface PhotoFrameStyle {
  frameColor?: string;
  borderColor?: string;
  tapeColor?: string;
  borderThickness?: number; // 0 to 24 px
  padding?: number; // 0 to 40 px
  cornerRadius?: number; // 0 to 40 px
  shadowSize?: number; // 0 to 40 px
  shadowOpacity?: number; // 0 to 1
}

export interface PhotoCropZoom {
  zoom: number; // 50 to 300 (%)
  panX: number; // -100 to 100 (% offset)
  panY: number; // -100 to 100 (% offset)
  fitMode: 'cover' | 'contain';
}

export interface PhotoItem {
  id: string;
  type: 'photo';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scale: number;
  opacity: number;
  zIndex: number;
  url: string;
  frame: PhotoFrameType;
  caption?: string;
  locked?: boolean;
  cropZoom?: PhotoCropZoom;
  adjustments?: PhotoAdjustments;
  frameStyle?: PhotoFrameStyle;
}

export interface TextItem {
  id: string;
  type: 'text';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scale: number;
  opacity: number;
  zIndex: number;
  text: string;
  font: string;
  fontSize: number;
  color: string;
  letterSpacing: number;
  shadow: boolean;
  fadedVintage: boolean;
  locked?: boolean;
}

export type StickerCategory = 
  | 'all'
  | 'hearts'
  | 'flowers'
  | 'leaves'
  | 'vintage'
  | 'scrapbook'
  | 'travel'
  | 'memory'
  | 'simple'
  | 'decoration'
  | 'tape'
  | 'stamp';

export interface StickerItem {
  id: string;
  type: 'sticker';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scale: number;
  opacity: number;
  zIndex: number;
  stickerId: string;
  category: StickerCategory;
  locked?: boolean;
}

export type PageBackgroundType = 'color' | 'gradient' | 'texture' | 'none';

export type GradientType = 'linear' | 'radial' | 'conic';

export interface ColorStop {
  id: string;
  color: string;
  offset: number; // 0 to 100
}

export interface GradientConfig {
  type: GradientType;
  angle: number; // in degrees
  stops: ColorStop[];
  opacity: number; // 0 to 1
  positionX?: number; // percentage 0-100 for radial/conic
  positionY?: number;
}

export type VintageTextureId = 
  | 'none'
  | 'old-paper'
  | 'antique'
  | 'aged-parchment'
  | 'cream-paper'
  | 'sepia-paper'
  | 'rough-paper'
  | 'stained-paper'
  | 'vintage-brown';

export interface PageBackground {
  type: PageBackgroundType;
  color: string;
  gradient: GradientConfig;
  texture: VintageTextureId;
}

export interface DiaryPage {
  id: string;
  pageNumber: number;
  isCover?: boolean;
  locked?: boolean;
  background: PageBackground;
  texts: TextItem[];
  photos: PhotoItem[];
  stickers: StickerItem[];
  drawings: DrawingStroke[];
}

export interface CustomSavedColor {
  id: string;
  name: string;
  type: 'solid' | 'gradient';
  color?: string;
  gradient?: GradientConfig;
}

export interface DiarySettings {
  soundEnabled: boolean;
  volume: number; // 0 to 1
  animationsEnabled: boolean;
  showPageNumbers: boolean;
  autosaveEnabled: boolean;
  theme: 'vintage-dark' | 'vintage-light';
  defaultPageColor: string;
  defaultPageTexture: VintageTextureId;
}
