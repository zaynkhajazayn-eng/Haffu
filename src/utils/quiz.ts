import { ITEMS } from '../data/items.ts';
import type { QuizItem, CategoryType } from '../data/items.ts';

export interface QuizQuestion {
  id: string;
  targetItem: QuizItem;
  options: QuizItem[];
  questionEn: string;
  questionHi: string;
}

export function shuffleArray<T>(array: readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function generateQuizQuestions(
  pool: QuizItem[] = ITEMS,
  count: number = 15,
  categoryFilter?: CategoryType | 'all'
): QuizQuestion[] {
  const filteredPool = categoryFilter && categoryFilter !== 'all'
    ? pool.filter(item => item.category === categoryFilter)
    : pool;

  // Ensure we have at least 4 items to make 4 distinct choices
  const usablePool = filteredPool.length >= 4 ? filteredPool : pool;
  const shuffledTargets = shuffleArray(usablePool);
  const selectedTargets = shuffledTargets.slice(0, Math.min(count, shuffledTargets.length));

  return selectedTargets.map((target, index) => {
    // Pick 3 distinct random distractors strictly from the SAME category as the target item
    // Never mix different categories (e.g., vehicles and animals) in the same question
    const sameCategoryPool = pool.filter(
      item => item.category === target.category && item.id !== target.id
    );
    const shuffledDistractors = shuffleArray(sameCategoryPool).slice(0, 3);
    const options = shuffleArray([target, ...shuffledDistractors]);

    return {
      id: `q-${index}-${target.id}`,
      targetItem: target,
      options,
      questionEn: `Find the ${target.english}!`,
      questionHi: `${target.hindi} कहाँ है?`
    };
  });
}

export function checkAnswer(selectedId: string, targetId: string): boolean {
  return selectedId.trim().toLowerCase() === targetId.trim().toLowerCase();
}

export function calculateScoreAndStars(
  correctAnswers: number,
  totalQuestions: number,
  maxStreak: number = 0
): {
  starsAwarded: number;
  accuracy: number;
  badge: 'Superstar' | 'Great Job' | 'Keep Trying';
  badgeHi: 'सुपरस्टार!' | 'बहुत खूब!' | 'कोशिश करते रहो!';
} {
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  // 3 stars for every correct answer, plus bonus for streak
  const streakBonus = Math.floor(maxStreak / 3) * 2;
  const starsAwarded = (correctAnswers * 3) + streakBonus;

  let badge: 'Superstar' | 'Great Job' | 'Keep Trying' = 'Keep Trying';
  let badgeHi: 'सुपरस्टार!' | 'बहुत खूब!' | 'कोशिश करते रहो!' = 'कोशिश करते रहो!';

  if (accuracy >= 80) {
    badge = 'Superstar';
    badgeHi = 'सुपरस्टार!';
  } else if (accuracy >= 50) {
    badge = 'Great Job';
    badgeHi = 'बहुत खूब!';
  }

  return { starsAwarded, accuracy, badge, badgeHi };
}
