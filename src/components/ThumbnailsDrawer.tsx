import React from 'react';
import { 
  X, Plus, Trash2, Copy, ArrowLeft, ArrowRight, BookOpen
} from 'lucide-react';
import { DiaryPage } from '../types';
import { getPageBackgroundStyle } from '../utils/textures';

interface ThumbnailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pages: DiaryPage[];
  currentPageIndex: number;
  onSelectPage: (index: number) => void;
  onAddPage: () => void;
  onDeletePage: (index: number) => void;
  onDuplicatePage: (index: number) => void;
  onMovePage: (fromIndex: number, toIndex: number) => void;
}

export const ThumbnailsDrawer: React.FC<ThumbnailsDrawerProps> = ({
  isOpen,
  onClose,
  pages,
  currentPageIndex,
  onSelectPage,
  onAddPage,
  onDeletePage,
  onDuplicatePage,
  onMovePage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[#8b5a2b]/40 text-[#3b2716]"
        style={{
          backgroundColor: '#f6eedb',
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(210,180,140,0.2) 0%, transparent 80%)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#cca77d]/40 bg-[#eedfc5]/70">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#82542a]" />
            <div>
              <h2 className="text-base font-serif font-bold text-[#442c16]">Page Manager</h2>
              <p className="text-xs text-[#7d5939]">{pages.length} pages in diary</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onAddPage}
              className="flex items-center gap-1 px-3 py-1 rounded bg-[#82542a] text-white text-xs font-serif font-medium hover:bg-[#6a421e] shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Blank Page
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#735133] hover:bg-[#e4cfb2] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Thumbnails Grid */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-3.5">
            {pages.map((page, index) => {
              const isSelected = index === currentPageIndex;
              const bgStyle = getPageBackgroundStyle(page.background);

              return (
                <div
                  key={page.id}
                  onClick={() => onSelectPage(index)}
                  className={`group relative flex flex-col rounded-lg border-2 p-2 transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-[#82542a] bg-[#ecd8be] shadow-md ring-2 ring-[#82542a]/30' 
                      : 'border-[#cca77d]/50 bg-[#faf6ee] hover:border-[#82542a]/70 hover:shadow-xs'
                  }`}
                >
                  {/* Thumbnail Preview Area */}
                  <div
                    style={page.isCover ? { backgroundColor: '#342318' } : bgStyle}
                    className="relative w-full aspect-[1/1.35] rounded border border-black/10 overflow-hidden shadow-inner flex items-center justify-center"
                  >
                    {page.isCover ? (
                      <div className="text-center p-2">
                        <span 
                          className="text-lg font-serif text-[#ecd7aa] block"
                          style={{ fontFamily: "'Alex Brush', cursive" }}
                        >
                          Moments..
                        </span>
                        <span className="text-[9px] text-[#c4aa7f] uppercase tracking-wider block mt-1">Cover</span>
                      </div>
                    ) : (
                      <div className="relative w-full h-full p-2 flex flex-col justify-between">
                        {/* Summary of items count */}
                        <div className="flex justify-between items-center text-[10px] text-[#735235]">
                          <span>
                            {page.photos.length > 0 && `📷 ${page.photos.length}`}
                          </span>
                          <span>
                            {page.texts.length > 0 && `✍ ${page.texts.length}`}
                          </span>
                        </div>

                        {/* Page number badge */}
                        <div className="text-center">
                          <span className="text-[10px] font-serif text-[#8f6d4d]">
                            Page {page.pageNumber}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Label & Controls */}
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-serif font-semibold text-[#4d321c]">
                      {page.isCover ? 'Cover Page' : `Page ${page.pageNumber}`}
                    </span>

                    {!page.isCover && (
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                        {/* Move Left / Right */}
                        {index > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onMovePage(index, index - 1);
                            }}
                            className="p-1 hover:bg-[#e2ceb4] rounded text-[#614227]"
                            title="Move Page Up"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        )}
                        {index < pages.length - 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onMovePage(index, index + 1);
                            }}
                            className="p-1 hover:bg-[#e2ceb4] rounded text-[#614227]"
                            title="Move Page Down"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDuplicatePage(index);
                          }}
                          className="p-1 hover:bg-[#e2ceb4] rounded text-[#614227]"
                          title="Duplicate Page"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeletePage(index);
                          }}
                          className="p-1 hover:bg-[#fadcdc] rounded text-[#993b3b]"
                          title="Delete Page"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-[#cca77d]/40 bg-[#eedfc5]/60 text-center">
          <p className="text-xs font-serif text-[#78593a]">
            Click any thumbnail to jump directly to that page
          </p>
        </div>
      </div>
    </div>
  );
};
