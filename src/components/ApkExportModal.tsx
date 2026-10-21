import React, { useState } from 'react';
import { X, Download, Smartphone, ExternalLink, CheckCircle2, Copy, Sparkles, ShieldCheck, Check, ArrowRight, FileCheck } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall.ts';

interface ApkExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkExportModal: React.FC<ApkExportModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, install } = usePWAInstall();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'download' | 'uptodown' | 'copydata'>('download');

  if (!isOpen) return null;

  const handleCopy = (text: string, fieldName: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-purple-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-gradient-to-b from-purple-900 via-indigo-950 to-slate-950 border-2 border-pink-400/40 rounded-3xl p-5 sm:p-6 text-white shadow-2xl relative max-h-[92vh] overflow-y-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 pr-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30 shrink-0">
            <Download className="w-6 h-6 text-emerald-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                Download APK File
              </h3>
              <span className="text-[10px] font-black bg-emerald-400 text-emerald-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Ready to Upload
              </span>
            </div>
            <p className="text-xs text-pink-200 mt-0.5 font-hindi">
              Uptodown पर अपलोड करने के लिए तैयार APK फ़ाइल
            </p>
          </div>
        </div>

        {/* PRIMARY ACTION CARD: DIRECT APK DOWNLOAD */}
        <div className="bg-gradient-to-br from-emerald-500/25 via-teal-500/20 to-purple-800/40 border-2 border-emerald-400/60 rounded-3xl p-4 sm:p-5 mb-5 shadow-xl text-center relative overflow-hidden">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-400/20 border border-emerald-300/40 flex items-center justify-center mb-2.5">
              <FileCheck className="w-8 h-8 text-emerald-300" />
            </div>

            <h4 className="text-lg sm:text-xl font-black text-white mb-1">
              haffu-quiz-game.apk
            </h4>

            <div className="flex items-center gap-2 text-xs text-emerald-200 mb-3.5">
              <span className="bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-400/30 font-mono font-bold">
                890 KB
              </span>
              <span>•</span>
              <span className="font-semibold">Version 1.0.0</span>
              <span>•</span>
              <span className="text-yellow-300 font-bold">Signed APK ✅</span>
            </div>

            {/* Direct Download Button */}
            <a
              href="/haffu-quiz-game.apk"
              download="haffu-quiz-game.apk"
              className="w-full min-h-[52px] rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 text-teal-950 font-black text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/40 transition-transform active:scale-95 border border-white/40"
            >
              <Download className="w-5 h-5" />
              <span>Download APK Now (890 KB)</span>
            </a>

            <p className="text-[11px] text-purple-200 mt-2 font-medium">
              Click above to directly save the <code>.apk</code> installer file to your device!
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex rounded-2xl bg-white/10 p-1 mb-4">
          <button
            onClick={() => setActiveTab('download')}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'download'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-purple-200 hover:text-white'
            }`}
          >
            ⭐ How to Upload
          </button>
          <button
            onClick={() => setActiveTab('copydata')}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'copydata'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-purple-200 hover:text-white'
            }`}
          >
            📋 App Details
          </button>
          <button
            onClick={() => setActiveTab('uptodown')}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'uptodown'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-purple-200 hover:text-white'
            }`}
          >
            🌐 Uptodown Portal
          </button>
        </div>

        {/* TAB 1: HOW TO UPLOAD TO UPTODOWN */}
        {activeTab === 'download' && (
          <div className="space-y-3">
            <div className="bg-white/10 border border-white/15 rounded-2xl p-3.5 space-y-2.5 text-xs">
              <h5 className="font-extrabold text-white text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>3 Simple Steps to Publish:</span>
              </h5>

              <div className="space-y-2 text-purple-100 pl-1">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-emerald-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-white">Download the APK:</strong> Tap the green download button above to get <code>haffu-quiz-game.apk</code>.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-emerald-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-white">Sign up on Uptodown:</strong> Open{' '}
                    <a
                      href="https://developers.uptodown.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-300 underline font-bold"
                    >
                      developers.uptodown.com
                    </a>{' '}
                    (it's free, no fee!).
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-emerald-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-white">Click "Add Application":</strong> Drag and drop your downloaded <code>haffu-quiz-game.apk</code>, paste the app details from the next tab, and click <strong>Submit</strong>!
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Phone Install Button */}
            {isInstallable && (
              <div className="bg-pink-900/30 border border-pink-400/30 rounded-2xl p-3 flex items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-extrabold text-white block">Also want it on this device?</span>
                  <span className="text-[11px] text-pink-200">Installs directly to your home screen</span>
                </div>
                <button
                  onClick={install}
                  className="px-3.5 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-white font-black text-xs shadow active:scale-95 transition-all shrink-0"
                >
                  Install App
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: COPY DETAILS FOR UPTODOWN FORM */}
        {activeTab === 'copydata' && (
          <div className="space-y-3 text-xs">
            <p className="text-purple-200 text-xs">
              Copy-paste these exact details into the Uptodown publishing form:
            </p>

            {/* Field: App Title */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5">
              <div className="flex items-center justify-between text-purple-300 text-[11px] mb-1">
                <span className="font-bold">App Title / नाम</span>
                <button
                  onClick={() => handleCopy('Haffu Quiz Game', 'title')}
                  className="flex items-center gap-1 text-pink-300 hover:text-white"
                >
                  {copiedField === 'title' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'title' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <p className="font-mono text-white font-bold bg-black/30 p-2 rounded-xl text-xs">
                Haffu Quiz Game
              </p>
            </div>

            {/* Field: Short Description */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5">
              <div className="flex items-center justify-between text-purple-300 text-[11px] mb-1">
                <span className="font-bold">Short Description / विवरण</span>
                <button
                  onClick={() => handleCopy('Fun bilingual English and Hindi quiz game for kids featuring animals, birds, fruits, and vehicles with speech pronunciation and stars reward system.', 'desc')}
                  className="flex items-center gap-1 text-pink-300 hover:text-white"
                >
                  {copiedField === 'desc' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'desc' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-purple-100 bg-black/30 p-2 rounded-xl text-[11px] leading-relaxed">
                Fun bilingual English and Hindi quiz game for kids featuring animals, birds, fruits, and vehicles with speech pronunciation and stars reward system.
              </p>
            </div>

            {/* Field: Package Name & Version */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5">
                <div className="flex items-center justify-between text-purple-300 mb-1">
                  <span className="font-bold">Package Name</span>
                  <button onClick={() => handleCopy('com.haffu.quizgame', 'pkg')} className="text-pink-300 hover:text-white">
                    {copiedField === 'pkg' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <code className="text-white font-mono block">com.haffu.quizgame</code>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5">
                <span className="font-bold text-purple-300 block mb-1">Category</span>
                <span className="text-white font-bold block">Games &gt; Trivia / Kids</span>
              </div>
            </div>

            {/* Download Icon */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <img src="/pwa-512x512.png" alt="Icon" className="w-10 h-10 rounded-xl shadow" />
                <div>
                  <span className="font-bold text-white block">Uptodown App Icon (512x512)</span>
                  <span className="text-[10px] text-purple-300">Required image upload</span>
                </div>
              </div>
              <a
                href="/pwa-512x512.png"
                download="haffu-quiz-icon-512.png"
                className="px-3 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-white font-bold text-xs flex items-center gap-1 shadow active:scale-95 transition-all shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Icon</span>
              </a>
            </div>
          </div>
        )}

        {/* TAB 3: UPTODOWN PORTAL LINK */}
        {activeTab === 'uptodown' && (
          <div className="space-y-3 text-xs leading-relaxed">
            <div className="bg-white/10 border border-white/15 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-yellow-300 font-extrabold text-sm">
                <ShieldCheck className="w-5 h-5 text-yellow-300" />
                <span>Uptodown Developers Console</span>
              </div>
              <p className="text-purple-200">
                Uptodown is one of the world's largest independent Android app stores:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-purple-100 pl-1">
                <li>100% free developer registration (no fee!)</li>
                <li>Fast review and publishing (24 to 48 hours)</li>
                <li>Direct APK distribution to millions of users worldwide</li>
              </ul>
              <div className="pt-2">
                <a
                  href="https://developers.uptodown.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[46px] rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40 active:scale-95 transition-all"
                >
                  <span>Open developers.uptodown.com</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-purple-300">
          <span>Haffu Quiz Game • v1.0.0 (APK 890 KB)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
