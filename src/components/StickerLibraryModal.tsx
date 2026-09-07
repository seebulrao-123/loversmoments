import React, { useState, useMemo, useEffect } from 'react';
import { X, Search, Heart, Star, Sparkles, Clock } from 'lucide-react';
import { STICKER_CATALOG, StickerDefinition } from '../utils/stickers';
import { StickerCategory } from '../types';

interface StickerLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSticker: (sticker: StickerDefinition) => void;
}

const CATEGORY_TABS: { id: StickerCategory | 'favorites' | 'recent'; label: string }[] = [
  { id: 'all', label: 'All Stickers' },
  { id: 'recent', label: 'Recent' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'hearts', label: 'Hearts' },
  { id: 'flowers', label: 'Flowers' },
  { id: 'leaves', label: 'Leaves & Flora' },
  { id: 'vintage', label: 'Vintage Objects' },
  { id: 'scrapbook', label: 'Scrapbook' },
  { id: 'travel', label: 'Travel & Mail' },
  { id: 'memory', label: 'Memory Labels' },
  { id: 'simple', label: 'Minimal / Doodles' },
  { id: 'decoration', label: 'Flourishes' },
];

export const StickerLibraryModal: React.FC<StickerLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectSticker,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<StickerCategory | 'favorites' | 'recent'>('all');
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('moments_favorite_stickers');
      return saved ? JSON.parse(saved) : ['heart-simple', 'flower-rose', 'vintage-camera', 'scrapbook-washi-tape-floral'];
    } catch {
      return [];
    }
  });
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('moments_recent_stickers');
      return saved ? JSON.parse(saved) : ['flower-rose', 'scrapbook-wax-seal', 'simple-star-gold', 'travel-compass'];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('moments_favorite_stickers', JSON.stringify(next));
      } catch (_) {}
      return next;
    });
  };

  const handleSelect = (sticker: StickerDefinition) => {
    // Add to recents
    setRecentIds(prev => {
      const next = [sticker.id, ...prev.filter(x => x !== sticker.id)].slice(0, 16);
      try {
        localStorage.setItem('moments_recent_stickers', JSON.stringify(next));
      } catch (_) {}
      return next;
    });

    onSelectSticker(sticker);
    onClose();
  };

  const filteredStickers = useMemo(() => {
    let list = STICKER_CATALOG;

    if (activeCategory === 'favorites') {
      list = list.filter(s => favoriteIds.includes(s.id));
    } else if (activeCategory === 'recent') {
      list = recentIds
        .map(id => STICKER_CATALOG.find(s => s.id === id))
        .filter((s): s is StickerDefinition => Boolean(s));
    } else if (activeCategory !== 'all') {
      list = list.filter(s => s.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        (s.tags && s.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    return list;
  }, [activeCategory, searchQuery, favoriteIds, recentIds]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-xl overflow-hidden shadow-2xl border border-[#9c7247] bg-[#fbf7ee]"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 50px -12px rgba(28, 16, 7, 0.65)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#cca77d]/40 bg-[#ebdcc2]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#82542a]" />
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#442c16]">
              Vintage Sticker & Ephemera Library
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#dfcaa9] text-[#593b1e] font-mono">
              {STICKER_CATALOG.length} stickers
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#dfcaa9] text-[#593b1e] transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories Bar */}
        <div className="p-4 border-b border-[#cca77d]/30 bg-[#f4ebdb]/70 space-y-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a6a4b]" />
            <input
              type="text"
              placeholder="Search 80+ stickers by name or keyword (rose, stamp, washi, star, Paris, key)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#fffdfa] border border-[#cca77d] text-[#3d2716] text-xs sm:text-sm font-serif placeholder:text-[#9e8369] focus:outline-none focus:ring-2 focus:ring-[#82542a]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a6a4b] hover:text-[#442c16]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {CATEGORY_TABS.map(tab => {
              const isCurrent = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-serif font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#82542a] text-white shadow-xs font-bold'
                      : 'bg-[#ebdcc2] text-[#543b24] hover:bg-[#dfcaa9]'
                  }`}
                >
                  {tab.id === 'favorites' && '★ '}
                  {tab.id === 'recent' && '⏱ '}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stickers Grid */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto">
          {filteredStickers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-[#78593a]">
              <Sparkles className="w-8 h-8 opacity-40 mb-2" />
              <p className="font-serif text-sm font-semibold">No stickers match your criteria</p>
              <p className="text-xs mt-1 text-[#967657]">Try clearing your search or switching categories</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {filteredStickers.map((sticker) => {
                const isFav = favoriteIds.includes(sticker.id);
                return (
                  <div
                    key={sticker.id}
                    onClick={() => handleSelect(sticker)}
                    className="group relative flex flex-col items-center justify-between p-2.5 rounded-lg border border-[#cca77d]/50 bg-[#fffdfa] hover:bg-[#faf4e6] hover:border-[#82542a] hover:shadow-md transition-all cursor-pointer select-none"
                    title={`Add "${sticker.name}" to diary page`}
                  >
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(sticker.id, e)}
                      className={`absolute top-1 right-1 p-1 rounded-full transition-opacity ${
                        isFav ? 'text-[#c44d4d] opacity-100' : 'text-[#a68668] opacity-0 group-hover:opacity-100 hover:text-[#c44d4d]'
                      }`}
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-[#c44d4d]' : ''}`} />
                    </button>

                    {/* SVG Preview Container */}
                    <div 
                      className="w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center p-1 drop-shadow-xs group-hover:scale-105 transition-transform"
                      dangerouslySetInnerHTML={{ __html: sticker.svg }}
                    />

                    {/* Sticker Label */}
                    <span className="mt-1.5 text-[10px] font-serif text-[#543b24] text-center line-clamp-1 w-full font-medium">
                      {sticker.name}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 bg-[#ebdcc2]/60 border-t border-[#cca77d]/40 flex items-center justify-between text-xs text-[#78593a] font-serif">
          <span>Click any sticker to instantly place it on your current diary page</span>
          <span className="font-mono text-[10px] opacity-75">{filteredStickers.length} available</span>
        </div>
      </div>
    </div>
  );
};
