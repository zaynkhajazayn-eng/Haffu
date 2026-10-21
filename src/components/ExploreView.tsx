import React, { useState } from 'react';
import { Search, Volume2, X, Sparkles, Filter, Star } from 'lucide-react';
import { ITEMS, CATEGORIES, QuizItem, CategoryType } from '../data/items.ts';
import { speakBilingual, playPopSound } from '../utils/audio.ts';
import { ItemImage } from './ItemImage.tsx';

interface ExploreViewProps {
  onBack: () => void;
  voicePref: 'both' | 'en' | 'hi';
}

export const ExploreView: React.FC<ExploreViewProps> = ({ onBack, voicePref }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItem, setActiveItem] = useState<QuizItem | null>(null);

  const filteredItems = ITEMS.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q || item.english.toLowerCase().includes(q) || item.hindi.includes(q);
    return matchesCat && matchesSearch;
  });

  const handleSpeak = (item: QuizItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playPopSound();
    speakBilingual(item.english, item.hindi, voicePref);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 text-white">
      {/* Category tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-3">
        <button
          onClick={() => { setSelectedCategory('all'); playPopSound(); }}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all min-h-[44px] flex items-center gap-1.5 shadow-sm ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-pink-500/30'
              : 'bg-white/15 text-purple-100 hover:bg-white/25'
          }`}
        >
          <span>🌟</span>
          <span>All ({ITEMS.length})</span>
        </button>

        {CATEGORIES.map(cat => {
          const count = ITEMS.filter(i => i.category === cat.id).length;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); playPopSound(); }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all min-h-[44px] flex items-center gap-1.5 shadow-sm ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-pink-500/30'
                  : 'bg-white/15 text-purple-100 hover:bg-white/25'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.labelEn} ({count})</span>
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search items (e.g. Lion, Apple, कार)..."
          className="w-full min-h-[46px] pl-10 pr-10 rounded-2xl bg-white/15 text-white placeholder-purple-200/60 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 backdrop-blur-md"
        />
        <Search className="w-4 h-4 text-purple-200 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-purple-200 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {filteredItems.map(item => {
          return (
            <div
              key={item.id}
              onClick={() => {
                setActiveItem(item);
                handleSpeak(item);
              }}
              className="group bg-white rounded-3xl p-3 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col items-center border-2 border-transparent hover:border-pink-300 relative overflow-hidden active:scale-[0.98]"
            >
              {/* Image Frame */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden mb-2 relative flex items-center justify-center">
                <ItemImage key={item.id} item={item} alt={item.english} />

                {/* Speaker pill overlay */}
                <button
                  onClick={(e) => handleSpeak(item, e)}
                  aria-label={`Pronounce ${item.english}`}
                  className="absolute bottom-1.5 right-1.5 p-2 rounded-xl bg-purple-900/80 hover:bg-pink-600 text-white backdrop-blur-sm shadow transition-colors active:scale-90"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Text */}
              <div className="w-full text-center">
                <h4 className="text-sm font-extrabold text-slate-800 truncate">
                  {item.english}
                </h4>
                <p className="text-xs font-bold text-pink-600 font-hindi truncate">
                  {item.hindi}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-purple-200">
          <p className="text-3xl mb-2">🔍</p>
          <p className="text-base font-bold">No items found</p>
          <p className="text-xs text-purple-300/80 font-hindi">कोई चीज़ नहीं मिली</p>
        </div>
      )}

      {/* DETAIL MODAL FOR EXPLORING ITEM */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="w-full max-w-sm bg-gradient-to-b from-purple-900 to-indigo-950 border-2 border-pink-400/40 rounded-3xl p-5 text-center text-white shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              aria-label="Close details"
              className="absolute top-4 right-4 min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Big image */}
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 relative flex items-center justify-center shadow-lg border border-white/10">
              <ItemImage key={activeItem.id} item={activeItem} alt={activeItem.english} showEmojiInCorner={true} />
            </div>

            <div className="mb-3">
              <h3 className="text-2xl font-black text-white">{activeItem.english}</h3>
              <p className="text-xl font-bold text-yellow-300 font-hindi">{activeItem.hindi}</p>
            </div>

            {/* Fun fact */}
            {activeItem.fact && (
              <div className="bg-white/10 rounded-2xl p-3 mb-4 text-xs border border-white/10 text-left">
                <div className="flex items-center gap-1.5 text-pink-300 font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Fun Fact / रोचक तथ्य:</span>
                </div>
                <p className="text-purple-100 font-medium">{activeItem.fact.english}</p>
                <p className="text-yellow-200/90 font-hindi mt-0.5">{activeItem.fact.hindi}</p>
              </div>
            )}

            {/* Speak audio action */}
            <button
              onClick={() => handleSpeak(activeItem)}
              className="w-full min-h-[48px] rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-600/30 transition-transform active:scale-95"
            >
              <Volume2 className="w-5 h-5" />
              Listen Pronunciation / उच्चारण सुनें
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
