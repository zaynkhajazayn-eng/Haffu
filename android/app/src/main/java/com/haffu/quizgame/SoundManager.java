package com.haffu.quizgame;

import android.content.Context;
import android.media.AudioManager;
import android.media.ToneGenerator;
import android.speech.tts.TextToSpeech;
import android.util.Log;
import java.util.Locale;

public class SoundManager {
    private static final String TAG = "HaffuSound";
    private final Context context;
    private TextToSpeech tts;
    private ToneGenerator toneGenerator;
    private boolean isSoundEnabled = true;
    private boolean isTtsReady = false;
    private boolean isHindiSupported = false;

    public SoundManager(Context context) {
        this.context = context.getApplicationContext();
        initToneGenerator();
        initTextToSpeech();
    }

    private void initToneGenerator() {
        try {
            toneGenerator = new ToneGenerator(AudioManager.STREAM_MUSIC, 90);
        } catch (Exception e) {
            Log.w(TAG, "ToneGenerator init failed, audio will proceed silently: " + e.getMessage());
        }
    }

    private void initTextToSpeech() {
        try {
            tts = new TextToSpeech(context, new TextToSpeech.OnInitListener() {
                @Override
                public void onInit(int status) {
                    if (status == TextToSpeech.SUCCESS) {
                        isTtsReady = true;
                        int resultHi = tts.setLanguage(new Locale("hi", "IN"));
                        isHindiSupported = (resultHi != TextToSpeech.LANG_MISSING_DATA && resultHi != TextToSpeech.LANG_NOT_SUPPORTED);
                        tts.setLanguage(Locale.US);
                    } else {
                        Log.w(TAG, "TTS initialization failed status: " + status);
                    }
                }
            });
        } catch (Exception e) {
            Log.w(TAG, "TTS constructor error: " + e.getMessage());
        }
    }

    public void setSoundEnabled(boolean enabled) {
        this.isSoundEnabled = enabled;
        if (!enabled && tts != null && tts.isSpeaking()) {
            tts.stop();
        }
    }

    public boolean isSoundEnabled() {
        return isSoundEnabled;
    }

    public void playPop() {
        if (!isSoundEnabled || toneGenerator == null) return;
        try {
            toneGenerator.startTone(ToneGenerator.TONE_PROP_BEEP, 70);
        } catch (Exception e) {
            Log.w(TAG, "Error playing pop tone: " + e.getMessage());
        }
    }

    public void playCorrectChime() {
        if (!isSoundEnabled || toneGenerator == null) return;
        try {
            toneGenerator.startTone(ToneGenerator.TONE_CDMA_ALERT_CALL_GUARD, 200);
        } catch (Exception e) {
            Log.w(TAG, "Error playing correct tone: " + e.getMessage());
        }
    }

    public void playWrongTone() {
        if (!isSoundEnabled || toneGenerator == null) return;
        try {
            toneGenerator.startTone(ToneGenerator.TONE_PROP_NACK, 180);
        } catch (Exception e) {
            Log.w(TAG, "Error playing wrong tone: " + e.getMessage());
        }
    }

    public void playVictoryFanfare() {
        if (!isSoundEnabled || toneGenerator == null) return;
        try {
            toneGenerator.startTone(ToneGenerator.TONE_PROP_PROMPT, 350);
        } catch (Exception e) {
            Log.w(TAG, "Error playing fanfare: " + e.getMessage());
        }
    }

    public void speakBilingual(String englishText, String hindiText) {
        if (!isSoundEnabled || !isTtsReady || tts == null) return;
        try {
            tts.stop();
            // Speak English first
            tts.setLanguage(Locale.US);
            tts.speak(englishText, TextToSpeech.QUEUE_FLUSH, null, "en_prompt");

            // If Hindi voice is available, queue Hindi phrase
            if (isHindiSupported && hindiText != null && !hindiText.isEmpty()) {
                tts.setLanguage(new Locale("hi", "IN"));
                tts.speak(hindiText, TextToSpeech.QUEUE_ADD, null, "hi_prompt");
            }
        } catch (Exception e) {
            Log.w(TAG, "TTS speak error: " + e.getMessage());
        }
    }

    public void release() {
        if (toneGenerator != null) {
            try {
                toneGenerator.release();
            } catch (Exception ignored) {}
            toneGenerator = null;
        }
        if (tts != null) {
            try {
                tts.stop();
                tts.shutdown();
            } catch (Exception ignored) {}
            tts = null;
        }
    }
}
