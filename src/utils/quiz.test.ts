import test from 'node:test';
import assert from 'node:assert/strict';
import { generateQuizQuestions, checkAnswer, calculateScoreAndStars, shuffleArray } from './quiz.ts';
import { ITEMS } from '../data/items.ts';

test('dataset contains all 150 required items across 4 categories with matching metadata', () => {
  assert.equal(ITEMS.length, 150, `Expected exactly 150 items, got ${ITEMS.length}`);
  const animals = ITEMS.filter(item => item.category === 'animals');
  const birds = ITEMS.filter(item => item.category === 'birds');
  const fruits = ITEMS.filter(item => item.category === 'fruits');
  const vehicles = ITEMS.filter(item => item.category === 'vehicles');

  assert.equal(animals.length, 45, `Expected 45 animals, got ${animals.length}`);
  assert.equal(birds.length, 30, `Expected 30 birds, got ${birds.length}`);
  assert.equal(fruits.length, 35, `Expected 35 fruits, got ${fruits.length}`);
  assert.equal(vehicles.length, 40, `Expected 40 vehicles, got ${vehicles.length}`);

  const seenIds = new Set<string>();

  // Check required fields & dynamic keyword query
  for (const item of ITEMS) {
    assert.ok(item.id, 'Item id missing');
    assert.ok(!seenIds.has(item.id), `Duplicate ID found: ${item.id}`);
    seenIds.add(item.id);

    assert.ok(item.english && item.english.trim().length > 0, `English name missing for ${item.id}`);
    assert.ok(item.hindi && item.hindi.trim().length > 0, `Hindi name missing for ${item.id}`);
    assert.ok(item.emoji && item.emoji.trim().length > 0, `Emoji missing for ${item.id}`);
    assert.ok(item.keyword && item.keyword.trim().length > 0, `Keyword missing for ${item.id}`);

    // Dynamic keyword image URL validation
    assert.ok(
      item.image.includes(encodeURIComponent(item.keyword.toLowerCase().trim())) ||
      item.image.includes(encodeURIComponent(item.english.toLowerCase().trim())),
      `Image URL for ${item.id} must contain the dynamic keyword noun`
    );
  }
});

test('specific items mentioned in bug report (Rhino, Horse, Cherry, Lemon) are correctly configured', () => {
  const rhino = ITEMS.find(i => i.id === 'rhino');
  assert.ok(rhino, 'Rhino must exist');
  assert.equal(rhino.category, 'animals');
  assert.equal(rhino.english, 'Rhino');
  assert.equal(rhino.hindi, 'गैंडा');
  assert.equal(rhino.emoji, '🦏');

  const horse = ITEMS.find(i => i.id === 'horse');
  assert.ok(horse, 'Horse must exist');
  assert.equal(horse.category, 'animals');
  assert.equal(horse.english, 'Horse');
  assert.equal(horse.hindi, 'घोड़ा');
  assert.equal(horse.emoji, '🐴');

  const cherry = ITEMS.find(i => i.id === 'cherry');
  assert.ok(cherry, 'Cherry must exist');
  assert.equal(cherry.category, 'fruits');
  assert.equal(cherry.english, 'Cherry');
  assert.equal(cherry.hindi, 'चेरी');
  assert.equal(cherry.emoji, '🍒');

  const lemon = ITEMS.find(i => i.id === 'lemon');
  assert.ok(lemon, 'Lemon must exist');
  assert.equal(lemon.category, 'fruits');
  assert.equal(lemon.english, 'Lemon');
  assert.equal(lemon.hindi, 'नींबू');
  assert.equal(lemon.emoji, '🍋');
});

test('generateQuizQuestions produces category-matched distractors: all 4 options must belong to the same category', () => {
  // Test overall generation
  const allQuestions = generateQuizQuestions(ITEMS, 30);
  assert.equal(allQuestions.length, 30);

  for (const q of allQuestions) {
    assert.equal(q.options.length, 4, 'Each question must have 4 options');

    const optionIds = new Set(q.options.map(opt => opt.id));
    assert.equal(optionIds.size, 4, 'All 4 options must be distinct');
    assert.ok(optionIds.has(q.targetItem.id), 'The target item must be one of the options');

    // Strict category matching: all 4 options must belong to targetItem.category
    for (const opt of q.options) {
      assert.equal(
        opt.category,
        q.targetItem.category,
        `Option ${opt.english} category (${opt.category}) must match target ${q.targetItem.english} category (${q.targetItem.category})`
      );
    }
  }

  // Test specifically for each category
  const categories = ['animals', 'birds', 'fruits', 'vehicles'] as const;
  for (const cat of categories) {
    const catQuestions = generateQuizQuestions(ITEMS, 10, cat);
    for (const q of catQuestions) {
      assert.equal(q.targetItem.category, cat);
      for (const opt of q.options) {
        assert.equal(opt.category, cat, `Distractor in ${cat} quiz must strictly be in category ${cat}`);
      }
    }
  }
});

test('checkAnswer validates user selection correctly', () => {
  assert.equal(checkAnswer('lion', 'lion'), true);
  assert.equal(checkAnswer('Lion', 'lion'), true);
  assert.equal(checkAnswer('elephant', 'lion'), false);
});

test('calculateScoreAndStars awards stars and badges properly', () => {
  const fullScore = calculateScoreAndStars(15, 15, 15);
  assert.equal(fullScore.accuracy, 100);
  assert.equal(fullScore.badge, 'Superstar');
  assert.ok(fullScore.starsAwarded >= 45);

  const partialScore = calculateScoreAndStars(8, 15, 3);
  assert.equal(partialScore.accuracy, 53);
  assert.equal(partialScore.badge, 'Great Job');

  const lowScore = calculateScoreAndStars(2, 15, 0);
  assert.equal(lowScore.badge, 'Keep Trying');
});

test('shuffleArray preserves elements and length', () => {
  const original = [1, 2, 3, 4, 5];
  const shuffled = shuffleArray(original);
  assert.equal(shuffled.length, 5);
  assert.deepEqual(new Set(shuffled), new Set(original));
});
