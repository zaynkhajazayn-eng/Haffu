import React from 'react';
import { Volume2, VolumeX, ArrowLeft, Star, Smartphone } from 'lucide-react';

interface HeaderProps {
  title?: string;
  hindiTitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  stars: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  voicePref: 'both' | 'en' | 'hi';
  onChangeVoicePref?: (pref: 'both' | 'en' | 'hi') => void;
  onOpenApkModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  hindiTitle,
  showBack = false,
  onBack,
  stars,
  soundEnabled,
  onToggleSound,
  voicePref,
  onChangeVoicePref,
  onOpenApkModal,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full px-4 py-3 bg-purple-900/40 backdrop-blur-md border-b border-white/10 shadow-sm transition-all">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Left: Back button or Mascot mini */}
        <div className="flex items-center gap-2">
          {showBack && onBack ? (
            <button
              onClick={onBack}
              aria-label="Back to home"
              className="min-h-[44px] min-w-[44px] p-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all active:scale-95 shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-2xl" role="img" aria-label="lion">🦁</span>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold uppercase tracking-wider text-pink-200">Haffu</span>
                <span className="text-[10px] text-purple-200 font-hindi">हाफू</span>
              </div>
            </div>
          )}

          {title && (
            <div className="flex flex-col ml-1">
              <span className="text-sm font-bold text-white tracking-tight leading-tight">{title}</span>
              {hindiTitle && (
                <span className="text-xs text-pink-200 font-hindi leading-tight">{hindiTitle}</span>
              )}
            </div>
          )}
        </div>

        {/* Right: APK Export, Audio Toggle, Language cycle, and Stars Counter */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* APK & Uptodown Trigger */}
          {onOpenApkModal && (
            <button
              onClick={onOpenApkModal}
              aria-label="Export APK for Uptodown"
              title="Android APK / Uptodown Publishing"
              className="min-h-[44px] px-2.5 py-1 rounded-2xl bg-gradient-to-r from-emerald-500/80 to-teal-600/80 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black flex items-center gap-1 transition-all active:scale-95 border border-emerald-300/40 shadow-sm"
            >
              <Smartphone className="w-3.5 h-3.5 text-yellow-300" />
              <span className="text-[11px] font-black tracking-wide">APK</span>
            </button>
          )}

          {/* Voice Mode Cycle */}
          {onChangeVoicePref && (
            <button
              onClick={() => {
                const next: Record<'both' | 'en' | 'hi', 'both' | 'en' | 'hi'> = {
                  both: 'en',
                  en: 'hi',
                  hi: 'both',
                };
                onChangeVoicePref(next[voicePref]);
              }}
              aria-label={`Current voice: ${voicePref}. Tap to switch`}
              title="Change speech language"
              className="min-h-[44px] px-2.5 py-1 rounded-2xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 border border-white/10"
            >
              <span className="text-[11px] font-black tracking-wide">
                {voicePref === 'both' ? 'EN + HI' : voicePref === 'en' ? 'EN' : 'HI'}
              </span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
            className="min-h-[44px] min-w-[44px] p-2 rounded-2xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all active:scale-95 border border-white/10"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-pink-200" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-300" />
            )}
          </button>

          {/* Stars Counter Pill */}
          <div
            className="min-h-[44px] px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 font-extrabold text-sm flex items-center gap-1.5 shadow-md shadow-amber-500/30 select-none animate-pulse-subtle"
            title="Total stars earned"
          >
            <Star className="w-4 h-4 fill-amber-950 text-amber-950" />
            <span className="tabular-nums font-black text-sm">{stars}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
