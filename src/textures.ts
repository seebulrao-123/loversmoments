import type { CSSProperties } from 'react';
import { PageBackground, VintageTextureId, GradientConfig } from '../types';

// Subtle noise data-URI filter to create authentic paper tooth and grain
const PAPER_NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.06'/%3E%3C/svg%3E")`;

// Water stain / aged vignette overlay
const AGED_VIGNETTE = `radial-gradient(ellipse at center, transparent 65%, rgba(139, 90, 43, 0.12) 100%)`;

// Subtle paper fiber overlay
const PAPER_FIBERS = `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238b5a2b' fill-opacity='0.035'%3E%3Ccircle cx='20' cy='20' r='1.2'/%3E%3Ccircle cx='80' cy='45' r='0.8'/%3E%3Ccircle cx='45' cy='95' r='1.5'/%3E%3Ccircle cx='105' cy='85' r='1'/%3E%3Cpath d='M30,10 Q50,15 40,30' stroke='%238b5a2b' stroke-width='0.6' stroke-opacity='0.04' fill='none'/%3E%3Cpath d='M75,70 Q95,65 90,90' stroke='%238b5a2b' stroke-width='0.5' stroke-opacity='0.03' fill='none'/%3E%3C/g%3E%3C/svg%3E")`;

export interface TextureInfo {
  id: VintageTextureId;
  name: string;
  description: string;
  previewBg: string;
  style: CSSProperties;
}

export const VINTAGE_TEXTURES: Record<VintageTextureId, TextureInfo> = {
  'none': {
    id: 'none',
    name: 'Clean Blank',
    description: 'Crisp smooth blank paper',
    previewBg: '#faf8f5',
    style: {
      backgroundColor: '#faf8f5',
    }
  },
  'old-paper': {
    id: 'old-paper',
    name: 'Old Paper',
    description: 'Naturally yellowed archival paper with subtle grain',
    previewBg: '#f6eedb',
    style: {
      backgroundColor: '#f6eedb',
      backgroundImage: `${PAPER_NOISE}, ${AGED_VIGNETTE}`,
    }
  },
  'antique': {
    id: 'antique',
    name: 'Antique Paper',
    description: 'Golden warm antique paper with edge patina',
    previewBg: '#f2e5c8',
    style: {
      backgroundColor: '#f2e5c8',
      backgroundImage: `${PAPER_FIBERS}, ${PAPER_NOISE}, radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(160, 110, 50, 0.18) 100%)`,
    }
  },
  'aged-parchment': {
    id: 'aged-parchment',
    name: 'Aged Parchment',
    description: 'Deep warm parchment with authentic mottled tones',
    previewBg: '#ede0c3',
    style: {
      backgroundColor: '#ede0c3',
      backgroundImage: `${PAPER_NOISE}, radial-gradient(circle at 20% 30%, rgba(210, 175, 120, 0.35) 0%, transparent 55%), radial-gradient(circle at 85% 75%, rgba(175, 130, 80, 0.25) 0%, transparent 60%), ${AGED_VIGNETTE}`,
    }
  },
  'cream-paper': {
    id: 'cream-paper',
    name: 'Cream Paper',
    description: 'Soft refined ivory cream literary book paper',
    previewBg: '#fcf8f0',
    style: {
      backgroundColor: '#fcf8f0',
      backgroundImage: `${PAPER_NOISE}`,
    }
  },
  'sepia-paper': {
    id: 'sepia-paper',
    name: 'Sepia Paper',
    description: 'Rich nostalgic sepia tone with aged warmth',
    previewBg: '#e6d2b5',
    style: {
      backgroundColor: '#e6d2b5',
      backgroundImage: `${PAPER_NOISE}, ${PAPER_FIBERS}, ${AGED_VIGNETTE}`,
    }
  },
  'rough-paper': {
    id: 'rough-paper',
    name: 'Rough Paper',
    description: 'Handmade cold-press rag paper with tactile texture',
    previewBg: '#eee4d1',
    style: {
      backgroundColor: '#eee4d1',
      backgroundImage: `${PAPER_FIBERS}, ${PAPER_NOISE}, repeating-linear-gradient(45deg, rgba(120, 90, 50, 0.015) 0px, rgba(120, 90, 50, 0.015) 2px, transparent 2px, transparent 4px)`,
    }
  },
  'stained-paper': {
    id: 'stained-paper',
    name: 'Slightly Stained',
    description: 'Vintage diary paper with subtle coffee/tea watermarks',
    previewBg: '#f3e6ce',
    style: {
      backgroundColor: '#f3e6ce',
      backgroundImage: `${PAPER_NOISE}, radial-gradient(circle at 75% 25%, rgba(139, 90, 43, 0.16) 0%, rgba(139, 90, 43, 0.04) 40%, transparent 65%), radial-gradient(circle at 25% 80%, rgba(150, 100, 50, 0.14) 0%, transparent 50%), ${AGED_VIGNETTE}`,
    }
  },
  'vintage-brown': {
    id: 'vintage-brown',
    name: 'Vintage Brown',
    description: 'Rustic kraft paper with rich warm brown heritage',
    previewBg: '#d9bea0',
    style: {
      backgroundColor: '#d9bea0',
      backgroundImage: `${PAPER_FIBERS}, ${PAPER_NOISE}, radial-gradient(circle at 50% 50%, transparent 60%, rgba(85, 50, 20, 0.22) 100%)`,
    }
  }
};

/**
 * Generate CSS gradient string from GradientConfig
 */
export function buildGradientString(gradient: GradientConfig): string {
  const sortedStops = [...gradient.stops].sort((a, b) => a.offset - b.offset);
  const stopsStr = sortedStops.map(s => `${s.color} ${s.offset}%`).join(', ');

  switch (gradient.type) {
    case 'radial': {
      const px = gradient.positionX ?? 50;
      const py = gradient.positionY ?? 50;
      return `radial-gradient(circle at ${px}% ${py}%, ${stopsStr})`;
    }
    case 'conic': {
      const angle = gradient.angle ?? 0;
      const px = gradient.positionX ?? 50;
      const py = gradient.positionY ?? 50;
      return `conic-gradient(from ${angle}deg at ${px}% ${py}%, ${stopsStr})`;
    }
    case 'linear':
    default: {
      const angle = gradient.angle ?? 90;
      return `linear-gradient(${angle}deg, ${stopsStr})`;
    }
  }
}

/**
 * Compute the full CSS styles for a page background
 */
export function getPageBackgroundStyle(bg: PageBackground): CSSProperties {
  if (!bg) {
    return { backgroundColor: '#fcf8f0' };
  }

  // 1. None: crisp clean blank paper
  if (bg.type === 'none') {
    return {
      backgroundColor: '#ffffff',
    };
  }

  // 2. Solid color
  if (bg.type === 'color') {
    return {
      backgroundColor: bg.color,
      backgroundImage: PAPER_NOISE,
    };
  }

  // 3. Custom Gradient
  if (bg.type === 'gradient') {
    const gradStr = buildGradientString(bg.gradient);
    return {
      background: gradStr,
      opacity: bg.gradient.opacity ?? 1,
    };
  }

  // 4. Vintage Texture
  if (bg.type === 'texture') {
    const tex = VINTAGE_TEXTURES[bg.texture] || VINTAGE_TEXTURES['cream-paper'];
    return tex.style;
  }

  return { backgroundColor: '#fcf8f0' };
}
