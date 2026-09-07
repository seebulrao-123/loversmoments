import { StickerCategory } from '../types';

export interface StickerDefinition {
  id: string;
  name: string;
  category: StickerCategory;
  width: number;
  height: number;
  svg: string;
  tags?: string[];
}

export const STICKER_CATALOG: StickerDefinition[] = [
  // ==========================================
  // 1. HEARTS (8 stickers)
  // ==========================================
  {
    id: 'heart-simple',
    name: 'Simple Warm Heart',
    category: 'hearts',
    width: 60,
    height: 60,
    tags: ['love', 'minimal', 'warm', 'red'],
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M30,48 C20,38 8,28 8,18 C8,10 14,5 22,5 C26,5 29,8 30,11 C31,8 34,5 38,5 C46,5 52,10 52,18 C52,28 40,38 30,48 Z" fill="#9e3d34"/>
    </svg>`,
  },
  {
    id: 'heart-outlined',
    name: 'Outlined Ink Heart',
    category: 'hearts',
    width: 60,
    height: 60,
    tags: ['ink', 'pen', 'sketch'],
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M30,48 C18,36 8,26 8,16 C8,9 14,5 21,5 C26,5 29,8 30,12 C31,8 34,5 39,5 C46,5 52,9 52,16 C52,26 42,36 30,48 Z" fill="none" stroke="#4a2e1b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M30,44 C22,34 14,26 14,18 C14,13 18,10 22,10" fill="none" stroke="#8b4513" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
    </svg>`,
  },
  {
    id: 'heart-vintage-stamp',
    name: 'Vintage Red Heart Stamp',
    category: 'hearts',
    width: 70,
    height: 70,
    tags: ['stamp', 'distressed', 'postal'],
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="30" fill="#f5ede0" stroke="#8a2e2b" stroke-width="2" stroke-dasharray="3,2"/>
      <path d="M35,50 C23,40 16,31 16,22 C16,15 21,11 27,11 C31,11 34,13 35,16 C36,13 39,11 43,11 C49,11 54,15 54,22 C54,31 47,40 35,50 Z" fill="#8a2e2b" opacity="0.85"/>
      <text x="35" y="60" font-family="serif" font-size="7" fill="#8a2e2b" text-anchor="middle" letter-spacing="1">AMOUR</text>
    </svg>`,
  },
  {
    id: 'heart-double',
    name: 'Intertwined Double Hearts',
    category: 'hearts',
    width: 85,
    height: 60,
    tags: ['together', 'romance', 'lovers'],
    svg: `<svg viewBox="0 0 85 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M26,45 C15,35 6,26 6,17 C6,10 11,6 18,6 C22,6 25,8 26,11 C27,8 30,6 34,6 C41,6 46,10 46,17 C46,26 37,35 26,45 Z" fill="#aa4a44" opacity="0.85"/>
      <path d="M56,48 C45,38 36,29 36,20 C36,13 41,9 48,9 C52,9 55,11 56,14 C57,11 60,9 64,9 C71,9 76,13 76,20 C76,29 67,38 56,48 Z" fill="#7a322b" opacity="0.75"/>
    </svg>`,
  },
  {
    id: 'heart-ribbon',
    name: 'Tied Heart Ribbon',
    category: 'hearts',
    width: 75,
    height: 75,
    tags: ['ribbon', 'bow', 'gift'],
    svg: `<svg viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg">
      <path d="M37,55 C25,43 14,32 14,21 C14,12 21,7 29,7 C34,7 36,9 37,12 C38,9 41,7 46,7 C54,7 61,12 61,21 C61,32 50,43 37,55 Z" fill="none" stroke="#b2533e" stroke-width="3"/>
      <path d="M37,12 Q30,2 24,6 Q20,10 26,14 Q32,16 37,13" fill="none" stroke="#b2533e" stroke-width="2.5"/>
      <path d="M37,12 Q44,2 50,6 Q54,10 48,14 Q42,16 37,13" fill="none" stroke="#b2533e" stroke-width="2.5"/>
      <path d="M36,14 Q28,26 22,35" fill="none" stroke="#b2533e" stroke-width="2" stroke-linecap="round"/>
      <path d="M38,14 Q46,26 52,35" fill="none" stroke="#b2533e" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'heart-paper-cut',
    name: 'Kraft Paper Heart',
    category: 'hearts',
    width: 65,
    height: 65,
    tags: ['kraft', 'paper', 'crease'],
    svg: `<svg viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg">
      <path d="M32,54 C18,42 8,30 8,18 C8,9 15,4 24,4 C29,4 32,7 32,10 C32,7 36,4 41,4 C50,4 57,9 57,18 C57,30 47,42 32,54 Z" fill="#d4ad7c" stroke="#8b5a2b" stroke-width="1.5"/>
      <line x1="32" y1="10" x2="32" y2="53" stroke="#8b5a2b" stroke-width="1" stroke-dasharray="2,2"/>
    </svg>`,
  },
  {
    id: 'heart-botanical',
    name: 'Floral Vine Heart',
    category: 'hearts',
    width: 75,
    height: 75,
    tags: ['vine', 'leaves', 'botanical'],
    svg: `<svg viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg">
      <path d="M37,60 C24,47 12,35 12,22 C12,12 20,7 29,7 C34,7 36,9 37,12 C38,9 41,7 46,7 C55,7 63,12 63,22 C63,35 51,47 37,60 Z" fill="none" stroke="#506b45" stroke-width="2"/>
      <circle cx="20" cy="18" r="3" fill="#c46262"/>
      <circle cx="55" cy="18" r="3" fill="#c46262"/>
      <circle cx="37" cy="45" r="2.5" fill="#d97777"/>
      <path d="M22,12 Q20,6 25,8" stroke="#506b45" stroke-width="1.5" fill="none"/>
      <path d="M53,12 Q55,6 50,8" stroke="#506b45" stroke-width="1.5" fill="none"/>
    </svg>`,
  },
  {
    id: 'heart-stitched',
    name: 'Stitched Antique Heart',
    category: 'hearts',
    width: 65,
    height: 65,
    tags: ['embroidery', 'stitch', 'craft'],
    svg: `<svg viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg">
      <path d="M32,52 C18,40 10,29 10,18 C10,10 16,6 23,6 C28,6 31,8 32,11 C34,8 37,6 42,6 C49,6 55,10 55,18 C55,29 47,40 32,52 Z" fill="#e8d8c3" stroke="#874330" stroke-width="2.5" stroke-dasharray="4,3"/>
    </svg>`,
  },

  // ==========================================
  // 2. FLOWERS (12 stickers)
  // ==========================================
  {
    id: 'flower-rose',
    name: 'Vintage Red Rose',
    category: 'flowers',
    width: 70,
    height: 85,
    tags: ['rose', 'romantic', 'red', 'classic'],
    svg: `<svg viewBox="0 0 70 85" xmlns="http://www.w3.org/2000/svg">
      <path d="M35,38 Q32,65 35,80" stroke="#3d5236" stroke-width="2.5" fill="none"/>
      <path d="M35,52 Q48,45 42,56" fill="#4d6945" stroke="#3d5236" stroke-width="1"/>
      <path d="M34,62 Q20,56 26,67" fill="#4d6945" stroke="#3d5236" stroke-width="1"/>
      <circle cx="35" cy="25" r="18" fill="#8f2d2b"/>
      <path d="M35,12 C42,12 47,17 47,24 C47,32 35,38 35,38 C35,38 23,32 23,24 C23,17 28,12 35,12 Z" fill="#ab3c39"/>
      <path d="M35,16 C39,16 42,19 42,23 C42,27 35,31 35,31 C35,31 28,27 28,23 C28,19 31,16 35,16 Z" fill="#c44d4a"/>
      <path d="M35,20 Q37,22 35,24" stroke="#e07b78" stroke-width="1.5" fill="none"/>
    </svg>`,
  },
  {
    id: 'flower-daisy',
    name: 'White Garden Daisy',
    category: 'flowers',
    width: 65,
    height: 65,
    tags: ['daisy', 'cheerful', 'white', 'yellow'],
    svg: `<svg viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg">
      <g fill="#fdfbf7" stroke="#cca87a" stroke-width="1">
        <ellipse cx="32" cy="12" rx="4.5" ry="10"/>
        <ellipse cx="32" cy="53" rx="4.5" ry="10"/>
        <ellipse cx="12" cy="32.5" rx="10" ry="4.5"/>
        <ellipse cx="53" cy="32.5" rx="10" ry="4.5"/>
        <ellipse cx="18" cy="18" rx="5" ry="10" transform="rotate(-45 18 18)"/>
        <ellipse cx="47" cy="47" rx="5" ry="10" transform="rotate(-45 47 47)"/>
        <ellipse cx="47" cy="18" rx="5" ry="10" transform="rotate(45 47 18)"/>
        <ellipse cx="18" cy="47" rx="5" ry="10" transform="rotate(45 18 47)"/>
      </g>
      <circle cx="32.5" cy="32.5" r="9" fill="#d99b26" stroke="#9e6e15" stroke-width="1.5"/>
      <circle cx="31" cy="31" r="7" fill="#e6af3a"/>
    </svg>`,
  },
  {
    id: 'flower-sunflower',
    name: 'Golden Sunflower',
    category: 'flowers',
    width: 75,
    height: 75,
    tags: ['sunflower', 'summer', 'bright'],
    svg: `<svg viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg">
      <g fill="#e3a020" stroke="#a16b08" stroke-width="0.8">
        <ellipse cx="37.5" cy="15" rx="4" ry="13" transform="rotate(0 37.5 37.5)"/>
        <ellipse cx="37.5" cy="15" rx="4" ry="13" transform="rotate(30 37.5 37.5)"/>
        <ellipse cx="37.5" cy="15" rx="4" ry="13" transform="rotate(60 37.5 37.5)"/>
        <ellipse cx="37.5" cy="15" rx="4" ry="13" transform="rotate(90 37.5 37.5)"/>
        <ellipse cx="37.5" cy="15" rx="4" ry="13" transform="rotate(120 37.5 37.5)"/>
        <ellipse cx="37.5" cy="15" rx="4" ry="13" transform="rotate(150 37.5 37.5)"/>
        <ellipse cx="37.5" cy="15" rx="4" ry="13" transform="rotate(180 37.5 37.5)"/>
        <ellipse cx="37.5" cy="15" rx="4" ry="13" transform="rotate(210 37.5 37.5)"/>
        <ellipse cx="37.5" cy="15" rx="4" ry="13" transform="rotate(240 37.5 37.5)"/>
        <ellipse cx="37.5" cy="15" rx="4" ry="13" transform="rotate(270 37.5 37.5)"/>
        <ellipse cx="37.5" cy="15" rx="4" ry="13" transform="rotate(300 37.5 37.5)"/>
        <ellipse cx="37.5" cy="15" rx="4" ry="13" transform="rotate(330 37.5 37.5)"/>
      </g>
      <circle cx="37.5" cy="37.5" r="14" fill="#4d3013" stroke="#2b1a09" stroke-width="2"/>
      <circle cx="37.5" cy="37.5" r="10" fill="#3a230c" stroke="#63401c" stroke-width="1" stroke-dasharray="2,2"/>
    </svg>`,
  },
  {
    id: 'flower-lavender',
    name: 'Tied Lavender Sprigs',
    category: 'flowers',
    width: 50,
    height: 90,
    tags: ['lavender', 'purple', 'provence', 'herb'],
    svg: `<svg viewBox="0 0 50 90" xmlns="http://www.w3.org/2000/svg">
      <line x1="25" y1="35" x2="25" y2="85" stroke="#526645" stroke-width="2"/>
      <line x1="20" y1="40" x2="25" y2="85" stroke="#526645" stroke-width="1.5"/>
      <line x1="30" y1="40" x2="25" y2="85" stroke="#526645" stroke-width="1.5"/>
      <g fill="#7d6396">
        <ellipse cx="25" cy="12" rx="4" ry="5"/>
        <ellipse cx="22" cy="18" rx="4" ry="5"/>
        <ellipse cx="28" cy="18" rx="4" ry="5"/>
        <ellipse cx="21" cy="25" rx="4" ry="6"/>
        <ellipse cx="29" cy="25" rx="4" ry="6"/>
        <ellipse cx="23" cy="32" rx="4" ry="6"/>
        <ellipse cx="27" cy="32" rx="4" ry="6"/>
        <ellipse cx="18" cy="32" rx="3.5" ry="5"/>
        <ellipse cx="32" cy="32" rx="3.5" ry="5"/>
      </g>
      <rect x="21" y="65" width="8" height="5" rx="1" fill="#c49b6b" stroke="#7a5530" stroke-width="1"/>
    </svg>`,
  },
  {
    id: 'flower-bouquet',
    name: 'Vintage Wildflower Bouquet',
    category: 'flowers',
    width: 80,
    height: 95,
    tags: ['bouquet', 'garden', 'colors'],
    svg: `<svg viewBox="0 0 80 95" xmlns="http://www.w3.org/2000/svg">
      <path d="M40,55 L35,90 M40,55 L42,90 M40,55 L48,88" stroke="#4a633d" stroke-width="2"/>
      <circle cx="35" cy="30" r="12" fill="#ba4848"/>
      <circle cx="48" cy="36" r="10" fill="#e0a338"/>
      <circle cx="30" cy="44" r="8" fill="#5879a2"/>
      <circle cx="46" cy="22" r="7" fill="#8e5894"/>
      <circle cx="24" cy="30" r="6" fill="#e3d6ba"/>
      <path d="M32,68 Q40,64 48,68" stroke="#996a40" stroke-width="3"/>
    </svg>`,
  },
  {
    id: 'flower-cherry-blossom',
    name: 'Sakura Blossom',
    category: 'flowers',
    width: 65,
    height: 65,
    tags: ['sakura', 'pink', 'spring', 'japan'],
    svg: `<svg viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg">
      <g fill="#f7cfd8" stroke="#d68a9b" stroke-width="1">
        <path d="M32.5,32.5 Q30,12 32.5,8 Q35,12 32.5,32.5"/>
        <path d="M32.5,32.5 Q52,24 56,26 Q52,30 32.5,32.5"/>
        <path d="M32.5,32.5 Q48,50 46,54 Q42,50 32.5,32.5"/>
        <path d="M32.5,32.5 Q18,50 16,46 Q20,42 32.5,32.5"/>
        <path d="M32.5,32.5 Q12,22 14,18 Q18,22 32.5,32.5"/>
      </g>
      <circle cx="32.5" cy="32.5" r="4.5" fill="#d95d75"/>
    </svg>`,
  },
  {
    id: 'flower-floral-corner',
    name: 'Decorative Floral Corner',
    category: 'flowers',
    width: 80,
    height: 80,
    tags: ['corner', 'border', 'vintage', 'flourish'],
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,70 Q10,10 70,10" fill="none" stroke="#506646" stroke-width="2"/>
      <circle cx="15" cy="22" r="5" fill="#a84343"/>
      <circle cx="28" cy="14" r="6" fill="#ba5959"/>
      <circle cx="12" cy="40" r="4" fill="#cf7a7a"/>
      <circle cx="45" cy="11" r="4.5" fill="#c47849"/>
      <path d="M12,28 Q18,30 16,34" fill="#506646"/>
      <path d="M34,14 Q38,20 42,16" fill="#506646"/>
    </svg>`,
  },
  {
    id: 'flower-dried-herbarium',
    name: 'Pressed Herbarium Flower',
    category: 'flowers',
    width: 60,
    height: 85,
    tags: ['pressed', 'dried', 'botanical'],
    svg: `<svg viewBox="0 0 60 85" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="25" x2="30" y2="80" stroke="#7a6949" stroke-width="1.8"/>
      <ellipse cx="30" cy="20" rx="8" ry="12" fill="#b08d66" opacity="0.8"/>
      <ellipse cx="22" cy="22" rx="7" ry="10" fill="#a67c53" opacity="0.8"/>
      <ellipse cx="38" cy="22" rx="7" ry="10" fill="#a67c53" opacity="0.8"/>
      <path d="M30,48 Q20,42 22,46" stroke="#7a6949" stroke-width="1.5" fill="none"/>
      <path d="M30,60 Q40,54 38,58" stroke="#7a6949" stroke-width="1.5" fill="none"/>
    </svg>`,
  },
  {
    id: 'flower-tulip',
    name: 'Antique Dutch Tulip',
    category: 'flowers',
    width: 55,
    height: 85,
    tags: ['tulip', 'spring', 'classic'],
    svg: `<svg viewBox="0 0 55 85" xmlns="http://www.w3.org/2000/svg">
      <path d="M28,40 L28,82" stroke="#48613d" stroke-width="2.5"/>
      <path d="M28,60 Q14,50 18,72 Z" fill="#56734a"/>
      <path d="M28,20 C18,20 14,35 28,42 C42,35 38,20 28,20 Z" fill="#9c3636"/>
      <path d="M28,20 C24,24 24,35 28,42 C32,35 32,24 28,20 Z" fill="#b84d4d"/>
    </svg>`,
  },
  {
    id: 'flower-pressed-pansy',
    name: 'Velvet Pressed Pansy',
    category: 'flowers',
    width: 65,
    height: 65,
    tags: ['pansy', 'purple', 'velvet'],
    svg: `<svg viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="22" r="12" fill="#4d3266"/>
      <circle cx="40" cy="22" r="12" fill="#4d3266"/>
      <circle cx="18" cy="35" r="10" fill="#69438c"/>
      <circle cx="47" cy="35" r="10" fill="#69438c"/>
      <ellipse cx="32.5" cy="44" rx="14" ry="11" fill="#e0b838"/>
      <circle cx="32.5" cy="34" r="5" fill="#1c1326"/>
    </svg>`,
  },
  {
    id: 'flower-small-blossoms',
    name: 'Forget-Me-Nots',
    category: 'flowers',
    width: 60,
    height: 60,
    tags: ['blue', 'tiny', 'memory', 'cute'],
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(15,15)">
        <circle cx="0" cy="-6" r="3.5" fill="#5680b8"/>
        <circle cx="6" cy="-2" r="3.5" fill="#5680b8"/>
        <circle cx="4" cy="5" r="3.5" fill="#5680b8"/>
        <circle cx="-4" cy="5" r="3.5" fill="#5680b8"/>
        <circle cx="-6" cy="-2" r="3.5" fill="#5680b8"/>
        <circle cx="0" cy="0" r="2.5" fill="#e6b833"/>
      </g>
      <g transform="translate(42,35)">
        <circle cx="0" cy="-6" r="3.5" fill="#5680b8"/>
        <circle cx="6" cy="-2" r="3.5" fill="#5680b8"/>
        <circle cx="4" cy="5" r="3.5" fill="#5680b8"/>
        <circle cx="-4" cy="5" r="3.5" fill="#5680b8"/>
        <circle cx="-6" cy="-2" r="3.5" fill="#5680b8"/>
        <circle cx="0" cy="0" r="2.5" fill="#e6b833"/>
      </g>
    </svg>`,
  },
  {
    id: 'flower-botanical-wreath',
    name: 'Wildflower Mini Wreath',
    category: 'flowers',
    width: 75,
    height: 75,
    tags: ['wreath', 'circle', 'garland'],
    svg: `<svg viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg">
      <circle cx="37.5" cy="37.5" r="26" fill="none" stroke="#5a704f" stroke-width="2" stroke-dasharray="8,4"/>
      <circle cx="37.5" cy="11.5" r="4.5" fill="#ba4e4e"/>
      <circle cx="63.5" cy="37.5" r="4" fill="#d99f36"/>
      <circle cx="37.5" cy="63.5" r="4.5" fill="#ba4e4e"/>
      <circle cx="11.5" cy="37.5" r="4" fill="#5a7ea8"/>
    </svg>`,
  },

  // ==========================================
  // 3. LEAVES (9 stickers)
  // ==========================================
  {
    id: 'leaf-oak',
    name: 'Autumn Oak Leaf',
    category: 'leaves',
    width: 60,
    height: 80,
    tags: ['oak', 'autumn', 'brown', 'fall'],
    svg: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M30,10 C34,14 42,12 40,20 C46,24 48,32 42,36 C48,42 46,50 40,54 C44,60 38,68 30,70 L30,78 L28,78 L28,70 C20,68 14,60 18,54 C12,50 10,42 16,36 C10,32 12,24 18,20 C16,12 24,14 30,10 Z" fill="#b56728" stroke="#753d10" stroke-width="1.5"/>
      <line x1="29" y1="12" x2="29" y2="70" stroke="#753d10" stroke-width="1.2"/>
    </svg>`,
  },
  {
    id: 'leaf-fern',
    name: 'Botanical Fern Frond',
    category: 'leaves',
    width: 65,
    height: 90,
    tags: ['fern', 'green', 'forest'],
    svg: `<svg viewBox="0 0 65 90" xmlns="http://www.w3.org/2000/svg">
      <path d="M32,10 Q32,50 25,85" stroke="#3d5734" stroke-width="2" fill="none"/>
      <g fill="#4d6e42">
        <ellipse cx="28" cy="20" rx="6" ry="2.5" transform="rotate(-20 28 20)"/>
        <ellipse cx="36" cy="22" rx="6" ry="2.5" transform="rotate(20 36 22)"/>
        <ellipse cx="26" cy="32" rx="8" ry="3" transform="rotate(-20 26 32)"/>
        <ellipse cx="37" cy="35" rx="8" ry="3" transform="rotate(20 37 35)"/>
        <ellipse cx="24" cy="46" rx="10" ry="3.5" transform="rotate(-20 24 46)"/>
        <ellipse cx="37" cy="50" rx="10" ry="3.5" transform="rotate(20 37 50)"/>
        <ellipse cx="22" cy="62" rx="11" ry="4" transform="rotate(-20 22 62)"/>
        <ellipse cx="36" cy="66" rx="11" ry="4" transform="rotate(20 36 66)"/>
      </g>
    </svg>`,
  },
  {
    id: 'leaf-olive-branch',
    name: 'Olive Peace Branch',
    category: 'leaves',
    width: 80,
    height: 55,
    tags: ['olive', 'peace', 'branch', 'greece'],
    svg: `<svg viewBox="0 0 80 55" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,45 Q40,30 75,15" stroke="#485c3b" stroke-width="2" fill="none"/>
      <g fill="#617a50">
        <ellipse cx="25" cy="34" rx="8" ry="3" transform="rotate(-30 25 34)"/>
        <ellipse cx="35" cy="26" rx="8" ry="3" transform="rotate(20 35 26)"/>
        <ellipse cx="48" cy="22" rx="8" ry="3" transform="rotate(-25 48 22)"/>
        <ellipse cx="60" cy="16" rx="8" ry="3" transform="rotate(15 60 16)"/>
        <ellipse cx="73" cy="12" rx="6" ry="2.5" transform="rotate(-10 73 12)"/>
      </g>
      <circle cx="38" cy="32" r="3.5" fill="#2d3326"/>
      <circle cx="58" cy="24" r="3.5" fill="#2d3326"/>
    </svg>`,
  },
  {
    id: 'leaf-eucalyptus',
    name: 'Eucalyptus Stem',
    category: 'leaves',
    width: 60,
    height: 90,
    tags: ['eucalyptus', 'blue-green', 'spa'],
    svg: `<svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="10" x2="30" y2="85" stroke="#5a6e60" stroke-width="2"/>
      <g fill="#7e9686" stroke="#4d6152" stroke-width="1">
        <circle cx="23" cy="20" r="7"/>
        <circle cx="37" cy="23" r="7"/>
        <circle cx="21" cy="38" r="9"/>
        <circle cx="39" cy="42" r="9"/>
        <circle cx="19" cy="58" r="10"/>
        <circle cx="41" cy="63" r="10"/>
      </g>
    </svg>`,
  },
  {
    id: 'leaf-clover',
    name: 'Four Leaf Lucky Clover',
    category: 'leaves',
    width: 60,
    height: 70,
    tags: ['clover', 'luck', 'irish', 'green'],
    svg: `<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
      <path d="M30,30 Q28,55 35,68" stroke="#365c27" stroke-width="2.5" fill="none"/>
      <g fill="#4c8238" stroke="#2c521f" stroke-width="1">
        <path d="M30,30 C20,18 25,6 30,12 C35,6 40,18 30,30 Z"/>
        <path d="M30,30 C42,20 54,25 48,30 C54,35 42,40 30,30 Z"/>
        <path d="M30,30 C40,42 35,54 30,48 C25,54 20,42 30,30 Z"/>
        <path d="M30,30 C18,40 6,35 12,30 C6,25 18,20 30,30 Z"/>
      </g>
    </svg>`,
  },
  {
    id: 'leaf-ivy-vine',
    name: 'Cascading Ivy Leaf',
    category: 'leaves',
    width: 65,
    height: 65,
    tags: ['ivy', 'vine', 'english'],
    svg: `<svg viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg">
      <path d="M32.5,8 L44,22 L55,30 L45,45 L32.5,38 L20,45 L10,30 L21,22 Z" fill="#3c572c" stroke="#25381a" stroke-width="1.5"/>
      <line x1="32.5" y1="8" x2="32.5" y2="58" stroke="#25381a" stroke-width="1.8"/>
      <line x1="32.5" y1="26" x2="48" y2="28" stroke="#25381a" stroke-width="1"/>
      <line x1="32.5" y1="26" x2="17" y2="28" stroke="#25381a" stroke-width="1"/>
    </svg>`,
  },
  {
    id: 'leaf-maple',
    name: 'Golden Maple Leaf',
    category: 'leaves',
    width: 75,
    height: 75,
    tags: ['maple', 'fall', 'autumn', 'canada'],
    svg: `<svg viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg">
      <path d="M37.5,10 L43,24 L52,18 L50,30 L66,33 L55,42 L60,54 L46,49 L42,65 L37.5,52 L33,65 L29,49 L15,54 L20,42 L9,33 L25,30 L23,18 L32,24 Z" fill="#c45c27" stroke="#7a320f" stroke-width="1.5"/>
      <line x1="37.5" y1="25" x2="37.5" y2="72" stroke="#7a320f" stroke-width="2.5"/>
    </svg>`,
  },
  {
    id: 'leaf-pressed-gingko',
    name: 'Ginkgo Biloba Fan Leaf',
    category: 'leaves',
    width: 70,
    height: 70,
    tags: ['ginkgo', 'japan', 'yellow', 'fan'],
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <path d="M35,58 L35,68" stroke="#8a7322" stroke-width="2"/>
      <path d="M35,58 C15,48 8,25 24,14 C30,10 34,18 35,22 C36,18 40,10 46,14 C62,25 55,48 35,58 Z" fill="#d9b634" stroke="#8a7322" stroke-width="1.5"/>
    </svg>`,
  },
  {
    id: 'leaf-monstera',
    name: 'Monstera Botanical Cutout',
    category: 'leaves',
    width: 65,
    height: 75,
    tags: ['monstera', 'tropical', 'chic'],
    svg: `<svg viewBox="0 0 65 75" xmlns="http://www.w3.org/2000/svg">
      <path d="M32.5,8 C48,15 58,35 52,60 L32.5,70 L13,60 C7,35 17,15 32.5,8 Z" fill="#385437" stroke="#223621" stroke-width="1.5"/>
      <ellipse cx="40" cy="30" rx="3" ry="8" fill="#f4ebd9" transform="rotate(25 40 30)"/>
      <ellipse cx="25" cy="30" rx="3" ry="8" fill="#f4ebd9" transform="rotate(-25 25 30)"/>
      <ellipse cx="42" cy="46" rx="3" ry="8" fill="#f4ebd9" transform="rotate(35 42 46)"/>
      <ellipse cx="23" cy="46" rx="3" ry="8" fill="#f4ebd9" transform="rotate(-35 23 46)"/>
    </svg>`,
  },

  // ==========================================
  // 4. VINTAGE OBJECTS (12 stickers)
  // ==========================================
  {
    id: 'vintage-camera',
    name: 'Vintage 1930s Camera',
    category: 'vintage',
    width: 85,
    height: 65,
    tags: ['camera', 'photo', 'brown', 'lens'],
    svg: `<svg viewBox="0 0 85 65" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="16" width="70" height="44" rx="4" fill="#3b2b1d" stroke="#694d33" stroke-width="2"/>
      <rect x="25" y="10" width="18" height="6" rx="1.5" fill="#694d33"/>
      <circle cx="65" cy="23" r="3.5" fill="#c7ab83"/>
      <circle cx="43" cy="38" r="16" fill="#1c140d" stroke="#d6b885" stroke-width="2"/>
      <circle cx="43" cy="38" r="10" fill="#0d0a07" stroke="#87673c" stroke-width="1.5"/>
      <circle cx="45" cy="36" r="3" fill="#ffffff" opacity="0.5"/>
    </svg>`,
  },
  {
    id: 'vintage-fountain-pen',
    name: 'Gold Nib Fountain Pen',
    category: 'vintage',
    width: 80,
    height: 40,
    tags: ['pen', 'ink', 'writing', 'gold'],
    svg: `<svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,20 L25,14 L70,14 L72,26 L25,26 Z" fill="#241910" stroke="#755233" stroke-width="1.5"/>
      <polygon points="10,20 2,17 0,20 2,23" fill="#d4af37" stroke="#876813" stroke-width="1"/>
      <line x1="2" y1="20" x2="8" y2="20" stroke="#111" stroke-width="1"/>
      <circle cx="6" cy="20" r="1" fill="#111"/>
      <rect x="25" y="13" width="4" height="14" fill="#d4af37"/>
    </svg>`,
  },
  {
    id: 'vintage-ink-bottle',
    name: 'Antique Sepia Ink Bottle',
    category: 'vintage',
    width: 60,
    height: 70,
    tags: ['ink', 'bottle', 'quill', 'writing'],
    svg: `<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="24" width="30" height="40" rx="3" fill="#3b2b1d" stroke="#6e4f35" stroke-width="2"/>
      <rect x="22" y="14" width="16" height="10" fill="#523924" stroke="#6e4f35" stroke-width="1.5"/>
      <rect x="20" y="8" width="20" height="7" rx="2" fill="#c49b6b" stroke="#7a5530" stroke-width="1"/>
      <rect x="18" y="34" width="24" height="20" fill="#eddcc4" stroke="#ab8b65" stroke-width="1"/>
      <text x="30" y="46" font-family="serif" font-size="6" fill="#3d2613" text-anchor="middle" font-weight="bold">SEPIA</text>
      <text x="30" y="52" font-family="serif" font-size="5" fill="#3d2613" text-anchor="middle">INK</text>
    </svg>`,
  },
  {
    id: 'vintage-pocket-watch',
    name: 'Engraved Pocket Watch',
    category: 'vintage',
    width: 65,
    height: 80,
    tags: ['watch', 'time', 'gold', 'antique'],
    svg: `<svg viewBox="0 0 65 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32.5" cy="14" r="7" fill="none" stroke="#b08b35" stroke-width="2.5"/>
      <rect x="30" y="18" width="5" height="6" fill="#b08b35"/>
      <circle cx="32.5" cy="48" r="26" fill="#d4af37" stroke="#7a5a13" stroke-width="2"/>
      <circle cx="32.5" cy="48" r="22" fill="#faf4e8" stroke="#a38237" stroke-width="1"/>
      <line x1="32.5" y1="48" x2="32.5" y2="34" stroke="#24170a" stroke-width="2" stroke-linecap="round"/>
      <line x1="32.5" y1="48" x2="42" y2="48" stroke="#24170a" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="32.5" cy="48" r="2" fill="#24170a"/>
      <text x="32.5" y="32" font-family="serif" font-size="6" fill="#422912" text-anchor="middle">XII</text>
      <text x="50" y="50" font-family="serif" font-size="6" fill="#422912" text-anchor="middle">III</text>
      <text x="32.5" y="66" font-family="serif" font-size="6" fill="#422912" text-anchor="middle">VI</text>
      <text x="16" y="50" font-family="serif" font-size="6" fill="#422912" text-anchor="middle">IX</text>
    </svg>`,
  },
  {
    id: 'vintage-typewriter',
    name: 'Classic Mechanical Typewriter',
    category: 'vintage',
    width: 80,
    height: 65,
    tags: ['typewriter', 'novel', 'author', 'keys'],
    svg: `<svg viewBox="0 0 80 65" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="24" width="60" height="34" rx="3" fill="#2b2621" stroke="#5e5044" stroke-width="2"/>
      <rect x="18" y="14" width="44" height="12" rx="1" fill="#473f37"/>
      <rect x="22" y="8" width="36" height="10" rx="1" fill="#faf5eb" stroke="#ad9e8c" stroke-width="1"/>
      <g fill="#d9cdbc">
        <circle cx="16" cy="34" r="2.5"/><circle cx="24" cy="34" r="2.5"/><circle cx="32" cy="34" r="2.5"/><circle cx="40" cy="34" r="2.5"/><circle cx="48" cy="34" r="2.5"/><circle cx="56" cy="34" r="2.5"/><circle cx="64" cy="34" r="2.5"/>
        <circle cx="20" cy="42" r="2.5"/><circle cx="28" cy="42" r="2.5"/><circle cx="36" cy="42" r="2.5"/><circle cx="44" cy="42" r="2.5"/><circle cx="52" cy="42" r="2.5"/><circle cx="60" cy="42" r="2.5"/>
        <circle cx="24" cy="50" r="2.5"/><circle cx="32" cy="50" r="2.5"/><circle cx="40" cy="50" r="2.5"/><circle cx="48" cy="50" r="2.5"/><circle cx="56" cy="50" r="2.5"/>
      </g>
    </svg>`,
  },
  {
    id: 'vintage-teacup',
    name: 'Porcelain Vintage Teacup',
    category: 'vintage',
    width: 75,
    height: 55,
    tags: ['tea', 'cup', 'porcelain', 'rose'],
    svg: `<svg viewBox="0 0 75 55" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="37" cy="46" rx="30" ry="6" fill="#eddcc7" stroke="#a6845c" stroke-width="1.5"/>
      <path d="M18,18 C18,38 25,44 37,44 C49,44 56,38 56,18 Z" fill="#fcf8f2" stroke="#a6845c" stroke-width="2"/>
      <ellipse cx="37" cy="18" rx="19" ry="5" fill="#804a27" stroke="#a6845c" stroke-width="1.5"/>
      <path d="M55,22 C64,22 66,34 54,36" fill="none" stroke="#a6845c" stroke-width="2.5"/>
      <circle cx="37" cy="30" r="3" fill="#c46262"/>
    </svg>`,
  },
  {
    id: 'vintage-candle',
    name: 'Burning Tallow Candle',
    category: 'vintage',
    width: 45,
    height: 80,
    tags: ['candle', 'flame', 'night', 'light'],
    svg: `<svg viewBox="0 0 45 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="22.5" cy="72" rx="18" ry="5" fill="#b08b35" stroke="#694e13" stroke-width="1.5"/>
      <rect x="15" y="32" width="15" height="40" fill="#f4ebd9" stroke="#b89e72" stroke-width="1.5"/>
      <ellipse cx="22.5" cy="32" rx="7.5" ry="2.5" fill="#e0cb9f"/>
      <line x1="22.5" y1="32" x2="22.5" y2="22" stroke="#222" stroke-width="1.5"/>
      <path d="M22.5,8 C27,14 27,20 22.5,23 C18,20 18,14 22.5,8 Z" fill="#e89e27"/>
      <circle cx="22.5" cy="18" r="2.5" fill="#ffeb99"/>
    </svg>`,
  },
  {
    id: 'vintage-key',
    name: 'Antique Skeleton Key',
    category: 'vintage',
    width: 40,
    height: 85,
    tags: ['key', 'secret', 'brass', 'antique'],
    svg: `<svg viewBox="0 0 40 85" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="18" r="12" fill="none" stroke="#96702e" stroke-width="3"/>
      <circle cx="20" cy="18" r="6" fill="none" stroke="#96702e" stroke-width="2"/>
      <line x1="20" y1="30" x2="20" y2="80" stroke="#96702e" stroke-width="3.5"/>
      <rect x="20" y="65" width="10" height="4" fill="#96702e"/>
      <rect x="20" y="73" width="7" height="4" fill="#96702e"/>
    </svg>`,
  },
  {
    id: 'vintage-gramophone',
    name: 'Antique Brass Gramophone',
    category: 'vintage',
    width: 80,
    height: 80,
    tags: ['music', 'gramophone', 'brass', 'retro'],
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="52" width="50" height="22" rx="2" fill="#472e18" stroke="#78502d" stroke-width="2"/>
      <ellipse cx="40" cy="52" rx="20" ry="3" fill="#1c1611"/>
      <path d="M42,50 C40,40 50,32 58,15 L30,22 C40,32 36,40 38,50 Z" fill="#c49e35" stroke="#7a5e14" stroke-width="1.5"/>
      <ellipse cx="28" cy="22" rx="4" ry="12" fill="#9e7b1e" transform="rotate(20 28 22)"/>
    </svg>`,
  },
  {
    id: 'vintage-coffee-cup',
    name: 'Steaming Coffee Mug',
    category: 'vintage',
    width: 65,
    height: 60,
    tags: ['coffee', 'cafe', 'morning'],
    svg: `<svg viewBox="0 0 65 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M15,22 L18,50 Q19,54 26,54 L42,54 Q49,54 50,50 L53,22 Z" fill="#f5ede1" stroke="#875c34" stroke-width="2"/>
      <path d="M51,26 Q62,26 62,36 Q62,46 49,46" fill="none" stroke="#875c34" stroke-width="2.5"/>
      <ellipse cx="34" cy="22" rx="19" ry="4" fill="#522f18" stroke="#875c34" stroke-width="1"/>
      <path d="M30,14 Q34,10 32,5" stroke="#a3784a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M38,15 Q42,11 40,6" stroke="#a3784a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'vintage-magnifying-glass',
    name: 'Brass Magnifying Glass',
    category: 'vintage',
    width: 60,
    height: 80,
    tags: ['detective', 'glass', 'investigate'],
    svg: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="26" r="18" fill="#e8f3f7" opacity="0.75" stroke="#b08b35" stroke-width="3"/>
      <path d="M39,39 L56,70 L52,74 L35,43 Z" fill="#4d3216" stroke="#b08b35" stroke-width="1.5"/>
      <circle cx="22" cy="20" r="5" fill="#fff" opacity="0.6"/>
    </svg>`,
  },
  {
    id: 'vintage-bicycle',
    name: 'Penny Farthing Bicycle',
    category: 'vintage',
    width: 85,
    height: 75,
    tags: ['bicycle', 'antique', 'wheels'],
    svg: `<svg viewBox="0 0 85 75" xmlns="http://www.w3.org/2000/svg">
      <circle cx="34" cy="38" r="26" fill="none" stroke="#3b2b1d" stroke-width="2"/>
      <circle cx="34" cy="38" r="3" fill="#3b2b1d"/>
      <circle cx="70" cy="55" r="9" fill="none" stroke="#3b2b1d" stroke-width="1.5"/>
      <line x1="34" y1="38" x2="34" y2="12" stroke="#3b2b1d" stroke-width="2"/>
      <line x1="30" y1="12" x2="38" y2="12" stroke="#875c34" stroke-width="2.5"/>
      <path d="M34,22 Q52,38 70,55" stroke="#3b2b1d" stroke-width="2" fill="none"/>
    </svg>`,
  },

  // ==========================================
  // 5. SCRAPBOOK (10 stickers)
  // ==========================================
  {
    id: 'scrapbook-washi-tape-floral',
    name: 'Floral Washi Tape',
    category: 'scrapbook',
    width: 120,
    height: 34,
    tags: ['washi', 'tape', 'paper', 'masking'],
    svg: `<svg viewBox="0 0 120 34" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 L120,0 L115,17 L120,34 L0,34 L5,17 Z" fill="#e8d8c3" fill-opacity="0.88" stroke="#ba9e7b" stroke-width="1"/>
      <circle cx="25" cy="17" r="4.5" fill="#c46262" opacity="0.7"/>
      <circle cx="60" cy="17" r="4.5" fill="#c46262" opacity="0.7"/>
      <circle cx="95" cy="17" r="4.5" fill="#c46262" opacity="0.7"/>
    </svg>`,
  },
  {
    id: 'scrapbook-washi-tape-stripes',
    name: 'Vintage Stripe Tape',
    category: 'scrapbook',
    width: 115,
    height: 30,
    tags: ['tape', 'stripes', 'kraft'],
    svg: `<svg viewBox="0 0 115 30" xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,2 115,0 113,30 2,28" fill="#d4ad7c" fill-opacity="0.85"/>
      <line x1="15" y1="0" x2="25" y2="30" stroke="#8b5a2b" stroke-width="2" opacity="0.4"/>
      <line x1="40" y1="0" x2="50" y2="30" stroke="#8b5a2b" stroke-width="2" opacity="0.4"/>
      <line x1="65" y1="0" x2="75" y2="30" stroke="#8b5a2b" stroke-width="2" opacity="0.4"/>
      <line x1="90" y1="0" x2="100" y2="30" stroke="#8b5a2b" stroke-width="2" opacity="0.4"/>
    </svg>`,
  },
  {
    id: 'scrapbook-paper-clip',
    name: 'Brass Paper Clip',
    category: 'scrapbook',
    width: 35,
    height: 80,
    tags: ['clip', 'brass', 'metal', 'office'],
    svg: `<svg viewBox="0 0 35 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M12,70 L12,20 C12,10 24,10 24,20 L24,60 C24,68 16,68 16,60 L16,28 C16,23 20,23 20,28 L20,54" fill="none" stroke="#c49a37" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'scrapbook-wax-seal',
    name: 'Royal Wax Seal',
    category: 'scrapbook',
    width: 65,
    height: 65,
    tags: ['wax', 'seal', 'monogram', 'letter'],
    svg: `<svg viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg">
      <path d="M32.5,4 C48,2 62,14 60,30 C64,48 48,62 32.5,60 C14,64 2,48 4,32.5 C2,16 16,4 32.5,4 Z" fill="#8f2b2b" stroke="#5e1919" stroke-width="2"/>
      <circle cx="32.5" cy="32.5" r="18" fill="none" stroke="#b84d4d" stroke-width="1.5"/>
      <text x="32.5" y="38" font-family="'Alex Brush', cursive" font-size="20" fill="#f0c27a" text-anchor="middle">M</text>
    </svg>`,
  },
  {
    id: 'scrapbook-torn-paper-note',
    name: 'Torn Memo Scrap',
    category: 'scrapbook',
    width: 90,
    height: 70,
    tags: ['memo', 'paper', 'note'],
    svg: `<svg viewBox="0 0 90 70" xmlns="http://www.w3.org/2000/svg">
      <path d="M5,10 L85,8 L87,62 L80,60 L75,64 L65,60 L58,65 L48,61 L38,64 L28,60 L18,63 L8,59 Z" fill="#fcf6ea" stroke="#d1b894" stroke-width="1.2"/>
      <line x1="18" y1="24" x2="74" y2="24" stroke="#d1b894" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="18" y1="36" x2="74" y2="36" stroke="#d1b894" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="18" y1="48" x2="60" y2="48" stroke="#d1b894" stroke-width="1" stroke-dasharray="2,2"/>
    </svg>`,
  },
  {
    id: 'scrapbook-tied-ribbon',
    name: 'Satin Bow Ribbon',
    category: 'scrapbook',
    width: 80,
    height: 60,
    tags: ['ribbon', 'bow', 'gift'],
    svg: `<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="26" cy="24" rx="14" ry="9" fill="#9e3a38" transform="rotate(-20 26 24)"/>
      <ellipse cx="54" cy="24" rx="14" ry="9" fill="#9e3a38" transform="rotate(20 54 24)"/>
      <circle cx="40" cy="26" r="6" fill="#752422"/>
      <path d="M37,28 Q24,46 16,56" stroke="#752422" stroke-width="4" fill="none"/>
      <path d="M43,28 Q56,46 64,56" stroke="#752422" stroke-width="4" fill="none"/>
    </svg>`,
  },
  {
    id: 'scrapbook-paper-label',
    name: 'Antique Kraft Label',
    category: 'scrapbook',
    width: 95,
    height: 48,
    tags: ['label', 'tag', 'frame'],
    svg: `<svg viewBox="0 0 95 48" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="87" height="40" rx="3" fill="#ecdcc5" stroke="#8c6439" stroke-width="1.8"/>
      <rect x="8" y="8" width="79" height="32" rx="1.5" fill="none" stroke="#8c6439" stroke-width="1" stroke-dasharray="3,2"/>
      <circle cx="14" cy="24" r="2.5" fill="#8c6439"/>
      <circle cx="81" cy="24" r="2.5" fill="#8c6439"/>
    </svg>`,
  },
  {
    id: 'scrapbook-push-pin',
    name: 'Vintage Brass Pushpin',
    category: 'scrapbook',
    width: 40,
    height: 55,
    tags: ['pin', 'tack', 'bulletin'],
    svg: `<svg viewBox="0 0 40 55" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="14" rx="12" ry="6" fill="#d4af37" stroke="#7a5f13" stroke-width="1.5"/>
      <rect x="16" y="14" width="8" height="12" fill="#a68426"/>
      <polygon points="17,26 23,26 20,48" fill="#4a4235"/>
    </svg>`,
  },
  {
    id: 'scrapbook-doily-lace',
    name: 'Lace Doily Corner',
    category: 'scrapbook',
    width: 80,
    height: 80,
    tags: ['doily', 'lace', 'delicate'],
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 L80,0 C60,20 60,60 0,80 Z" fill="#faf4e8" stroke="#cca87a" stroke-width="1"/>
      <circle cx="30" cy="20" r="3" fill="none" stroke="#cca87a"/>
      <circle cx="50" cy="15" r="3" fill="none" stroke="#cca87a"/>
      <circle cx="20" cy="40" r="3" fill="none" stroke="#cca87a"/>
      <path d="M0,70 Q40,40 70,0" stroke="#cca87a" stroke-width="1" stroke-dasharray="2,2" fill="none"/>
    </svg>`,
  },
  {
    id: 'scrapbook-corner-mounts',
    name: 'Black Photo Corners Pair',
    category: 'scrapbook',
    width: 70,
    height: 40,
    tags: ['corner', 'mount', 'photo', 'album'],
    svg: `<svg viewBox="0 0 70 40" xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,0 28,0 0,28" fill="#241a12" stroke="#523924" stroke-width="1.5"/>
      <polygon points="70,0 42,0 70,28" fill="#241a12" stroke="#523924" stroke-width="1.5"/>
    </svg>`,
  },

  // ==========================================
  // 6. TRAVEL (10 stickers)
  // ==========================================
  {
    id: 'travel-paris-stamp',
    name: 'Paris Air Mail Stamp',
    category: 'travel',
    width: 75,
    height: 95,
    tags: ['paris', 'france', 'eiffel', 'postage'],
    svg: `<svg viewBox="0 0 75 95" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="67" height="87" fill="#f5eee4" stroke="#873531" stroke-width="2" stroke-dasharray="4,2"/>
      <rect x="9" y="9" width="57" height="77" fill="#edd5d3" stroke="#873531" stroke-width="1"/>
      <path d="M37.5,22 L45,62 L30,62 Z" fill="#873531"/>
      <line x1="32" y1="48" x2="43" y2="48" stroke="#edd5d3" stroke-width="2"/>
      <text x="37.5" y="76" font-family="serif" font-size="7" fill="#873531" text-anchor="middle" font-weight="bold">PARIS 1932</text>
    </svg>`,
  },
  {
    id: 'travel-compass',
    name: 'Vintage Compass Rose',
    category: 'travel',
    width: 75,
    height: 75,
    tags: ['compass', 'navigation', 'direction'],
    svg: `<svg viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg">
      <circle cx="37.5" cy="37.5" r="30" fill="none" stroke="#78532f" stroke-width="2"/>
      <circle cx="37.5" cy="37.5" r="26" fill="none" stroke="#78532f" stroke-width="1" stroke-dasharray="2,2"/>
      <polygon points="37.5,12 42,37.5 37.5,33 33,37.5" fill="#a13535"/>
      <polygon points="37.5,63 42,37.5 37.5,42 33,37.5" fill="#4d3824"/>
      <polygon points="63,37.5 37.5,42 42,37.5 37.5,33" fill="#4d3824"/>
      <polygon points="12,37.5 37.5,42 33,37.5 37.5,33" fill="#4d3824"/>
      <text x="37.5" y="22" font-family="serif" font-size="8" fill="#a13535" text-anchor="middle" font-weight="bold">N</text>
    </svg>`,
  },
  {
    id: 'travel-suitcase',
    name: 'Leather Travel Suitcase',
    category: 'travel',
    width: 80,
    height: 60,
    tags: ['luggage', 'journey', 'voyage'],
    svg: `<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="16" width="64" height="40" rx="4" fill="#694123" stroke="#3b210e" stroke-width="2"/>
      <line x1="8" y1="36" x2="72" y2="36" stroke="#3b210e" stroke-width="1.5"/>
      <path d="M32,16 L32,10 Q32,8 35,8 L45,8 Q48,8 48,10 L48,16" fill="none" stroke="#3b210e" stroke-width="3"/>
      <rect x="22" y="16" width="6" height="40" fill="#452712"/>
      <rect x="52" y="16" width="6" height="40" fill="#452712"/>
      <circle cx="25" cy="36" r="2" fill="#d4af37"/>
      <circle cx="55" cy="36" r="2" fill="#d4af37"/>
    </svg>`,
  },
  {
    id: 'travel-train-ticket',
    name: 'Orient Express Train Ticket',
    category: 'travel',
    width: 95,
    height: 45,
    tags: ['train', 'ticket', 'railway'],
    svg: `<svg viewBox="0 0 95 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="89" height="39" rx="3" fill="#edd6b8" stroke="#69411d" stroke-width="1.8"/>
      <line x1="28" y1="3" x2="28" y2="42" stroke="#69411d" stroke-width="1.5" stroke-dasharray="2,2"/>
      <text x="15" y="25" font-family="serif" font-size="8" fill="#69411d" text-anchor="middle" font-weight="bold">No. 402</text>
      <text x="60" y="20" font-family="serif" font-size="9" fill="#523112" text-anchor="middle" font-weight="bold">FIRST CLASS</text>
      <text x="60" y="32" font-family="serif" font-size="7" fill="#69411d" text-anchor="middle">PARIS → VENICE</text>
    </svg>`,
  },
  {
    id: 'travel-location-pin',
    name: 'Vintage Map Marker',
    category: 'travel',
    width: 45,
    height: 65,
    tags: ['map', 'pin', 'marker', 'place'],
    svg: `<svg viewBox="0 0 45 65" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.5,4 C11,4 4,11 4,22 C4,36 22.5,60 22.5,60 C22.5,60 41,36 41,22 C41,11 34,4 22.5,4 Z" fill="#a83636" stroke="#661c1c" stroke-width="2"/>
      <circle cx="22.5" cy="22" r="7" fill="#fcf6ec"/>
    </svg>`,
  },
  {
    id: 'travel-globe',
    name: 'Antique Desktop Globe',
    category: 'travel',
    width: 65,
    height: 80,
    tags: ['globe', 'world', 'earth'],
    svg: `<svg viewBox="0 0 65 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M32.5,72 L32.5,62 M20,72 L45,72" stroke="#7a552b" stroke-width="3" stroke-linecap="round"/>
      <path d="M32.5,12 C48,12 55,26 55,38 C55,50 48,62 32.5,62" fill="none" stroke="#7a552b" stroke-width="3"/>
      <circle cx="32.5" cy="37" r="20" fill="#ded4be" stroke="#523d24" stroke-width="1.5"/>
      <path d="M24,28 Q30,22 36,25 Q42,32 36,44 Q28,40 24,28 Z" fill="#758a67"/>
      <path d="M38,36 Q45,34 47,42" fill="#758a67"/>
    </svg>`,
  },
  {
    id: 'travel-airmail-envelope',
    name: 'Par Avion Envelope',
    category: 'travel',
    width: 85,
    height: 55,
    tags: ['letter', 'airmail', 'plane', 'post'],
    svg: `<svg viewBox="0 0 85 55" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="77" height="47" rx="2" fill="#faf5ec" stroke="#b08c63" stroke-width="1.5"/>
      <polygon points="4,4 42.5,30 81,4" fill="none" stroke="#b08c63" stroke-width="1.5"/>
      <rect x="58" y="10" width="16" height="18" fill="#e0cbaf" stroke="#7a552d" stroke-width="1"/>
      <rect x="12" y="34" width="30" height="8" rx="1" fill="#305080"/>
      <text x="27" y="40" font-family="sans-serif" font-size="5" fill="#fff" text-anchor="middle" font-weight="bold">PAR AVION</text>
    </svg>`,
  },
  {
    id: 'travel-luggage-tag',
    name: 'Boarding Luggage Tag',
    category: 'travel',
    width: 55,
    height: 85,
    tags: ['tag', 'flight', 'vintage'],
    svg: `<svg viewBox="0 0 55 85" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12,4 43,4 51,14 51,81 4,81 4,14" fill="#d9b682" stroke="#69461d" stroke-width="2"/>
      <circle cx="27.5" cy="14" r="4" fill="#faf4e8" stroke="#69461d" stroke-width="1.5"/>
      <line x1="12" y1="35" x2="43" y2="35" stroke="#69461d" stroke-width="1.5"/>
      <line x1="12" y1="50" x2="43" y2="50" stroke="#69461d" stroke-width="1.5"/>
      <line x1="12" y1="65" x2="43" y2="65" stroke="#69461d" stroke-width="1.5"/>
      <text x="27.5" y="28" font-family="serif" font-size="7" fill="#523211" text-anchor="middle" font-weight="bold">VOYAGE</text>
    </svg>`,
  },
  {
    id: 'travel-passport-stamp',
    name: 'Customs Visa Stamp',
    category: 'travel',
    width: 75,
    height: 75,
    tags: ['customs', 'entry', 'visa', 'stamp'],
    svg: `<svg viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="15" width="63" height="45" rx="4" fill="none" stroke="#2b476e" stroke-width="2.5" stroke-dasharray="5,2"/>
      <text x="37.5" y="30" font-family="sans-serif" font-size="8" fill="#2b476e" text-anchor="middle" font-weight="bold" letter-spacing="1">PASSPORT CONTROL</text>
      <text x="37.5" y="42" font-family="serif" font-size="10" fill="#2b476e" text-anchor="middle" font-weight="bold">★ ENTRY ★</text>
      <text x="37.5" y="52" font-family="monospace" font-size="8" fill="#2b476e" text-anchor="middle">14 OCT 1928</text>
    </svg>`,
  },
  {
    id: 'travel-hot-air-balloon',
    name: 'Vintage Hot Air Balloon',
    category: 'travel',
    width: 60,
    height: 85,
    tags: ['balloon', 'sky', 'adventure'],
    svg: `<svg viewBox="0 0 60 85" xmlns="http://www.w3.org/2000/svg">
      <path d="M30,8 C12,8 8,28 18,48 L25,56 L35,56 L42,48 C52,28 48,8 30,8 Z" fill="#a13d38" stroke="#541b17" stroke-width="1.5"/>
      <path d="M30,8 Q38,32 30,56" stroke="#edd8ba" stroke-width="1.5" fill="none"/>
      <path d="M22,58 L20,68 M38,58 L40,68" stroke="#47321e" stroke-width="1.5"/>
      <rect x="22" y="68" width="16" height="12" rx="1.5" fill="#87582b" stroke="#47321e" stroke-width="1.5"/>
    </svg>`,
  },

  // ==========================================
  // 7. SIMPLE / MINIMAL (10 stickers)
  // ==========================================
  {
    id: 'simple-star-gold',
    name: 'Classic Golden Star',
    category: 'simple',
    width: 50,
    height: 50,
    tags: ['star', 'gold', 'minimal'],
    svg: `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <polygon points="25,5 31,18 45,19 34,29 38,43 25,35 12,43 16,29 5,19 19,18" fill="#deb038" stroke="#876612" stroke-width="1.5"/>
    </svg>`,
  },
  {
    id: 'simple-sparkle',
    name: 'Magic Ink Sparkle',
    category: 'simple',
    width: 45,
    height: 45,
    tags: ['sparkle', 'magic', 'shine'],
    svg: `<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.5,3 Q22.5,22.5 3,22.5 Q22.5,22.5 22.5,42 Q22.5,22.5 42,22.5 Q22.5,22.5 22.5,3 Z" fill="#cca43d"/>
    </svg>`,
  },
  {
    id: 'simple-crescent-moon',
    name: 'Antique Crescent Moon',
    category: 'simple',
    width: 50,
    height: 50,
    tags: ['moon', 'night', 'sleep', 'dream'],
    svg: `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M36,8 C22,12 14,26 18,40 C10,32 12,18 24,10 C28,7 32,7 36,8 Z" fill="#d9b859" stroke="#8a6f23" stroke-width="1.5"/>
    </svg>`,
  },
  {
    id: 'simple-sun',
    name: 'Gentle Radiant Sun',
    category: 'simple',
    width: 60,
    height: 60,
    tags: ['sun', 'day', 'light', 'warm'],
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="12" fill="#e0a92d" stroke="#8c620d" stroke-width="1.5"/>
      <g stroke="#8c620d" stroke-width="2" stroke-linecap="round">
        <line x1="30" y1="8" x2="30" y2="13"/>
        <line x1="30" y1="47" x2="30" y2="52"/>
        <line x1="8" y1="30" x2="13" y2="30"/>
        <line x1="47" y1="30" x2="52" y2="30"/>
        <line x1="15" y1="15" x2="19" y2="19"/>
        <line x1="41" y1="41" x2="45" y2="45"/>
        <line x1="15" y1="45" x2="19" y2="41"/>
        <line x1="41" y1="19" x2="45" y2="15"/>
      </g>
    </svg>`,
  },
  {
    id: 'simple-cloud',
    name: 'Soft Cloud',
    category: 'simple',
    width: 65,
    height: 45,
    tags: ['cloud', 'sky', 'weather'],
    svg: `<svg viewBox="0 0 65 45" xmlns="http://www.w3.org/2000/svg">
      <path d="M16,36 L52,36 C58,36 62,31 60,25 C59,19 53,16 48,18 C45,10 35,8 28,13 C24,11 18,14 17,20 C11,21 8,28 12,33 C13,35 15,36 16,36 Z" fill="#e8ded1" stroke="#a39281" stroke-width="1.8"/>
    </svg>`,
  },
  {
    id: 'simple-arrow',
    name: 'Hand-drawn Ink Arrow',
    category: 'simple',
    width: 70,
    height: 35,
    tags: ['arrow', 'pointer', 'sketch'],
    svg: `<svg viewBox="0 0 70 35" xmlns="http://www.w3.org/2000/svg">
      <path d="M6,18 Q35,14 62,18" stroke="#422915" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M48,8 L64,18 L48,28" stroke="#422915" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    id: 'simple-dots-flourish',
    name: 'Triple Vintage Dots',
    category: 'simple',
    width: 50,
    height: 25,
    tags: ['dots', 'separator', 'divider'],
    svg: `<svg viewBox="0 0 50 25" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="12.5" r="3" fill="#694323"/>
      <circle cx="25" cy="12.5" r="4.5" fill="#a63a3a"/>
      <circle cx="35" cy="12.5" r="3" fill="#694323"/>
    </svg>`,
  },
  {
    id: 'simple-swirl',
    name: 'Calligraphy Swirl',
    category: 'simple',
    width: 65,
    height: 35,
    tags: ['swirl', 'flourish', 'pen'],
    svg: `<svg viewBox="0 0 65 35" xmlns="http://www.w3.org/2000/svg">
      <path d="M6,22 C14,8 26,6 34,16 C42,26 52,24 58,12" stroke="#523215" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="6" cy="22" r="2.5" fill="#523215"/>
      <circle cx="58" cy="12" r="2.5" fill="#523215"/>
    </svg>`,
  },
  {
    id: 'simple-asterisk',
    name: 'Ink Asterisk Note',
    category: 'simple',
    width: 40,
    height: 40,
    tags: ['asterisk', 'note', 'mark'],
    svg: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#784224" stroke-width="3" stroke-linecap="round">
        <line x1="20" y1="6" x2="20" y2="34"/>
        <line x1="7" y1="13" x2="33" y2="27"/>
        <line x1="7" y1="27" x2="33" y2="13"/>
      </g>
    </svg>`,
  },
  {
    id: 'simple-cross-stitch',
    name: 'Minimal Cross Pattern',
    category: 'simple',
    width: 45,
    height: 45,
    tags: ['cross', 'stitch', 'quilt'],
    svg: `<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="12" x2="33" y2="33" stroke="#943e3e" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="33" y1="12" x2="12" y2="33" stroke="#943e3e" stroke-width="3.5" stroke-linecap="round"/>
    </svg>`,
  },

  // ==========================================
  // 8. MEMORY & LABELS (9 stickers)
  // ==========================================
  {
    id: 'memory-polaroid-frame',
    name: 'Mini Snapshot Frame',
    category: 'memory',
    width: 65,
    height: 80,
    tags: ['photo', 'snapshot', 'instant'],
    svg: `<svg viewBox="0 0 65 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="59" height="74" rx="2" fill="#faf6ed" stroke="#b09675" stroke-width="1.5"/>
      <rect x="8" y="8" width="49" height="49" fill="#36291e"/>
      <text x="32.5" y="70" font-family="'Caveat', cursive" font-size="10" fill="#694c33" text-anchor="middle">Remember</text>
    </svg>`,
  },
  {
    id: 'memory-film-strip',
    name: '35mm Film Strip Segment',
    category: 'memory',
    width: 100,
    height: 45,
    tags: ['film', 'negative', 'camera'],
    svg: `<svg viewBox="0 0 100 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="96" height="39" rx="2" fill="#1f1a16"/>
      <rect x="8" y="6" width="6" height="6" rx="1" fill="#edd6b8"/>
      <rect x="22" y="6" width="6" height="6" rx="1" fill="#edd6b8"/>
      <rect x="36" y="6" width="6" height="6" rx="1" fill="#edd6b8"/>
      <rect x="50" y="6" width="6" height="6" rx="1" fill="#edd6b8"/>
      <rect x="64" y="6" width="6" height="6" rx="1" fill="#edd6b8"/>
      <rect x="78" y="6" width="6" height="6" rx="1" fill="#edd6b8"/>
      <rect x="12" y="16" width="22" height="15" fill="#383029"/>
      <rect x="38" y="16" width="22" height="15" fill="#383029"/>
      <rect x="64" y="16" width="22" height="15" fill="#383029"/>
    </svg>`,
  },
  {
    id: 'memory-banner-memories',
    name: 'Handwritten Memories Banner',
    category: 'memory',
    width: 110,
    height: 45,
    tags: ['banner', 'memories', 'ribbon'],
    svg: `<svg viewBox="0 0 110 45" xmlns="http://www.w3.org/2000/svg">
      <polygon points="10,8 100,8 90,23 100,38 10,38 20,23" fill="#ecd8bf" stroke="#875c34" stroke-width="1.8"/>
      <text x="55" y="27" font-family="'Playfair Display', serif" font-size="11" fill="#4d2f16" text-anchor="middle" font-weight="bold" letter-spacing="1">MEMORIES</text>
    </svg>`,
  },
  {
    id: 'memory-date-tag',
    name: 'Antique Date Stamp Tag',
    category: 'memory',
    width: 80,
    height: 40,
    tags: ['date', 'stamp', 'calendar'],
    svg: `<svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="72" height="32" rx="3" fill="#f2e4cf" stroke="#80472e" stroke-width="1.5"/>
      <text x="40" y="16" font-family="serif" font-size="7" fill="#80472e" text-anchor="middle" font-weight="bold">DATE</text>
      <line x1="15" y1="26" x2="65" y2="26" stroke="#80472e" stroke-width="1" stroke-dasharray="2,2"/>
    </svg>`,
  },
  {
    id: 'memory-cherish-label',
    name: 'Cherish Always Tag',
    category: 'memory',
    width: 90,
    height: 40,
    tags: ['cherish', 'love', 'always'],
    svg: `<svg viewBox="0 0 90 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M5,5 L85,5 L80,20 L85,35 L5,35 L10,20 Z" fill="#edd6d1" stroke="#9e4e4e" stroke-width="1.5"/>
      <text x="45" y="24" font-family="'Caveat', cursive" font-size="14" fill="#7a2a2a" text-anchor="middle">Cherish always</text>
    </svg>`,
  },
  {
    id: 'memory-special-day',
    name: 'Special Day Gold Seal',
    category: 'memory',
    width: 65,
    height: 65,
    tags: ['special', 'gold', 'award'],
    svg: `<svg viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32.5" cy="32.5" r="28" fill="#d9b450" stroke="#806219" stroke-width="2" stroke-dasharray="3,2"/>
      <circle cx="32.5" cy="32.5" r="22" fill="#faf2df" stroke="#806219" stroke-width="1"/>
      <text x="32.5" y="28" font-family="serif" font-size="7" fill="#694d0c" text-anchor="middle" font-weight="bold">SPECIAL</text>
      <text x="32.5" y="40" font-family="serif" font-size="8" fill="#694d0c" text-anchor="middle" font-weight="bold">DAY</text>
    </svg>`,
  },
  {
    id: 'memory-bookmark-ribbon',
    name: 'Silk Crimson Ribbon Bookmark',
    category: 'memory',
    width: 35,
    height: 80,
    tags: ['bookmark', 'silk', 'crimson'],
    svg: `<svg viewBox="0 0 35 80" xmlns="http://www.w3.org/2000/svg">
      <polygon points="5,0 30,0 30,80 17.5,65 5,80" fill="#912828" stroke="#541212" stroke-width="1.5"/>
      <line x1="17.5" y1="5" x2="17.5" y2="60" stroke="#b04343" stroke-width="1.5"/>
    </svg>`,
  },
  {
    id: 'memory-grateful-note',
    name: 'Grateful Heart Monogram',
    category: 'memory',
    width: 80,
    height: 45,
    tags: ['grateful', 'thanks', 'script'],
    svg: `<svg viewBox="0 0 80 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="72" height="37" rx="4" fill="#fcf8f0" stroke="#a17d52" stroke-width="1.5"/>
      <text x="40" y="27" font-family="'Alex Brush', cursive" font-size="17" fill="#543618" text-anchor="middle">Grateful</text>
    </svg>`,
  },
  {
    id: 'memory-forever-script',
    name: 'Forever & Always',
    category: 'memory',
    width: 100,
    height: 45,
    tags: ['forever', 'always', 'cursive'],
    svg: `<svg viewBox="0 0 100 45" xmlns="http://www.w3.org/2000/svg">
      <text x="50" y="28" font-family="'Caveat', cursive" font-size="20" fill="#5e381f" text-anchor="middle" font-weight="bold">Forever & Always</text>
      <line x1="15" y1="36" x2="85" y2="36" stroke="#875631" stroke-width="1.5"/>
    </svg>`,
  },

  // ==========================================
  // 9. DECORATION & FLOURISHES (8 stickers)
  // ==========================================
  {
    id: 'deco-baroque-flourish',
    name: 'Baroque Gilt Filigree',
    category: 'decoration',
    width: 80,
    height: 50,
    tags: ['baroque', 'gold', 'flourish', 'royal'],
    svg: `<svg viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M8,25 Q20,10 40,25 Q60,40 72,25" stroke="#b89337" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M22,18 Q30,6 40,16 Q50,6 58,18" stroke="#b89337" stroke-width="2" fill="none"/>
      <circle cx="40" cy="25" r="3.5" fill="#b89337"/>
    </svg>`,
  },
  {
    id: 'deco-laurel-wreath',
    name: 'Golden Laurel Wreath',
    category: 'decoration',
    width: 75,
    height: 65,
    tags: ['laurel', 'victory', 'honor', 'wreath'],
    svg: `<svg viewBox="0 0 75 65" xmlns="http://www.w3.org/2000/svg">
      <path d="M20,52 C12,38 15,20 37.5,12 C60,20 63,38 55,52" fill="none" stroke="#a8852d" stroke-width="2"/>
      <g fill="#c9a33e">
        <ellipse cx="22" cy="40" rx="5" ry="2.5" transform="rotate(-30 22 40)"/>
        <ellipse cx="20" cy="28" rx="5" ry="2.5" transform="rotate(-45 20 28)"/>
        <ellipse cx="26" cy="18" rx="5" ry="2.5" transform="rotate(-60 26 18)"/>
        <ellipse cx="53" cy="40" rx="5" ry="2.5" transform="rotate(30 53 40)"/>
        <ellipse cx="55" cy="28" rx="5" ry="2.5" transform="rotate(45 55 28)"/>
        <ellipse cx="49" cy="18" rx="5" ry="2.5" transform="rotate(60 49 18)"/>
      </g>
    </svg>`,
  },
  {
    id: 'deco-crown',
    name: 'Royal Vintage Crown',
    category: 'decoration',
    width: 65,
    height: 50,
    tags: ['crown', 'queen', 'king', 'royal'],
    svg: `<svg viewBox="0 0 65 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,40 L12,18 L24,28 L32.5,12 L41,28 L53,18 L55,40 Z" fill="#d9b643" stroke="#876813" stroke-width="2"/>
      <circle cx="12" cy="16" r="3" fill="#962828"/>
      <circle cx="32.5" cy="10" r="3.5" fill="#962828"/>
      <circle cx="53" cy="16" r="3" fill="#962828"/>
      <line x1="10" y1="40" x2="55" y2="40" stroke="#876813" stroke-width="3"/>
    </svg>`,
  },
  {
    id: 'deco-divider-leaf',
    name: 'Botanical Leaf Divider',
    category: 'decoration',
    width: 100,
    height: 30,
    tags: ['divider', 'leaf', 'separator'],
    svg: `<svg viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="15" x2="40" y2="15" stroke="#7a552b" stroke-width="1.5"/>
      <line x1="60" y1="15" x2="95" y2="15" stroke="#7a552b" stroke-width="1.5"/>
      <circle cx="50" cy="15" r="4" fill="#a13d38"/>
      <path d="M44,15 Q40,9 46,12" stroke="#486638" stroke-width="1.5" fill="none"/>
      <path d="M56,15 Q60,9 54,12" stroke="#486638" stroke-width="1.5" fill="none"/>
    </svg>`,
  },
  {
    id: 'deco-vintage-corner-gold',
    name: 'Antique Gilt Border Corner',
    category: 'decoration',
    width: 60,
    height: 60,
    tags: ['corner', 'gold', 'antique', 'ornament'],
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M6,54 L6,6 L54,6" fill="none" stroke="#b08c35" stroke-width="3"/>
      <path d="M12,46 L12,12 L46,12" fill="none" stroke="#b08c35" stroke-width="1.5"/>
      <circle cx="6" cy="6" r="4" fill="#b08c35"/>
      <circle cx="18" cy="18" r="3" fill="#b08c35"/>
    </svg>`,
  },
  {
    id: 'deco-lace-medallion',
    name: 'Victorian Lace Medallion',
    category: 'decoration',
    width: 65,
    height: 65,
    tags: ['lace', 'medallion', 'vintage'],
    svg: `<svg viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32.5" cy="32.5" r="28" fill="#f7f1e6" stroke="#bfa37e" stroke-width="1.5" stroke-dasharray="3,2"/>
      <circle cx="32.5" cy="32.5" r="20" fill="none" stroke="#bfa37e" stroke-width="1.5"/>
      <circle cx="32.5" cy="32.5" r="10" fill="#eedcc7"/>
      <circle cx="32.5" cy="32.5" r="4" fill="#8c6439"/>
    </svg>`,
  },
  {
    id: 'deco-sunburst-crest',
    name: 'Radiant Sunburst Crest',
    category: 'decoration',
    width: 70,
    height: 70,
    tags: ['sunburst', 'crest', 'antique'],
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#b89335" stroke-width="1.5">
        <line x1="35" y1="35" x2="35" y2="6" transform="rotate(0 35 35)"/>
        <line x1="35" y1="35" x2="35" y2="6" transform="rotate(22.5 35 35)"/>
        <line x1="35" y1="35" x2="35" y2="6" transform="rotate(45 35 35)"/>
        <line x1="35" y1="35" x2="35" y2="6" transform="rotate(67.5 35 35)"/>
        <line x1="35" y1="35" x2="35" y2="6" transform="rotate(90 35 35)"/>
        <line x1="35" y1="35" x2="35" y2="6" transform="rotate(112.5 35 35)"/>
        <line x1="35" y1="35" x2="35" y2="6" transform="rotate(135 35 35)"/>
        <line x1="35" y1="35" x2="35" y2="6" transform="rotate(157.5 35 35)"/>
        <line x1="35" y1="35" x2="35" y2="6" transform="rotate(180 35 35)"/>
        <line x1="35" y1="35" x2="35" y2="6" transform="rotate(202.5 35 35)"/>
        <line x1="35" y1="35" x2="35" y2="6" transform="rotate(225 35 35)"/>
        <line x1="35" y1="35" x2="35" y2="6" transform="rotate(247.5 35 35)"/>
        <line x1="35" y1="35" x2="35" y2="6" transform="rotate(270 35 35)"/>
        <line x1="35" y1="35" x2="35" y2="6" transform="rotate(292.5 35 35)"/>
        <line x1="35" y1="35" x2="35" y2="6" transform="rotate(315 35 35)"/>
        <line x1="35" y1="35" x2="35" y2="6" transform="rotate(337.5 35 35)"/>
      </g>
      <circle cx="35" cy="35" r="14" fill="#faeed7" stroke="#b89335" stroke-width="2"/>
      <circle cx="35" cy="35" r="6" fill="#b89335"/>
    </svg>`,
  },
  {
    id: 'deco-fleur-de-lis',
    name: 'Gilded Fleur-de-lis',
    category: 'decoration',
    width: 55,
    height: 65,
    tags: ['fleur', 'french', 'monarchy', 'gold'],
    svg: `<svg viewBox="0 0 55 65" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.5,6 C30,16 35,24 40,28 C34,29 27.5,22 27.5,22 C27.5,22 21,29 15,28 C20,24 25,16 27.5,6 Z" fill="#c49e35" stroke="#7a5f14" stroke-width="1.5"/>
      <path d="M12,28 C6,24 4,36 12,42 C18,44 24,38 27.5,34 C20,34 16,30 12,28 Z" fill="#c49e35" stroke="#7a5f14" stroke-width="1.5"/>
      <path d="M43,28 C49,24 51,36 43,42 C37,44 31,38 27.5,34 C35,34 39,30 43,28 Z" fill="#c49e35" stroke="#7a5f14" stroke-width="1.5"/>
      <rect x="18" y="38" width="19" height="5" rx="1.5" fill="#7a5f14"/>
      <path d="M27.5,43 L27.5,58 L23,52 M27.5,58 L32,52" stroke="#7a5f14" stroke-width="2" fill="none"/>
    </svg>`,
  },
];
