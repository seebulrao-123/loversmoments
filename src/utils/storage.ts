import { DiaryPage, DiarySettings, CustomSavedColor, PageBackground } from '../types';

const DB_NAME = 'MomentsDiaryDB';
const DB_VERSION = 1;
const STORE_PAGES = 'diary_pages';
const STORE_META = 'diary_meta';
const LOCAL_STORAGE_BACKUP = 'moments_diary_backup';
const LOCAL_STORAGE_COLORS = 'moments_my_colors';
const LOCAL_STORAGE_SETTINGS = 'moments_diary_settings';

export const DEFAULT_BACKGROUND: PageBackground = {
  type: 'texture',
  color: '#faf6ee',
  gradient: {
    type: 'linear',
    angle: 135,
    stops: [
      { id: '1', color: '#f6eedb', offset: 0 },
      { id: '2', color: '#ecdcc1', offset: 100 },
    ],
    opacity: 1,
  },
  texture: 'old-paper',
};

export const DEFAULT_SETTINGS: DiarySettings = {
  soundEnabled: true,
  volume: 0.65,
  animationsEnabled: true,
  showPageNumbers: true,
  autosaveEnabled: true,
  theme: 'vintage-dark',
  defaultPageColor: '#faf6ee',
  defaultPageTexture: 'old-paper',
};

export function createBlankPage(pageNumber: number): DiaryPage {
  return {
    id: 'page_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    pageNumber,
    background: {
      type: 'texture',
      color: '#faf6ee',
      gradient: {
        type: 'linear',
        angle: 135,
        stops: [
          { id: '1', color: '#f6eedb', offset: 0 },
          { id: '2', color: '#ecdcc1', offset: 100 },
        ],
        opacity: 1,
      },
      texture: 'old-paper',
    },
    texts: [],
    photos: [],
    stickers: [],
    drawings: [],
  };
}

export function createInitialDiary(): DiaryPage[] {
  // Page 0: The Antique Leather Cover with vintage title "Moments.."
  const coverPage: DiaryPage = {
    id: 'cover_page',
    pageNumber: 0,
    isCover: true,
    background: {
      type: 'color',
      color: '#342318',
      gradient: {
        type: 'radial',
        angle: 0,
        stops: [
          { id: 'c1', color: '#4a3324', offset: 0 },
          { id: 'c2', color: '#271910', offset: 100 },
        ],
        opacity: 1,
      },
      texture: 'none',
    },
    texts: [],
    photos: [],
    stickers: [],
    drawings: [],
  };

  // Requirement: "NEW PAGES MUST BE COMPLETELY BLANK. Do NOT automatically put photos, text boxes, quotes, stickers, drawings... on a newly created page"
  const page1 = createBlankPage(1);
  const page2 = createBlankPage(2);

  return [coverPage, page1, page2];
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_PAGES)) {
        db.createObjectStore(STORE_PAGES, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_META)) {
        db.createObjectStore(STORE_META);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveDiaryPages(pages: DiaryPage[]): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction([STORE_PAGES, STORE_META], 'readwrite');
    const pageStore = tx.objectStore(STORE_PAGES);
    const metaStore = tx.objectStore(STORE_META);

    // Clear and re-add in order
    await new Promise<void>((resolve, reject) => {
      const clearReq = pageStore.clear();
      clearReq.onsuccess = () => resolve();
      clearReq.onerror = () => reject(clearReq.error);
    });

    for (const page of pages) {
      pageStore.put(page);
    }

    metaStore.put(pages.map(p => p.id), 'page_order');
    metaStore.put(Date.now(), 'last_saved');

    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    // Fallback to localStorage if IndexedDB fails
    try {
      localStorage.setItem(LOCAL_STORAGE_BACKUP, JSON.stringify(pages));
    } catch (e) {
      console.warn('Storage fallback warning:', e);
    }
  }
}

export async function loadDiaryPages(): Promise<DiaryPage[]> {
  try {
    const db = await openDB();
    const tx = db.transaction([STORE_PAGES, STORE_META], 'readonly');
    const pageStore = tx.objectStore(STORE_PAGES);
    const metaStore = tx.objectStore(STORE_META);

    const pagesMap = new Map<string, DiaryPage>();
    await new Promise<void>((resolve, reject) => {
      const req = pageStore.openCursor();
      req.onsuccess = (e) => {
        const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          pagesMap.set(cursor.value.id, cursor.value);
          cursor.continue();
        } else {
          resolve();
        }
      };
      req.onerror = () => reject(req.error);
    });

    const orderReq = metaStore.get('page_order');
    const order: string[] = await new Promise((resolve) => {
      orderReq.onsuccess = () => resolve(orderReq.result || []);
      orderReq.onerror = () => resolve([]);
    });

    if (pagesMap.size > 0) {
      if (order && order.length > 0) {
        const sorted: DiaryPage[] = [];
        for (const id of order) {
          const page = pagesMap.get(id);
          if (page) sorted.push(page);
        }
        // append any remaining
        for (const [id, p] of pagesMap) {
          if (!order.includes(id)) sorted.push(p);
        }
        return sorted;
      }
      return Array.from(pagesMap.values()).sort((a, b) => a.pageNumber - b.pageNumber);
    }
  } catch {
    // try localStorage fallback
    try {
      const backup = localStorage.getItem(LOCAL_STORAGE_BACKUP);
      if (backup) {
        const parsed = JSON.parse(backup);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
  }

  return createInitialDiary();
}

export function loadSavedColors(): CustomSavedColor[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_COLORS);
    if (raw) return JSON.parse(raw);
  } catch {}
  // Default vintage starter presets in MY COLORS
  return [
    {
      id: 'c-vintage-gold',
      name: 'Parchment Gold',
      type: 'gradient',
      gradient: {
        type: 'linear',
        angle: 120,
        stops: [
          { id: '1', color: '#F6E7C8', offset: 0 },
          { id: '2', color: '#D8B48A', offset: 50 },
          { id: '3', color: '#8B5E3C', offset: 100 },
        ],
        opacity: 1,
      },
    },
    {
      id: 'c-rose-antique',
      name: 'Aged Rose',
      type: 'gradient',
      gradient: {
        type: 'linear',
        angle: 145,
        stops: [
          { id: '1', color: '#F8E8E0', offset: 0 },
          { id: '2', color: '#E4C1B1', offset: 55 },
          { id: '3', color: '#A06B56', offset: 100 },
        ],
        opacity: 1,
      },
    },
    {
      id: 'c-sepia-mist',
      name: 'Sepia Mist',
      type: 'gradient',
      gradient: {
        type: 'radial',
        angle: 0,
        stops: [
          { id: '1', color: '#FFF8EA', offset: 0 },
          { id: '2', color: '#E8D4B8', offset: 60 },
          { id: '3', color: '#C8A882', offset: 100 },
        ],
        opacity: 1,
      },
    },
  ];
}

export function saveCustomColor(newColor: CustomSavedColor): CustomSavedColor[] {
  const current = loadSavedColors();
  const updated = [newColor, ...current.filter(c => c.id !== newColor.id)];
  try {
    localStorage.setItem(LOCAL_STORAGE_COLORS, JSON.stringify(updated));
  } catch {}
  return updated;
}

export function deleteSavedColor(id: string): CustomSavedColor[] {
  const current = loadSavedColors();
  const updated = current.filter(c => c.id !== id);
  try {
    localStorage.setItem(LOCAL_STORAGE_COLORS, JSON.stringify(updated));
  } catch {}
  return updated;
}

export function loadSettings(): DiarySettings {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SETTINGS);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: DiarySettings): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(settings));
  } catch {}
}
