import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, Star, CheckCircle2, RotateCcw, Home, Sparkles, BookOpen, AlertCircle, X } from 'lucide-react';
import { QuizItem, CategoryType } from '../data/items.ts';
import { generateQuizQuestions, QuizQuestion, calculateScoreAndStars } from '../utils/quiz.ts';
import { speakBilingual, playPopSound, playSuccessChime, playGentleOopsSound, playStarSound, playVictoryFanfare } from '../utils/audio.ts';
import { Confetti } from './Confetti.tsx';
import { ExitModal } from './ExitModal.tsx';
import { MascotHaffu } from './MascotHaffu.tsx';
import { ItemImage } from './ItemImage.tsx';

interface QuizViewProps {
  category: CategoryType | 'all';
  questionCount?: number;
  onExit: () => void;
  onAddStars: (stars: number) => void;
  onExplore: () => void;
  voicePref: 'both' | 'en' | 'hi';
}

export const QuizView: React.FC<QuizViewProps> = ({
  category,
  questionCount = 15,
  onExit,
  onAddStars,
  onExplore,
  voicePref,
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [wrongOptionIds, setWrongOptionIds] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Initialize questions
  const initQuiz = useCallback(() => {
    const generated = generateQuizQuestions(undefined, questionCount, category);
    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerCorrect(null);
    setWrongOptionIds([]);
    setCorrectCount(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setIsQuizFinished(false);
    setShowConfetti(false);
  }, [category, questionCount]);

  useEffect(() => {
    initQuiz();
  }, [initQuiz]);

  const currentQ = questions[currentIndex];

  // Auto-speak question on new card
  const speakCurrentQuestion = useCallback(() => {
    if (!currentQ) return;
    setIsSpeaking(true);
    speakBilingual(
      `Find the ${currentQ.targetItem.english}`,
      `${currentQ.targetItem.hindi} कहाँ है?`,
      voicePref
    );
    setTimeout(() => setIsSpeaking(false), 2200);
  }, [currentQ, voicePref]);

  useEffect(() => {
    if (currentQ && !isQuizFinished) {
      // Short delay before auto speaking
      const timer = setTimeout(() => {
        speakCurrentQuestion();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentQ, isQuizFinished, speakCurrentQuestion]);

  const handleOptionClick = (option: QuizItem) => {
    if (!currentQ || isAnswerCorrect === true) return;
    if (wrongOptionIds.includes(option.id)) return; // already tapped and incorrect

    setSelectedOptionId(option.id);

    if (option.id === currentQ.targetItem.id) {
      // CORRECT!
      setIsAnswerCorrect(true);
      playSuccessChime();
      playStarSound();
      setShowConfetti(true);

      const nextStreak = currentStreak + 1;
      setCurrentStreak(nextStreak);
      setMaxStreak(prev => Math.max(prev, nextStreak));
      setCorrectCount(prev => prev + 1);

      // Award 3 stars immediately for positive reinforcement
      onAddStars(3);

      // Speak pronunciation reward
      speakBilingual(
        `Great! It's a ${option.english}!`,
        `शाबाश! यह ${option.hindi} है!`,
        voicePref
      );

      // Wait 1.4s then advance to next question
      setTimeout(() => {
        setShowConfetti(false);
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex(prev => prev + 1);
          setSelectedOptionId(null);
          setIsAnswerCorrect(null);
          setWrongOptionIds([]);
        } else {
          // Quiz complete!
          setIsQuizFinished(true);
          playVictoryFanfare();
        }
      }, 1400);
    } else {
      // INCORRECT!
      playGentleOopsSound();
      setCurrentStreak(0);
      setWrongOptionIds(prev => [...prev, option.id]);

      // Friendly spoken encouraging hint
      speakBilingual(
        `That is a ${option.english}. Try again!`,
        `यह ${option.hindi} है। फिर से कोशिश करो!`,
        voicePref
      );
    }
  };

  if (!currentQ && !isQuizFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
        <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-base font-semibold">Preparing fun questions...</p>
      </div>
    );
  }

  // QUIZ FINISHED SCREEN
  if (isQuizFinished) {
    const summary = calculateScoreAndStars(correctCount, questions.length, maxStreak);

    return (
      <div className="w-full max-w-md mx-auto p-4 flex flex-col items-center justify-center min-h-[85vh] text-white animate-fade-in">
        <Confetti active={true} duration={4000} />

        <div className="w-full bg-gradient-to-b from-purple-800/90 to-indigo-900/95 border-2 border-pink-400/30 rounded-3xl p-6 shadow-2xl text-center relative overflow-hidden backdrop-blur-md">
          {/* Top celebration icon */}
          <div className="mb-2">
            <MascotHaffu size="lg" mood="celebrate" className="animate-gentle-bounce" />
          </div>

          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-200">
            {summary.badge}!
          </h2>
          <p className="text-xl font-bold font-hindi text-yellow-300 mb-4">
            {summary.badgeHi}
          </p>

          {/* Stars card */}
          <div className="bg-white/10 rounded-2xl p-4 mb-5 border border-white/15">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-8 h-8 fill-yellow-400 text-yellow-400 animate-spin-slow" />
              <span className="text-3xl font-black text-yellow-300">
                +{summary.starsAwarded}
              </span>
              <span className="text-sm font-bold uppercase tracking-wider text-pink-200">Stars</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center pt-2 border-t border-white/10 text-xs">
              <div>
                <span className="text-purple-200 block">Correct Answers</span>
                <span className="text-lg font-bold text-white">{correctCount} / {questions.length}</span>
              </div>
              <div>
                <span className="text-purple-200 block">Best Streak</span>
                <span className="text-lg font-bold text-emerald-300">{maxStreak} 🔥</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={initQuiz}
              className="w-full min-h-[48px] rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-extrabold text-base shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again / फिर से खेलें
            </button>

            <button
              onClick={onExplore}
              className="w-full min-h-[44px] rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/10"
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              Explore All Cards / सब देखें
            </button>

            <button
              onClick={onExit}
              className="w-full min-h-[44px] rounded-2xl bg-white/10 hover:bg-white/20 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to Home / होम पर जाएं
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE QUIZ QUESTION SCREEN
  const progressPercent = Math.round(((currentIndex) / questions.length) * 100);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-3 flex flex-col min-h-[88vh] justify-between text-white">
      <Confetti active={showConfetti} duration={2500} />
      <ExitModal
        isOpen={showExitConfirm}
        onCancel={() => setShowExitConfirm(false)}
        onConfirm={() => {
          setShowExitConfirm(false);
          onExit();
        }}
      />

      {/* Top status bar: Question count, Progress Bar, Exit Button */}
      <div className="w-full mb-3">
        <div className="flex items-center justify-between text-xs font-bold text-purple-200 mb-1.5">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="min-h-[44px] px-3 py-1 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5"
            aria-label="Exit Quiz"
          >
            <X className="w-3.5 h-3.5 text-pink-300" />
            <span>Exit</span>
          </button>

          <span className="px-3 py-1 rounded-full bg-purple-900/60 border border-purple-400/20 text-pink-200">
            Question {currentIndex + 1} of {questions.length}
          </span>

          <div className="flex items-center gap-1 text-yellow-300 font-extrabold">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>+{correctCount * 3}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-purple-950/60 rounded-full overflow-hidden border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-pink-400 via-yellow-400 to-emerald-400 transition-all duration-300 rounded-full"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>
      </div>

      {/* Question Prompt Card */}
      <div className="w-full bg-gradient-to-r from-purple-800/80 to-pink-800/80 border border-white/20 rounded-3xl p-4 shadow-xl backdrop-blur-md mb-4 flex items-center justify-between gap-3">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wider text-pink-300 font-bold mb-0.5">
            Can you find?
          </p>
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {currentQ.questionEn}
          </h2>
          <p className="text-base sm:text-lg font-bold text-yellow-300 font-hindi leading-tight mt-0.5">
            {currentQ.questionHi}
          </p>
        </div>

        {/* Pronunciation Speaker Button */}
        <button
          onClick={speakCurrentQuestion}
          aria-label="Listen to question pronunciation"
          className={`min-h-[52px] min-w-[52px] rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-pink-500/30 transition-transform active:scale-95 ${
            isSpeaking ? 'ring-4 ring-yellow-400 animate-pulse' : 'hover:scale-105'
          }`}
        >
          <Volume2 className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* 4 Picture Options Grid (2x2) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 my-auto w-full">
        {currentQ.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = isSelected && isAnswerCorrect === true;
          const isWrong = wrongOptionIds.includes(option.id);

          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              disabled={isCorrect || isWrong}
              aria-label={`Select option ${option.english} (${option.hindi})`}
              className={`group relative flex flex-col items-center bg-white rounded-3xl p-2.5 sm:p-3 shadow-lg transition-all duration-200 text-left overflow-hidden select-none active:scale-[0.98] ${
                isCorrect
                  ? 'ring-4 ring-emerald-500 bg-emerald-50 scale-102 shadow-emerald-500/40'
                  : isWrong
                  ? 'opacity-40 grayscale pointer-events-none ring-2 ring-red-400 bg-red-50'
                  : 'hover:shadow-2xl hover:-translate-y-0.5 border-2 border-transparent hover:border-pink-300'
              }`}
            >
              {/* Image Frame */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden relative mb-2 flex items-center justify-center">
                <ItemImage key={option.id} item={option} alt={option.english} />

                {/* Badge indicator on correct */}
                {isCorrect && (
                  <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center backdrop-blur-[1px]">
                    <div className="bg-emerald-500 text-white rounded-full p-2 shadow-lg animate-gentle-bounce">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                  </div>
                )}

                {/* Star floater when correct */}
                {isCorrect && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-amber-950 px-2 py-0.5 rounded-full text-xs font-black flex items-center gap-1 shadow-md animate-bounce">
                    <Star className="w-3.5 h-3.5 fill-amber-950" />
                    <span>+3</span>
                  </div>
                )}
              </div>

              {/* Labels */}
              <div className="w-full flex items-center justify-between px-1">
                <div className="truncate">
                  <span className="block text-sm sm:text-base font-extrabold text-slate-800 leading-tight truncate">
                    {option.english}
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-pink-600 font-hindi leading-tight truncate">
                    {option.hindi}
                  </span>
                </div>
                <span className="text-xl shrink-0 ml-1">{option.emoji}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Hint / Streak Feedback bar */}
      <div className="w-full mt-3 py-2 px-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-between text-xs text-purple-100">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>Tap the matching picture to earn stars!</span>
        </div>
        {currentStreak >= 2 && (
          <span className="font-extrabold text-yellow-300 bg-yellow-500/20 px-2 py-0.5 rounded-lg border border-yellow-400/30">
            {currentStreak} Streak! 🔥
          </span>
        )}
      </div>
    </div>
  );
};
