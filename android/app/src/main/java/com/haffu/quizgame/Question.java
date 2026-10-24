package com.haffu.quizgame;

import java.util.List;

public class Question {
    private final String id;
    private final String category;
    private final String englishName;
    private final String hindiName;
    private final String emoji;
    private final List<Option> options;
    private final int correctOptionIndex;

    public static class Option {
        public final String english;
        public final String hindi;
        public final String emoji;

        public Option(String english, String hindi, String emoji) {
            this.english = english;
            this.hindi = hindi;
            this.emoji = emoji;
        }

        public String getDisplayText() {
            return emoji + " " + english + "\n" + hindi;
        }
    }

    public Question(String id, String category, String englishName, String hindiName, String emoji, List<Option> options, int correctOptionIndex) {
        this.id = id;
        this.category = category;
        this.englishName = englishName;
        this.hindiName = hindiName;
        this.emoji = emoji;
        this.options = options;
        this.correctOptionIndex = correctOptionIndex;
    }

    public String getId() { return id; }
    public String getCategory() { return category; }
    public String getEnglishName() { return englishName; }
    public String getHindiName() { return hindiName; }
    public String getEmoji() { return emoji; }
    public List<Option> getOptions() { return options; }
    public int getCorrectOptionIndex() { return correctOptionIndex; }

    public String getQuestionEnglish() {
        return "Find the " + englishName + "!";
    }

    public String getQuestionHindi() {
        return hindiName + " कहाँ है?";
    }
}
