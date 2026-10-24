package com.haffu.quizgame;

import android.app.Activity;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.ViewFlipper;
import java.util.List;

/**
 * Haffu Quiz — Native Java Android Game Activity
 * Ultra-fast, lightweight, 100% offline game designed for children aged 3+.
 * Zero white screen risk: inflates native Android views directly with zero browser dependencies.
 */
public class MainActivity extends Activity {
    private static final String TAG = "HaffuQuizNative";
    private static final String PREFS_NAME = "haffu_quiz_prefs";
    private static final String KEY_STARS = "total_stars";
    private static final String KEY_SOUND = "sound_enabled";

    // ViewFlipper & Global Bar
    private ViewFlipper viewFlipper;
    private TextView tvStarsCounter;
    private ImageButton btnBack;
    private ImageButton btnSoundToggle;

    // Home Screen Views
    private Button btnCatAll, btnCatAnimals, btnCatBirds, btnCatFruits, btnCatVehicles, btnStartQuiz;

    // Quiz Screen Views
    private TextView tvQuestionProgress, tvCategoryBadge, tvTimerText;
    private ProgressBar pbTimer;
    private TextView tvPromptEnglish, tvPromptHindi;
    private ImageButton btnSpeechSpeak;
    private TextView tvItemEmoji, tvItemBadge;
    private final Button[] btnOptions = new Button[4];

    // Results Screen Views
    private TextView tvResultSummary, tvResultStars;
    private Button btnPlayAgain, btnResultHome;

    // Error Screen Views
    private Button btnRetry;

    // Game Logic & State
    private SoundManager soundManager;
    private SharedPreferences prefs;
    private int totalStars = 12;
    private String selectedCategory = "all";
    private List<Question> currentQuizQuestions;
    private int currentQuestionIndex = 0;
    private int currentQuizScore = 0;
    private CountDownTimer countdownTimer;
    private boolean isOptionSelected = false;
    private final Handler mainHandler = new Handler(Looper.getMainLooper());

    private static final int SCREEN_HOME = 0;
    private static final int SCREEN_QUIZ = 1;
    private static final int SCREEN_RESULTS = 2;
    private static final int SCREEN_ERROR = 3;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            // Fullscreen immersion for children
            requestWindowFeature(Window.FEATURE_NO_TITLE);
            getWindow().setFlags(
                WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN
            );

            // Inflate native layout hierarchy instantly (0.02s)
            setContentView(R.layout.activity_main);

            prefs = getSharedPreferences(PREFS_NAME, MODE_PRIVATE);
            totalStars = prefs.getInt(KEY_STARS, 12);
            boolean soundPref = prefs.getBoolean(KEY_SOUND, true);

            soundManager = new SoundManager(this);
            soundManager.setSoundEnabled(soundPref);

