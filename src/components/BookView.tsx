import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { DiaryPage, InteractionMode, DrawingTool, DiarySettings } from '../types';
import { PageCanvas } from './PageCanvas';
import { playPageTurnSound } from '../utils/audio';

interface BookViewProps {
  pages: DiaryPage[];
  currentPageIndex: number;
  mode: InteractionMode;
  settings: DiarySettings;
  activeTool: DrawingTool;
  drawingColor: string;
  drawingSize: number;
  drawingOpacity: number;
  onPageChange: (newIndex: number) => void;
  onUpdatePage: (updatedPage: DiaryPage) => void;
}

export const BookView: React.FC<BookViewProps> = ({
  pages,
  currentPageIndex,
  mode,
  settings,
  activeTool,
  drawingColor,
  drawingSize,
  drawingOpacity,
  onPageChange,
  onUpdatePage,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Responsive layout dimensions
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
    isTwoPage: boolean;
    pageWidth: number;
  }>({
    width: 900,
    height: 620,
    isTwoPage: true,
    pageWidth: 430,
  });

  // 3D Flip State
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipProgress, setFlipProgress] = useState(0); // 0 to 1
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward');

  // Dragging corner gesture tracking
  const dragRef = useRef<{
    startX: number;
    startY: number;
    isDragging: boolean;
    direction: 'forward' | 'backward' | null;
  }>({ startX: 0, startY: 0, isDragging: false, direction: null });

  // Touch swipe tracking (for phone portrait & landscape swipe gestures)
  const touchSwipeRef = useRef<{
    startX: number;
    startY: number;
    startTime: number;
    isEligible: boolean;
  }>({ startX: 0, startY: 0, time: 0, isEligible: false });

  // Calculate container sizing and orientation layout
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const cw = containerRef.current.clientWidth;
      const ch = containerRef.current.clientHeight;

      // Check orientation
      const isLandscape = cw > ch;

      // Two-page spread criteria:
      // 1. In landscape orientation: width >= 560px and height >= 240px (phones in landscape, tablets, laptops)
      // 2. In portrait orientation: only if width is very wide >= 880px
      // Otherwise: Single-page portrait view!
      const isTwoPage = isLandscape ? (cw >= 560 && ch >= 240) : (cw >= 880);

      if (isTwoPage) {
        // Two-page spread
        const availH = Math.min(ch - 30, 720);
        const availW = Math.min(cw - 36, 1140);
        // Each page has roughly 1 : 1.38 aspect ratio
        let pw = (availW - 36) / 2;
        let ph = pw * 1.38;
        if (ph > availH) {
          ph = availH;
          pw = ph / 1.38;
        }
        pw = Math.round(pw);
        ph = Math.round(ph);
        setDimensions({
          width: pw * 2 + 36,
          height: ph,
          isTwoPage: true,
          pageWidth: pw,
        });
      } else {
        // Single-page view (phone portrait, narrow viewport, or tablet portrait)
        const availH = Math.min(ch - 24, 760);
        const availW = Math.min(cw - 24, 480);
        let pw = availW;
        let ph = pw * 1.42;
        if (ph > availH) {
          ph = availH;
          pw = ph / 1.42;
        }
        pw = Math.round(pw);
        ph = Math.round(ph);
        setDimensions({
          width: pw,
          height: ph,
          isTwoPage: false,
          pageWidth: pw,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    window.addEventListener('orientationchange', updateSize);

    // Also listen to mediaQuery for orientation changes
    const mql = window.matchMedia('(orientation: landscape)');
    const handleOrientation = () => updateSize();
    try {
      mql.addEventListener('change', handleOrientation);
    } catch (_) {
      mql.addListener(handleOrientation);
    }

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('orientationchange', updateSize);
      try {
        mql.removeEventListener('change', handleOrientation);
      } catch (_) {
        mql.removeListener(handleOrientation);
      }
    };
  }, []);

  // Compute displayed pages
  // Index 0 = Cover
  const isCover = currentPageIndex === 0;

  // On two-page spread, normalize index to spread boundary
  const leftPageIndex = isCover ? -1 : (currentPageIndex % 2 === 1 ? currentPageIndex : currentPageIndex - 1);
  const rightPageIndex = isCover ? 0 : leftPageIndex + 1;

  const leftPage = leftPageIndex >= 0 && leftPageIndex < pages.length ? pages[leftPageIndex] : null;
  const rightPage = rightPageIndex >= 0 && rightPageIndex < pages.length ? pages[rightPageIndex] : null;

  // Navigation conditions
  const canGoBack = currentPageIndex > 0;
  const canGoForward = !dimensions.isTwoPage
    ? currentPageIndex < pages.length - 1
    : (isCover ? pages.length > 1 : rightPageIndex < pages.length - 1);

  // Animated Flip engine
  const animateFlip = useCallback((direction: 'forward' | 'backward', onComplete: () => void) => {
    if (isFlipping) return;
    setIsFlipping(true);
    setFlipDirection(direction);

    if (settings.soundEnabled) {
      playPageTurnSound(settings.volume, direction === 'backward');
    }

    const duration = settings.animationsEnabled ? 450 : 40;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smooth cubic bezier easing
      const eased = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setFlipProgress(eased);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setIsFlipping(false);
        setFlipProgress(0);
        onComplete();
      }
    };

    requestAnimationFrame(frame);
  }, [isFlipping, settings.animationsEnabled, settings.soundEnabled, settings.volume]);

  // Turn forward
  const handleTurnForward = () => {
    if (!canGoForward || isFlipping) return;
    animateFlip('forward', () => {
      if (!dimensions.isTwoPage) {
        // Single page mode
        onPageChange(currentPageIndex + 1);
      } else {
        // Spread mode
        if (currentPageIndex === 0) {
          onPageChange(1);
        } else {
          onPageChange(Math.min(pages.length - 1, leftPageIndex + 2));
        }
      }
    });
  };

  // Turn backward
  const handleTurnBackward = () => {
    if (!canGoBack || isFlipping) return;
    animateFlip('backward', () => {
      if (!dimensions.isTwoPage) {
        // Single page mode
        onPageChange(currentPageIndex - 1);
      } else {
        // Spread mode
        if (currentPageIndex <= 2) {
          onPageChange(0);
        } else {
          onPageChange(Math.max(1, leftPageIndex - 2));
        }
      }
    });
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight') {
        handleTurnForward();
      } else if (e.key === 'ArrowLeft') {
        handleTurnBackward();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Touch Swipe detection (ensures page-turn swipe works on mobile without breaking object editing)
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;

    // Do NOT trigger page-turn swipe if touch is on an interactive photo, text, sticker, handle, or draw mode
    if (
      target.closest('[id^="photo_"]') ||
      target.closest('[id^="text_"]') ||
      target.closest('[id^="sticker_"]') ||
      target.closest('button') ||
      target.closest('input') ||
      target.closest('textarea') ||
      mode === 'draw'
    ) {
      touchSwipeRef.current.isEligible = false;
      return;
    }

    const touch = e.touches[0];
    touchSwipeRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
      isEligible: true,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchSwipeRef.current.isEligible || isFlipping) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchSwipeRef.current.startX;
    const dy = touch.clientY - touchSwipeRef.current.startY;
    const elapsed = Date.now() - touchSwipeRef.current.startTime;

    // Swipe horizontal dominance check
    if (elapsed < 600 && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      if (dx < 0 && canGoForward) {
        handleTurnForward();
      } else if (dx > 0 && canGoBack) {
        handleTurnBackward();
      }
    }
    touchSwipeRef.current.isEligible = false;
  };

  // Corner Drag & Curl handling
  const handleCornerDragStart = (e: React.PointerEvent, dir: 'forward' | 'backward') => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    try {
      target.setPointerCapture(e.pointerId);
    } catch (_) {}

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      isDragging: true,
      direction: dir,
    };
  };

  const handleCornerDragMove = (e: React.PointerEvent) => {
    const dr = dragRef.current;
    if (!dr.isDragging || !dr.direction || isFlipping) return;

    const dx = e.clientX - dr.startX;
    const threshold = dimensions.pageWidth * 0.45;
    let ratio = 0;
    if (dr.direction === 'forward') {
      ratio = Math.max(0, Math.min(1, -dx / threshold));
    } else {
      ratio = Math.max(0, Math.min(1, dx / threshold));
    }
    setFlipDirection(dr.direction);
    setFlipProgress(ratio);
  };

  const handleCornerDragEnd = (e: React.PointerEvent) => {
    const dr = dragRef.current;
    if (!dr.isDragging) return;

    const target = e.currentTarget as HTMLElement;
    try {
      if (target && target.hasPointerCapture(e.pointerId)) {
        target.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}

    const completed = flipProgress > 0.35;
    const dir = dr.direction;
    dragRef.current = { startX: 0, startY: 0, isDragging: false, direction: null };

    if (completed) {
      if (dir === 'forward' && canGoForward) {
        handleTurnForward();
      } else if (dir === 'backward' && canGoBack) {
        handleTurnBackward();
      } else {
        setFlipProgress(0);
      }
    } else {
      setFlipProgress(0);
    }
  };

  const { pageWidth, height: pageHeight, isTwoPage } = dimensions;

  return (
    <div 
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full flex items-center justify-center p-2 sm:p-4 overflow-hidden select-none"
    >
      {/* Outer book binding wrapper */}
      <div 
        className="relative flex items-center justify-center rounded-lg transition-all duration-300"
        style={{
          perspective: '2600px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Navigation Arrow Buttons (Left & Right) */}
        {canGoBack && (
          <button
            onClick={handleTurnBackward}
            disabled={isFlipping}
            className="absolute -left-3 sm:-left-6 z-40 p-2 sm:p-2.5 rounded-full bg-[#3c2517]/90 text-[#ecd7aa] border border-[#a87c53]/70 hover:bg-[#523420] shadow-xl transition-all transform hover:-translate-x-1 active:scale-95 disabled:opacity-30 cursor-pointer"
            title="Previous Page (Left Arrow or Swipe Right)"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {canGoForward && (
          <button
            onClick={handleTurnForward}
            disabled={isFlipping}
            className="absolute -right-3 sm:-right-6 z-40 p-2 sm:p-2.5 rounded-full bg-[#3c2517]/90 text-[#ecd7aa] border border-[#a87c53]/70 hover:bg-[#523420] shadow-xl transition-all transform hover:translate-x-1 active:scale-95 disabled:opacity-30 cursor-pointer"
            title="Next Page (Right Arrow or Swipe Left)"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* ================================================= */}
        {/* CASE 1: PHONE PORTRAIT SINGLE-PAGE VIEW           */}
        {/* ================================================= */}
        {!isTwoPage ? (
          <div 
            className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-[#3e2719]"
            style={{
              width: `${pageWidth}px`,
              height: `${pageHeight}px`,
            }}
          >
            {pages[currentPageIndex] && (
              <PageCanvas
                page={pages[currentPageIndex]}
                pageSide="single"
                width={pageWidth}
                height={pageHeight}
                mode={mode}
                showPageNumber={settings.showPageNumbers}
                activeTool={activeTool}
                drawingColor={drawingColor}
                drawingSize={drawingSize}
                drawingOpacity={drawingOpacity}
                onUpdatePage={onUpdatePage}
              />
            )}

            {/* Mobile Corner Turn Drag Handle */}
            {canGoForward && (
              <div
                onPointerDown={(e) => handleCornerDragStart(e, 'forward')}
                onPointerMove={handleCornerDragMove}
                onPointerUp={handleCornerDragEnd}
                className="absolute bottom-0 right-0 w-12 h-12 z-30 cursor-pointer flex items-end justify-end p-1.5"
                style={{
                  background: 'linear-gradient(135deg, transparent 50%, rgba(139, 90, 43, 0.4) 100%)',
                }}
                title="Drag or swipe to turn page"
              >
                <span className="text-[10px] text-[#5e381b] font-serif font-bold">↷</span>
              </div>
            )}

            {/* Single-page 3D Flip Leaf */}
            {(isFlipping || flipProgress > 0) && (
              <div
                className="absolute inset-0 pointer-events-none z-40 overflow-hidden"
                style={{
                  transformOrigin: flipDirection === 'forward' ? 'left center' : 'right center',
                  transform: `perspective(2400px) rotateY(${
                    flipDirection === 'forward' ? -flipProgress * 90 : (1 - flipProgress) * 90
                  }deg)`,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  transition: isFlipping ? 'none' : 'transform 0.1s ease-out',
                }}
              >
                <div 
                  className="w-full h-full"
                  style={{
                    background: 'linear-gradient(to right, #eedfc5 0%, #faf4e8 70%, #dfcbb0 100%)',
                    boxShadow: 'inset 0 0 40px rgba(139, 90, 43, 0.15)',
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          /* ================================================= */
          /* CASE 2: DESKTOP / TABLET / PHONE LANDSCAPE SPREAD  */
          /* ================================================= */
          <div
            className="relative flex items-center justify-center p-2.5 sm:p-3 rounded-lg"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(62, 38, 23, 0.95) 0%, rgba(30, 18, 10, 1) 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.85), inset 0 0 15px rgba(0,0,0,0.6)',
              border: '4px solid #4a2f1d',
            }}
          >
            {/* Book Spine Center Trim & Headbands */}
            <div className="absolute top-1 bottom-1 left-1/2 -translate-x-1/2 w-7 z-30 pointer-events-none flex flex-col justify-between items-center">
              {/* Top headband */}
              <div className="w-6 h-2 rounded-t-xs bg-[#c9a76d] border-b border-[#704f29] shadow-xs" />
              {/* Vertical book binding thread & deep crease */}
              <div 
                className="w-4 flex-1 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(30,18,10,0.95) 45%, rgba(60,35,20,0.95) 55%, rgba(0,0,0,0.5) 100%)',
                  boxShadow: 'inset 0 0 4px rgba(0,0,0,0.9)',
                }}
              >
                {/* Physical binding stitches */}
                <div className="flex flex-col justify-around h-full py-4 opacity-40">
                  {[...Array(6)].map((_, i) => (
                    <span key={i} className="w-2.5 h-0.5 bg-[#e4cf9f] rounded-full shadow-xs" />
                  ))}
                </div>
              </div>
              {/* Bottom headband */}
              <div className="w-6 h-2 rounded-b-xs bg-[#c9a76d] border-t border-[#704f29] shadow-xs" />
            </div>

            {/* Silk bookmark ribbon */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-24 sm:h-28 bg-[#8f2828] z-30 pointer-events-none shadow-md rounded-b-xs border-x border-[#591818] flex items-end justify-center pb-1">
              <Bookmark className="w-2.5 h-2.5 text-[#eec77e] opacity-80" />
            </div>

            {/* Closed Cover View (Page 0) */}
            {isCover ? (
              <div 
                className="flex items-center justify-center"
                style={{ width: `${pageWidth * 2}px`, height: `${pageHeight}px` }}
              >
                {/* Left desk area */}
                <div 
                  className="w-1/2 h-full flex flex-col items-center justify-center p-4 sm:p-6 border-r border-[#3d2416]/60"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(70,44,28,0.3) 0%, rgba(20,12,7,0.8) 100%)',
                  }}
                >
                  <p className="font-serif italic text-xs sm:text-sm text-[#bfa27a]/80 text-center max-w-xs mb-3">
                    "Fill your paper with the breathings of your heart."
                  </p>
                  <button
                    onClick={handleTurnForward}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-[#82542a] text-[#f7eedc] font-serif text-xs font-semibold hover:bg-[#68411e] shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    Open Diary <span>➔</span>
                  </button>
                </div>

                {/* Right Cover */}
                <div 
                  className="w-1/2 h-full relative cursor-pointer"
                  onClick={handleTurnForward}
                  title="Click to open Moments.."
                >
                  <PageCanvas
                    page={pages[0]}
                    pageSide="right"
                    width={pageWidth}
                    height={pageHeight}
                    mode={mode}
                    showPageNumber={false}
                    activeTool={activeTool}
                    drawingColor={drawingColor}
                    drawingSize={drawingSize}
                    drawingOpacity={drawingOpacity}
                    onUpdatePage={onUpdatePage}
                  />

                  {/* Corner bookmark to open */}
                  <div 
                    className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-[#2b170d]/90 text-[#dfc18b] border border-[#d4af37]/40 font-serif text-[11px] shadow-lg flex items-center gap-1.5"
                  >
                    <span>Click or drag to open</span>
                    <span className="text-xs">❦</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Two-page open spread */
              <div 
                className="relative flex items-center justify-center"
                style={{ width: `${pageWidth * 2}px`, height: `${pageHeight}px` }}
              >
                {/* LEFT PAGE CONTAINER */}
                <div 
                  className="relative overflow-hidden rounded-l-md shadow-lg"
                  style={{ width: `${pageWidth}px`, height: `${pageHeight}px` }}
                >
                  {leftPage ? (
                    <PageCanvas
                      page={leftPage}
                      pageSide="left"
                      width={pageWidth}
                      height={pageHeight}
                      mode={mode}
                      showPageNumber={settings.showPageNumbers}
                      activeTool={activeTool}
                      drawingColor={drawingColor}
                      drawingSize={drawingSize}
                      drawingOpacity={drawingOpacity}
                      onUpdatePage={onUpdatePage}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#f4ebd9]/90" />
                  )}

                  {/* Left Bottom Corner Turn Trigger */}
                  {canGoBack && (
                    <div
                      onPointerDown={(e) => handleCornerDragStart(e, 'backward')}
                      onPointerMove={handleCornerDragMove}
                      onPointerUp={handleCornerDragEnd}
                      onClick={handleTurnBackward}
                      className="absolute bottom-0 left-0 w-14 h-14 z-20 cursor-pointer flex items-end justify-start p-1.5 group"
                      title="Turn to previous page"
                    >
                      <div 
                        className="w-7 h-7 rounded-tr-md flex items-center justify-center border-t border-r border-[#8b5a2b]/40 shadow-xs transition-transform group-hover:scale-110"
                        style={{
                          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.45) 0%, rgba(139, 90, 43, 0.2) 100%)',
                        }}
                      >
                        <span className="text-[10px] text-[#54341b] font-bold">↶</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT PAGE CONTAINER */}
                <div 
                  className="relative overflow-hidden rounded-r-md shadow-lg"
                  style={{ width: `${pageWidth}px`, height: `${pageHeight}px` }}
                >
                  {rightPage ? (
                    <PageCanvas
                      page={rightPage}
                      pageSide="right"
                      width={pageWidth}
                      height={pageHeight}
                      mode={mode}
                      showPageNumber={settings.showPageNumbers}
                      activeTool={activeTool}
                      drawingColor={drawingColor}
                      drawingSize={drawingSize}
                      drawingOpacity={drawingOpacity}
                      onUpdatePage={onUpdatePage}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#f4ebd9]/90" />
                  )}

                  {/* Right Bottom Corner Turn Trigger */}
                  {canGoForward && (
                    <div
                      onPointerDown={(e) => handleCornerDragStart(e, 'forward')}
                      onPointerMove={handleCornerDragMove}
                      onPointerUp={handleCornerDragEnd}
                      onClick={handleTurnForward}
                      className="absolute bottom-0 right-0 w-14 h-14 z-20 cursor-pointer flex items-end justify-end p-1.5 group"
                      title="Turn to next page"
                    >
                      <div 
                        className="w-7 h-7 rounded-tl-md flex items-center justify-center border-t border-l border-[#8b5a2b]/40 shadow-xs transition-transform group-hover:scale-110"
                        style={{
                          background: 'linear-gradient(225deg, rgba(212, 175, 55, 0.45) 0%, rgba(139, 90, 43, 0.2) 100%)',
                        }}
                      >
                        <span className="text-[10px] text-[#54341b] font-bold">↷</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3D Dynamic Turning Leaf (When animating or dragging) */}
                {(isFlipping || flipProgress > 0) && (
                  <div
                    className="absolute top-0 bottom-0 pointer-events-none z-30 overflow-hidden"
                    style={{
                      left: flipDirection === 'forward' ? `${pageWidth}px` : '0px',
                      width: `${pageWidth}px`,
                      transformOrigin: flipDirection === 'forward' ? 'left center' : 'right center',
                      transform: `perspective(2400px) rotateY(${
                        flipDirection === 'forward' ? -flipProgress * 180 : (1 - flipProgress) * 180
                      }deg)`,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                      transition: isFlipping ? 'none' : 'transform 0.1s ease-out',
                    }}
                  >
                    <div 
                      className="w-full h-full"
                      style={{
                        background: 'linear-gradient(to right, #eedfc5 0%, #faf4e8 70%, #dfcbb0 100%)',
                        boxShadow: 'inset 0 0 40px rgba(139, 90, 43, 0.15)',
                      }}
                    >
                      <div 
                        className="w-full h-full"
                        style={{
                          background: `linear-gradient(to right, rgba(0,0,0,${Math.sin(flipProgress * Math.PI) * 0.35}) 0%, transparent 80%)`
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
