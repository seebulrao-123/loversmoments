import { AuthModal } from './components/AuthModal';
import { supabase } from './supabaseClient';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  DiaryPage, InteractionMode, DrawingTool, DiarySettings,
  PageBackground, TextItem, PhotoItem, StickerItem, PhotoFrame, StickerCategory
} from './types';
import { 
  createInitialDiary, createBlankPage, loadDiaryPages, saveDiaryPages,
  loadSettings, saveSettings, DEFAULT_SETTINGS 
} from './utils/storage';
import { Toolbar } from './components/Toolbar';
import { BookView } from './components/BookView';
import { PageColorModal } from './components/PageColorModal';
import { ThumbnailsDrawer } from './components/ThumbnailsDrawer';
import { SettingsModal } from './components/SettingsModal';
import { ExportModal } from './components/ExportModal';
import { StickerLibraryModal } from './components/StickerLibraryModal';

export default function App() {
  const [pages, setPages] = useState<DiaryPage[]>([]);const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
// Cloud se Diary Pages Load karein jab User Log In ho
  useEffect(() => {
    if (!user) return;

    const loadCloudPages = async () => {
      const { data, error } = await supabase
        .from('diary_pages')
        .select('page_data')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error loading cloud pages:', error);
        return;
      }

      if (data && data.page_data) {
        setPages(data.page_data);
      }
    };

    loadCloudPages();
  }, [user]);

  // Diary me badlav hone par Cloud par Auto-Sync karein
  useEffect(() => {
    if (!user || pages.length === 0) return;

    const syncTimer = setTimeout(async () => {
      const { error } = await supabase.from('diary_pages').upsert({
        user_id: user.id,
        page_data: pages,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

      if (error) {
        console.error('Error syncing to cloud:', error);
      }
    }, 1000);

    return () => clearTimeout(syncTimer);
  }, [pages, user]);
    return () => subscription.unsubscribe();
  }, []);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [mode, setMode] = useState<InteractionMode>('select');
  const [settings, setSettings] = useState<DiarySettings>(DEFAULT_SETTINGS);

  // Drawing state
  const [drawingTool, setDrawingTool] = useState<DrawingTool>('fountain');
  const [drawingColor, setDrawingColor] = useState<string>('#322116');
  const [drawingSize, setDrawingSize] = useState<number>(3.5);
  const [drawingOpacity, setDrawingOpacity] = useState<number>(1);

  // Undo / Redo history stacks (stores pages snapshots)
  const [undoStack, setUndoStack] = useState<DiaryPage[][]>([]);
  const [redoStack, setRedoStack] = useState<DiaryPage[][]>([]);

  // Modals
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [isThumbnailsOpen, setIsThumbnailsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isStickerModalOpen, setIsStickerModalOpen] = useState(false);

  // Initial load
  useEffect(() => {
    async function init() {
      const loadedPages = await loadDiaryPages();
      setPages(loadedPages);
      setSettings(loadSettings());
    }
    init();
  }, []);

  // Autosave when pages change
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (pages.length > 0 && settings.autosaveEnabled) {
      const timer = setTimeout(() => {
        saveDiaryPages(pages);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [pages, settings.autosaveEnabled]);

  // Record history for Undo/Redo
  const pushHistory = useCallback((currentPages: DiaryPage[]) => {
    setUndoStack(prev => [...prev.slice(-25), JSON.parse(JSON.stringify(currentPages))]);
    setRedoStack([]);
  }, []);

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setRedoStack(prev => [...prev, JSON.parse(JSON.stringify(pages))]);
    setUndoStack(prev => prev.slice(0, -1));
    setPages(previous);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setUndoStack(prev => [...prev, JSON.parse(JSON.stringify(pages))]);
    setRedoStack(prev => prev.slice(0, -1));
    setPages(next);
  };

  // Helper to update a page and record undo
  const handleUpdatePage = (updatedPage: DiaryPage) => {
    pushHistory(pages);
    setPages(prev => prev.map(p => p.id === updatedPage.id ? updatedPage : p));
  };

  // Target page for adding new elements (if on Cover, target page 1 or switch)
  const getActiveTargetPage = (): { page: DiaryPage; index: number } => {
    if (currentPageIndex === 0) {
      // If user adds an item while on Cover, target Page 1 and navigate to it
      if (pages.length > 1) {
        setCurrentPageIndex(1);
        return { page: pages[1], index: 1 };
      }
    }
    return { 
      page: pages[currentPageIndex] || pages[0], 
      index: currentPageIndex 
    };
  };

  // Page Operations
  const handleAddBlankPage = () => {
    pushHistory(pages);
    // Create completely blank page as required:
    const newPageNum = pages.length;
    const newPage = createBlankPage(newPageNum);

    // Apply default background texture/color from settings if specified
    if (settings.defaultPageTexture && settings.defaultPageTexture !== 'none') {
      newPage.background = {
        ...newPage.background,
        type: 'texture',
        texture: settings.defaultPageTexture,
      };
    }

    const updated = [...pages, newPage];
    setPages(updated);
    saveDiaryPages(updated);
    // Jump directly to the newly added page
    setCurrentPageIndex(updated.length - 1);
  };

  const handleDeletePage = (index: number) => {
    if (index === 0) {
      alert('The Cover of Moments.. cannot be deleted.');
      return;
    }
    if (pages.length <= 2) {
      alert('The diary must keep at least one content page.');
      return;
    }

    if (window.confirm(`Are you sure you want to delete Page ${pages[index].pageNumber}?`)) {
      pushHistory(pages);
      const remaining = pages.filter((_, i) => i !== index);
      // Renumber
      const renumbered = remaining.map((p, idx) => ({
        ...p,
        pageNumber: idx,
      }));
      setPages(renumbered);
      saveDiaryPages(renumbered);
      setCurrentPageIndex(prev => Math.min(prev, renumbered.length - 1));
    }
  };

  const handleDuplicatePage = (index: number) => {
    const source = pages[index];
    if (!source || source.isCover) return;

    pushHistory(pages);
    const copy: DiaryPage = {
      ...JSON.parse(JSON.stringify(source)),
      id: 'page_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      pageNumber: index + 1,
    };

    const updated = [...pages.slice(0, index + 1), copy, ...pages.slice(index + 1)].map((p, idx) => ({
      ...p,
      pageNumber: idx,
    }));

    setPages(updated);
    saveDiaryPages(updated);
    setCurrentPageIndex(index + 1);
  };

  const handleMovePage = (fromIndex: number, toIndex: number) => {
    if (fromIndex === 0 || toIndex === 0) return; // cannot move cover
    if (toIndex < 1 || toIndex >= pages.length) return;

    pushHistory(pages);
    const updated = [...pages];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);

    const renumbered = updated.map((p, idx) => ({
      ...p,
      pageNumber: idx,
    }));

    setPages(renumbered);
    saveDiaryPages(renumbered);
    setCurrentPageIndex(toIndex);
  };

  // Add Object Handlers
  const handleAddText = (font = "'Caveat', cursive", initialText = 'Type your thoughts here..') => {
    const { page } = getActiveTargetPage();
    pushHistory(pages);

    const newTextItem: TextItem = {
      id: 'text_' + Date.now(),
      type: 'text',
      x: 50,
      y: 70 + (page.texts.length * 40) % 250,
      width: 220,
      height: 60,
      rotation: 0,
      scale: 1,
      opacity: 1,
      zIndex: 10 + page.texts.length,
      text: initialText,
      font,
      fontSize: 22,
      color: '#382516',
      letterSpacing: 0,
      shadow: false,
      fadedVintage: false,
    };

    const updatedPage: DiaryPage = {
      ...page,
      texts: [...page.texts, newTextItem],
    };
    handleUpdatePage(updatedPage);
    setMode('select');
  };

  const handleAddPhoto = (url: string, frame: PhotoFrame = 'polaroid') => {
    const { page } = getActiveTargetPage();
    pushHistory(pages);

    const newPhotoItem: PhotoItem = {
      id: 'photo_' + Date.now(),
      type: 'photo',
      x: 60 + (page.photos.length * 30) % 180,
      y: 80 + (page.photos.length * 30) % 220,
      width: 200,
      height: 235,
      rotation: Math.round(Math.random() * 8 - 4),
      scale: 1,
      opacity: 1,
      zIndex: 5 + page.photos.length,
      url,
      frame,
      caption: 'A cherished memory',
      cropZoom: {
        zoom: 100,
        panX: 0,
        panY: 0,
        fitMode: 'cover',
      },
      adjustments: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        sepia: 0,
        warmth: 0,
        blur: 0,
        vintageFaded: false,
      },
      frameStyle: {
        borderThickness: 2,
        padding: 8,
        cornerRadius: 4,
        shadowSize: 12,
        shadowOpacity: 0.25,
      },
      locked: false,
    };

    const updatedPage: DiaryPage = {
      ...page,
      photos: [...page.photos, newPhotoItem],
    };
    handleUpdatePage(updatedPage);
    setMode('select');
  };

  const handleAddSticker = (stickerId: string, category: StickerCategory) => {
    const { page } = getActiveTargetPage();
    pushHistory(pages);

    const newSticker: StickerItem = {
      id: 'sticker_' + Date.now(),
      type: 'sticker',
      x: 80 + (page.stickers.length * 35) % 180,
      y: 90 + (page.stickers.length * 35) % 220,
      width: 80,
      height: 80,
      rotation: (Math.random() * 12 - 6),
      scale: 1,
      opacity: 1,
      zIndex: 6 + page.stickers.length,
      stickerId,
      category,
    };

    const updatedPage: DiaryPage = {
      ...page,
      stickers: [...page.stickers, newSticker],
    };
    handleUpdatePage(updatedPage);
    setMode('select');
  };

  // Background Change (applies immediately to active page)
  const handleApplyBackground = (newBg: PageBackground) => {
    const activePage = pages[currentPageIndex];
    if (!activePage) return;

    pushHistory(pages);
    const updatedPage: DiaryPage = {
      ...activePage,
      background: newBg,
    };
    setPages(prev => prev.map(p => p.id === activePage.id ? updatedPage : p));
  };

  // Reset entire diary
  const handleResetEntireDiary = () => {
    const fresh = createInitialDiary();
    setPages(fresh);
    saveDiaryPages(fresh);
    setCurrentPageIndex(0);
    setUndoStack([]);
    setRedoStack([]);
  };

  const activePage = pages[currentPageIndex] || pages[0];

 return (
    <div className="w-screen h-screen flex flex-col bg-[#1e150f] text-[#eddcc5] overflow-hidden">
      {/* Top Application Toolbar with Auth Button */}
      <div className="flex items-center justify-between bg-[#2a1d15] pr-4">
        <div className="flex-1">
          <Toolbar
            mode={mode}
            onSetMode={setMode}
            drawingTool={drawingTool}
            onSetDrawingTool={setDrawingTool}
            drawingColor={drawingColor}
            onSetDrawingColor={setDrawingColor}
            drawingSize={drawingSize}
            onSetDrawingSize={setDrawingSize}
            drawingOpacity={drawingOpacity}
            onSetDrawingOpacity={setDrawingOpacity}
            onAddText={handleAddText}
            onAddPhoto={handleAddPhoto}
            onAddSticker={handleAddSticker}
            onOpenStickerLibrary={() => setIsStickerModalOpen(true)}
            onOpenColorModal={() => setIsColorModalOpen(true)}
            onOpenThumbnails={() => setIsThumbnailsOpen(true)}
            onOpenExport={() => setIsExportOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onAddBlankPage={handleAddBlankPage}
            canUndo={undoStack.length > 0}
            canRedo={redoStack.length > 0}
            onUndo={handleUndo}
            onRedo={handleRedo}
            pageNumber={activePage?.pageNumber ?? 0}
            totalPages={pages.length}
          />
        </div>

        {/* Login / Logout Button */}
        {user ? (
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-3 py-1.5 bg-[#3d2b1f] hover:bg-[#4d3728] text-[#eddcc5] text-sm rounded border border-[#5c402e] transition"
          >
            Log Out ({user.email?.split('@')[0]})
          </button>
        ) : (
          <button
            onClick={() => setIsAuthOpen(true)}
            className="px-4 py-1.5 bg-[#8b5a2b] hover:bg-[#a06a35] text-white text-sm font-medium rounded shadow transition"
          >
            Log In / Sign Up
          </button>
        )}
      </div>

      {/* Main Realistic Two-Page Open Book Area */}
      <main className="flex-1 relative w-full h-full overflow-hidden flex items-center justify-center">
        {pages.length > 0 && (
          <BookView
            pages={pages}
            currentPageIndex={currentPageIndex}
            mode={mode}
            settings={settings}
            activeTool={drawingTool}
            drawingColor={drawingColor}
            drawingSize={drawingSize}
            drawingOpacity={drawingOpacity}
            onPageChange={setCurrentPageIndex}
            onUpdatePage={handleUpdatePage}
          />
        )}
      </main>

      {/* MODAL 1: PAGE BACKGROUND COLOR & GRADIENT CREATOR */}
      {activePage && (
        <PageColorModal
          isOpen={isColorModalOpen}
          onClose={() => setIsColorModalOpen(false)}
          currentPageBackground={activePage.background}
          pageNumber={activePage.pageNumber}
          onApplyBackground={handleApplyBackground}
        />
      )}

      {/* MODAL 2: THUMBNAILS & PAGE MANAGER */}
      <ThumbnailsDrawer
        isOpen={isThumbnailsOpen}
        onClose={() => setIsThumbnailsOpen(false)}
        pages={pages}
        currentPageIndex={currentPageIndex}
        onSelectPage={(idx) => {
          setCurrentPageIndex(idx);
          setIsThumbnailsOpen(false);
        }}
        onAddPage={handleAddBlankPage}
        onDeletePage={handleDeletePage}
        onDuplicatePage={handleDuplicatePage}
        onMovePage={handleMovePage}
      />

      {/* MODAL 3: SETTINGS */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newSet) => {
          setSettings(newSet);
          saveSettings(newSet);
        }}
        onResetSettings={() => {
          setSettings(DEFAULT_SETTINGS);
          saveSettings(DEFAULT_SETTINGS);
        }}
        onResetDiary={handleResetEntireDiary}
      />

      {/* MODAL 4: EXPORT DIARY (IMAGE / PDF) */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        pages={pages}
        currentPageIndex={currentPageIndex}
      />

      {/* MODAL 5: STICKER & EPHEMERA LIBRARY */}
      <StickerLibraryModal
        isOpen={isStickerModalOpen}
        onClose={() => setIsStickerModalOpen(false)}
        onSelectSticker={(sticker) => handleAddSticker(sticker.id, sticker.category)}
      />

      {/* MODAL 6: SUPABASE AUTHENTICATION MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={() => console.log('Successfully logged in')}
      />
    </div>
  );
}