            initializeViews();
            setupListeners();
            updateSoundIcon();
            updateStarsDisplay();
            showScreen(SCREEN_HOME);
        } catch (Throwable t) {
            Log.e(TAG, "Fatal startup error: " + t.getMessage(), t);
            safeShowErrorScreen();
        }
    }

    private void initializeViews() {
        viewFlipper = findViewById(R.id.view_flipper);
        tvStarsCounter = findViewById(R.id.tv_stars_counter);
        btnBack = findViewById(R.id.btn_back);
        btnSoundToggle = findViewById(R.id.btn_sound_toggle);

        // Home Screen
        btnCatAll = findViewById(R.id.btn_cat_all);
        btnCatAnimals = findViewById(R.id.btn_cat_animals);
        btnCatBirds = findViewById(R.id.btn_cat_birds);
        btnCatFruits = findViewById(R.id.btn_cat_fruits);
        btnCatVehicles = findViewById(R.id.btn_cat_vehicles);
        btnStartQuiz = findViewById(R.id.btn_start_quiz);

        // Quiz Screen
        tvQuestionProgress = findViewById(R.id.tv_question_progress);
        tvCategoryBadge = findViewById(R.id.tv_category_badge);
        tvTimerText = findViewById(R.id.tv_timer_text);
        pbTimer = findViewById(R.id.pb_timer);
        tvPromptEnglish = findViewById(R.id.tv_prompt_english);
        tvPromptHindi = findViewById(R.id.tv_prompt_hindi);
        btnSpeechSpeak = findViewById(R.id.btn_speech_speak);
        tvItemEmoji = findViewById(R.id.tv_item_emoji);
        tvItemBadge = findViewById(R.id.tv_item_badge);

        btnOptions[0] = findViewById(R.id.btn_option_1);
        btnOptions[1] = findViewById(R.id.btn_option_2);
        btnOptions[2] = findViewById(R.id.btn_option_3);
        btnOptions[3] = findViewById(R.id.btn_option_4);

        // Results Screen
        tvResultSummary = findViewById(R.id.tv_result_summary);
        tvResultStars = findViewById(R.id.tv_result_stars);
        btnPlayAgain = findViewById(R.id.btn_play_again);
        btnResultHome = findViewById(R.id.btn_result_home);

        // Error Screen
        btnRetry = findViewById(R.id.btn_retry);
    }

    private void setupListeners() {
        btnBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });

        btnSoundToggle.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                boolean nextState = !soundManager.isSoundEnabled();
                soundManager.setSoundEnabled(nextState);
                prefs.edit().putBoolean(KEY_SOUND, nextState).apply();
                updateSoundIcon();
                if (nextState) soundManager.playPop();
            }
        });

        // Category selection
        View.OnClickListener catListener = new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                soundManager.playPop();
                int id = v.getId();
                if (id == R.id.btn_cat_animals) selectedCategory = "animals";
                else if (id == R.id.btn_cat_birds) selectedCategory = "birds";
                else if (id == R.id.btn_cat_fruits) selectedCategory = "fruits";
                else if (id == R.id.btn_cat_vehicles) selectedCategory = "vehicles";
                else selectedCategory = "all";
                startNewQuiz();
            }
        };

        btnCatAll.setOnClickListener(catListener);
        btnCatAnimals.setOnClickListener(catListener);
        btnCatBirds.setOnClickListener(catListener);
        btnCatFruits.setOnClickListener(catListener);
        btnCatVehicles.setOnClickListener(catListener);

        btnStartQuiz.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                soundManager.playPop();
                startNewQuiz();
            }
        });

        // Speech Repeat Button
        btnSpeechSpeak.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                speakCurrentQuestion();
            }
        });

        // 4 Large Option Buttons
        for (int i = 0; i < 4; i++) {
            final int optionIndex = i;
            btnOptions[i].setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    handleOptionClick(optionIndex);
                }
            });
        }

        // Results Buttons
        btnPlayAgain.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                soundManager.playPop();
                startNewQuiz();
            }
        });

        btnResultHome.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                soundManager.playPop();
                showScreen(SCREEN_HOME);
            }
        });

        // Error Retry Button
        btnRetry.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showScreen(SCREEN_HOME);
            }
        });
    }

    private void showScreen(int screenIndex) {
        if (viewFlipper != null) {
            viewFlipper.setDisplayedChild(screenIndex);
        }
        if (btnBack != null) {
            btnBack.setVisibility(screenIndex == SCREEN_HOME ? View.GONE : View.VISIBLE);
        }
    }

    private void startNewQuiz() {
        try {
            currentQuizQuestions = QuizRepository.generateQuiz(selectedCategory, 15);
            currentQuestionIndex = 0;
            currentQuizScore = 0;
            showScreen(SCREEN_QUIZ);
            displayQuestion();
        } catch (Exception e) {
            Log.e(TAG, "Error starting quiz: " + e.getMessage(), e);
            safeShowErrorScreen();
        }
    }

    private void displayQuestion() {
        if (currentQuizQuestions == null || currentQuestionIndex >= currentQuizQuestions.size()) {
            finishQuiz();
            return;
        }

        isOptionSelected = false;
        Question q = currentQuizQuestions.get(currentQuestionIndex);

        // Header info
        tvQuestionProgress.setText(String.format("Question %d / %d", currentQuestionIndex + 1, currentQuizQuestions.size()));
        tvCategoryBadge.setText(getCategoryBadgeText(q.getCategory()));

        // Question Prompts
        tvPromptEnglish.setText(q.getQuestionEnglish());
        tvPromptHindi.setText(q.getQuestionHindi());

        // Visual Centerpiece Card
        tvItemEmoji.setText(q.getEmoji());
        tvItemBadge.setText(q.getEnglishName().toUpperCase() + " • " + q.getHindiName());

        // 4 Answer Options
        List<Question.Option> options = q.getOptions();
        for (int i = 0; i < 4; i++) {
            if (i < options.size()) {
                Question.Option opt = options.get(i);
                btnOptions[i].setText(opt.getDisplayText());
                btnOptions[i].setBackgroundResource(R.drawable.btn_option_default);
                btnOptions[i].setTextColor(getResources().getColor(R.color.text_dark));
                btnOptions[i].setEnabled(true);
                btnOptions[i].setVisibility(View.VISIBLE);
            } else {
                btnOptions[i].setVisibility(View.GONE);
            }
        }

        // Voice pronunciation
        speakCurrentQuestion();

        // 10-Second Countdown Timer
        startQuestionTimer();
    }

    private void speakCurrentQuestion() {
        if (currentQuizQuestions != null && currentQuestionIndex < currentQuizQuestions.size()) {
            Question q = currentQuizQuestions.get(currentQuestionIndex);
            soundManager.speakBilingual(q.getQuestionEnglish(), q.getQuestionHindi());
        }
    }

    private void startQuestionTimer() {
        cancelTimer();
        pbTimer.setProgress(100);
        tvTimerText.setText("10 s");
        tvTimerText.setTextColor(getResources().getColor(R.color.timer_normal));

        countdownTimer = new CountDownTimer(10000, 100) {
            @Override
            public void onTick(long millisUntilFinished) {
                int percent = (int) ((millisUntilFinished * 100) / 10000);
                pbTimer.setProgress(percent);
                int secondsLeft = (int) (millisUntilFinished / 1000) + 1;
                tvTimerText.setText(secondsLeft + " s");

                if (secondsLeft <= 3) {
                    tvTimerText.setTextColor(getResources().getColor(R.color.timer_urgent));
                }
            }

            @Override
            public void onFinish() {
                pbTimer.setProgress(0);
                tvTimerText.setText("0 s");
                handleTimeOut();
            }
        }.start();
    }

    private void cancelTimer() {
        if (countdownTimer != null) {
            countdownTimer.cancel();
            countdownTimer = null;
        }
    }

    private void handleTimeOut() {
        if (isOptionSelected) return;
        isOptionSelected = true;

        soundManager.playWrongTone();
        Question q = currentQuizQuestions.get(currentQuestionIndex);

        // Highlight correct answer in green
        int correctIndex = q.getCorrectOptionIndex();
        if (correctIndex >= 0 && correctIndex < 4) {
            btnOptions[correctIndex].setBackgroundResource(R.drawable.btn_option_correct);
            btnOptions[correctIndex].setTextColor(getResources().getColor(R.color.white));
        }

        disableOptionButtons();
        scheduleNextQuestion();
    }

    private void handleOptionClick(int clickedIndex) {
        if (isOptionSelected) return;
        isOptionSelected = true;
        cancelTimer();

        Question q = currentQuizQuestions.get(currentQuestionIndex);
        int correctIndex = q.getCorrectOptionIndex();

        if (clickedIndex == correctIndex) {
            // Correct Answer!
            soundManager.playCorrectChime();
            btnOptions[clickedIndex].setBackgroundResource(R.drawable.btn_option_correct);
            btnOptions[clickedIndex].setTextColor(getResources().getColor(R.color.white));
            currentQuizScore++;
            addStars(1);
        } else {
            // Wrong Answer!
            soundManager.playWrongTone();
            btnOptions[clickedIndex].setBackgroundResource(R.drawable.btn_option_wrong);
            btnOptions[clickedIndex].setTextColor(getResources().getColor(R.color.white));

            // Highlight correct answer in green so the child learns
            if (correctIndex >= 0 && correctIndex < 4) {
                btnOptions[correctIndex].setBackgroundResource(R.drawable.btn_option_correct);
                btnOptions[correctIndex].setTextColor(getResources().getColor(R.color.white));
            }
        }

        disableOptionButtons();
        scheduleNextQuestion();
    }

    private void disableOptionButtons() {
        for (Button btn : btnOptions) {
            btn.setEnabled(false);
        }
    }

    private void scheduleNextQuestion() {
        mainHandler.postDelayed(new Runnable() {
            @Override
            public void run() {
                currentQuestionIndex++;
                displayQuestion();
            }
        }, 1200);
    }

    private void finishQuiz() {
        cancelTimer();
        showScreen(SCREEN_RESULTS);
        soundManager.playVictoryFanfare();

        int total = currentQuizQuestions != null ? currentQuizQuestions.size() : 15;
        tvResultSummary.setText(String.format("You scored %d out of %d questions correctly!", currentQuizScore, total));
        tvResultStars.setText(String.format("+%d Stars Earned! ⭐", currentQuizScore));
    }

    private void addStars(int amount) {
        totalStars += amount;
        prefs.edit().putInt(KEY_STARS, totalStars).apply();
        updateStarsDisplay();
    }

    private void updateStarsDisplay() {
        if (tvStarsCounter != null) {
            tvStarsCounter.setText("★ " + totalStars);
        }
    }

    private void updateSoundIcon() {
        if (btnSoundToggle != null) {
            btnSoundToggle.setImageResource(soundManager.isSoundEnabled()
                ? android.R.drawable.ic_lock_silent_mode_off
                : android.R.drawable.ic_lock_silent_mode);
        }
    }

    private String getCategoryBadgeText(String cat) {
        if ("animals".equalsIgnoreCase(cat)) return "🦁 Animals";
        if ("birds".equalsIgnoreCase(cat)) return "🦜 Birds";
        if ("fruits".equalsIgnoreCase(cat)) return "🍎 Fruits";
        if ("vehicles".equalsIgnoreCase(cat)) return "🚗 Vehicles";
        return "🌟 All Items";
    }

    private void safeShowErrorScreen() {
        try {
            if (viewFlipper != null) {
                viewFlipper.setDisplayedChild(SCREEN_ERROR);
            }
        } catch (Exception ignored) {}
    }

    @Override
    public void onBackPressed() {
        if (viewFlipper != null && viewFlipper.getDisplayedChild() != SCREEN_HOME) {
            cancelTimer();
            showScreen(SCREEN_HOME);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        cancelTimer();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        cancelTimer();
        if (soundManager != null) {
            soundManager.release();
        }
    }
}
