import React, { useState, useEffect } from 'react';
import { Play, BookOpen, Sparkles, Volume2, VolumeX, Star, Award, RotateCcw, ChevronRight } from 'lucide-react';
import { CATEGORIES, CategoryType, ITEMS } from './data/items.ts';
import { Header } from './components/Header.tsx';
import { QuizView } from './components/QuizView.tsx';
import { ExploreView } from './components/ExploreView.tsx';
import { MascotHaffu } from './components/MascotHaffu.tsx';
import { ApkExportModal } from './components/ApkExportModal.tsx';
import { getSoundEnabled, setSoundEnabled, playPopSound, playStarSound } from './utils/audio.ts';

type AppScreen = 'home' | 'quiz' | 'explore';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [showApkModal, setShowApkModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [questionCount, setQuestionCount] = useState<number>(15);
  const [stars, setStars] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('haffu_total_stars');
      return saved ? parseInt(saved, 10) || 0 : 12; // Start with 12 welcome stars!
    }
    return 12;
  });
  const [soundOn, setSoundOn] = useState<boolean>(() => getSoundEnabled());
  const [voicePref, setVoicePref] = useState<'both' | 'en' | 'hi'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('haffu_voice_pref');
      if (saved === 'en' || saved === 'hi' || saved === 'both') return saved;
    }
    return 'both';
  });

  // Check URL parameters for autostart
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        setCurrentScreen('quiz');
      }
    }
  }, []);

  // Persist stars
  const addStars = (newStars: number) => {
    setStars(prev => {
      const updated = prev + newStars;
      if (typeof window !== 'undefined') {
        localStorage.setItem('haffu_total_stars', updated.toString());
      }
      return updated;
    });
  };

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const handleChangeVoicePref = (pref: 'both' | 'en' | 'hi') => {
    setVoicePref(pref);
    if (typeof window !== 'undefined') {
      localStorage.setItem('haffu_voice_pref', pref);
    }
    playPopSound();
  };

  const startQuiz = (cat: CategoryType | 'all' = selectedCategory) => {
    playPopSound();
    setSelectedCategory(cat);
    setCurrentScreen('quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-fuchsia-800 to-pink-700 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      {/* Animated background bubbles/stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-pink-400 blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-purple-400 blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-yellow-300 blur-3xl animate-float-slow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Persistent Header */}
      <Header
        title={
          currentScreen === 'quiz'
            ? 'Quiz Time'
            : currentScreen === 'explore'
            ? 'Explore & Learn'
            : undefined
        }
        hindiTitle={
          currentScreen === 'quiz'
            ? 'क्विज़ का समय'
            : currentScreen === 'explore'
            ? 'सीखें और जानें'
            : undefined
        }
        showBack={currentScreen !== 'home'}
        onBack={() => {
          playPopSound();
          setCurrentScreen('home');
        }}
        stars={stars}
        soundEnabled={soundOn}
        onToggleSound={handleToggleSound}
        voicePref={voicePref}
        onChangeVoicePref={handleChangeVoicePref}
        onOpenApkModal={() => {
          playPopSound();
          setShowApkModal(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start py-4 relative z-10">
        {currentScreen === 'home' && (
          <div className="w-full max-w-md px-4 flex flex-col items-center animate-fade-in pb-12">
            {/* Mascot Banner */}
            <div className="flex flex-col items-center text-center mt-2 mb-5">
              <div className="relative mb-2">
                <MascotHaffu size="lg" mood="celebrate" className="animate-gentle-bounce" />
                <div className="absolute -top-1 -right-1 bg-yellow-400 text-amber-950 font-black text-xs px-2.5 py-0.5 rounded-full shadow-md animate-pulse">
                  Kids Fun! ✨
                </div>
              </div>

              {/* Title Lockup */}
              <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-200 to-white drop-shadow-sm tracking-tight leading-tight">
                Haffu Quiz Game
              </h1>
              <h2 className="text-xl sm:text-2xl font-black text-yellow-300 font-hindi mt-0.5 drop-shadow-sm">
                हाफू क्विज़ गेम
              </h2>
              <p className="text-xs text-pink-200 mt-1 max-w-xs leading-relaxed">
                Learn Animals, Birds, Fruits & Vehicles in English & Hindi! 🌟
              </p>
            </div>

            {/* Stars & Progress Summary Card */}
            <div className="w-full bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl p-3.5 mb-5 shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-amber-950 shadow-md">
                  <Star className="w-6 h-6 fill-amber-950" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-pink-200 block">
                    Your Stars Bank
                  </span>
                  <span className="text-xl font-black text-white leading-none">
                    {stars} <span className="text-xs font-semibold text-yellow-300">Stars ⭐</span>
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-purple-200 block">Vocabulary</span>
                <span className="text-sm font-extrabold text-white">{ITEMS.length} Items</span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="w-full flex flex-col gap-3.5 mb-6">
              {/* 1. PLAY QUIZ BUTTON */}
              <button
                onClick={() => startQuiz('all')}
                className="group relative w-full min-h-[72px] rounded-3xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-teal-950 font-black p-4 shadow-xl shadow-teal-900/30 flex items-center justify-between transition-transform duration-200 active:scale-98 border-2 border-white/30"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-white/90 flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
                    🎯
                  </div>
                  <div className="text-left">
                    <span className="block text-lg sm:text-xl font-black leading-tight text-teal-950">
                      Play Quiz
                    </span>
                    <span className="block text-sm font-bold font-hindi text-teal-900 leading-tight">
                      क्विज़ खेलें (15 प्रश्न)
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-teal-900/15 flex items-center justify-center text-teal-950">
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              {/* 2. EXPLORE & LEARN BUTTON */}
              <button
                onClick={() => {
                  playPopSound();
                  setCurrentScreen('explore');
                }}
                className="group relative w-full min-h-[68px] rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 hover:from-amber-300 hover:to-pink-400 text-amber-950 font-black p-4 shadow-xl shadow-orange-900/25 flex items-center justify-between transition-transform duration-200 active:scale-98 border-2 border-white/30"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-white/90 flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
                    📖
                  </div>
                  <div className="text-left">
                    <span className="block text-lg sm:text-xl font-black leading-tight text-amber-950">
                      Explore & Learn
                    </span>
                    <span className="block text-sm font-bold font-hindi text-amber-900 leading-tight">
                      सीखें और जानें (फ्लैशकार्ड्स)
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-950/15 flex items-center justify-center text-amber-950">
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              {/* 3. ANDROID APK / UPTODOWN BUTTON */}
              <button
                onClick={() => {
                  playPopSound();
                  setShowApkModal(true);
                }}
                className="group relative w-full min-h-[64px] rounded-3xl bg-gradient-to-r from-purple-800/90 via-fuchsia-800/90 to-pink-700/90 hover:from-purple-750 hover:to-pink-650 text-white font-black p-3.5 shadow-xl shadow-purple-950/40 flex items-center justify-between transition-transform duration-200 active:scale-98 border-2 border-pink-400/40 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                    📱
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="block text-base font-black leading-tight text-white">
                        Android APK &amp; Uptodown
                      </span>
                      <span className="text-[10px] bg-emerald-400 text-emerald-950 font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                        Publish
                      </span>
                    </div>
                    <span className="block text-xs font-bold text-pink-200 font-hindi leading-tight mt-0.5">
                      एपीके डाउनलोड और गाइड (Uptodown)
                    </span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-pink-200 group-hover:text-white">
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </div>

            {/* Quick Play By Category Grid */}
            <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/15">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-extrabold tracking-wide text-pink-200">
                    Choose Category
                  </span>
                  <span className="text-xs font-bold text-pink-300 font-hindi">
                    / श्रेणी चुनें
                  </span>
                </div>
                <span className="text-xs text-yellow-300 font-hindi">4 श्रेणियां</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {CATEGORIES.map(cat => {
                  const count = ITEMS.filter(i => i.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => startQuiz(cat.id)}
                      className="min-h-[58px] p-2.5 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-left flex items-center gap-2.5 border border-white/10 group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {cat.icon}
                      </span>
                      <div className="truncate">
                        <span className="block text-xs sm:text-sm font-bold text-white truncate">
                          {cat.labelEn}
                        </span>
                        <span className="block text-[11px] font-hindi text-pink-200 truncate">
                          {cat.labelHi} ({count})
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Question Count Selector */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10 text-xs">
                <span className="text-purple-200 font-medium">Questions per quiz:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuestionCount(15)}
                    className={`px-3 py-1 rounded-xl font-bold transition-all ${
                      questionCount === 15
                        ? 'bg-yellow-400 text-amber-950 shadow-sm'
                        : 'bg-white/15 text-white hover:bg-white/25'
                    }`}
                  >
                    15
                  </button>
                  <button
                    onClick={() => setQuestionCount(20)}
                    className={`px-3 py-1 rounded-xl font-bold transition-all ${
                      questionCount === 20
                        ? 'bg-yellow-400 text-amber-950 shadow-sm'
                        : 'bg-white/15 text-white hover:bg-white/25'
                    }`}
                  >
                    20
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Copyright and Safe Tag */}
            <p className="text-[11px] text-purple-300/70 text-center mt-6">
              Safe & ad-free educational fun for kids · Haffu Quiz Game
            </p>
          </div>
        )}

        {currentScreen === 'quiz' && (
          <QuizView
            category={selectedCategory}
            questionCount={questionCount}
            onExit={() => {
              playPopSound();
              setCurrentScreen('home');
            }}
            onAddStars={addStars}
            onExplore={() => {
              playPopSound();
              setCurrentScreen('explore');
            }}
            voicePref={voicePref}
          />
        )}

        {currentScreen === 'explore' && (
          <ExploreView
            onBack={() => {
              playPopSound();
              setCurrentScreen('home');
            }}
            voicePref={voicePref}
          />
        )}
      </main>

      {/* Android APK & Uptodown Export Hub Modal */}
      <ApkExportModal
        isOpen={showApkModal}
        onClose={() => setShowApkModal(false)}
      />
    </div>
  );
}
