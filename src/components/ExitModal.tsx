import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface ExitModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ExitModal: React.FC<ExitModalProps> = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xs bg-gradient-to-b from-purple-800 to-indigo-900 border-2 border-pink-400/40 rounded-3xl p-6 text-center text-white shadow-2xl relative overflow-hidden">
        {/* Decorative corner stars */}
        <div className="absolute top-3 right-3 text-pink-300 opacity-60">
          <Sparkles className="w-5 h-5" />
        </div>

        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-pink-500/20 border border-pink-400/50 flex items-center justify-center text-3xl">
          🦁
        </div>

        <h3 className="text-xl font-extrabold text-white mb-1">
          Leave Quiz?
        </h3>
        <p className="text-pink-200 font-hindi text-base mb-2">
          क्या आप क्विज़ छोड़ना चाहते हैं?
        </p>
        <p className="text-xs text-purple-200/90 mb-5">
          Don't worry, your stars won't be lost!
        </p>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={onCancel}
            className="w-full min-h-[46px] rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-teal-950 font-bold text-sm shadow-md shadow-emerald-900/30 transition-transform active:scale-95"
          >
            Stay & Play / खेलते रहो 🌟
          </button>
          <button
            onClick={onConfirm}
            className="w-full min-h-[44px] rounded-2xl bg-white/10 hover:bg-white/20 text-pink-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <X className="w-4 h-4" />
            Quit to Home / बाहर जाएं
          </button>
        </div>
      </div>
    </div>
  );
};
