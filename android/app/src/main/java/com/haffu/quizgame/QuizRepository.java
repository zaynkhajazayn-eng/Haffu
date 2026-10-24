package com.haffu.quizgame;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class QuizRepository {

    public static class RawItem {
        public final String id;
        public final String category;
        public final String english;
        public final String hindi;
        public final String emoji;

        public RawItem(String id, String category, String english, String hindi, String emoji) {
            this.id = id;
            this.category = category;
            this.english = english;
            this.hindi = hindi;
            this.emoji = emoji;
        }
    }

    private static final List<RawItem> ITEMS = new ArrayList<>();

    static {
        // --- 1. FRUITS (25 Items) ---
        ITEMS.add(new RawItem("f1", "fruits", "Apple", "सेब", "🍎"));
        ITEMS.add(new RawItem("f2", "fruits", "Banana", "केला", "🍌"));
        ITEMS.add(new RawItem("f3", "fruits", "Mango", "आम", "🥭"));
        ITEMS.add(new RawItem("f4", "fruits", "Orange", "संतरा", "🍊"));
        ITEMS.add(new RawItem("f5", "fruits", "Strawberry", "स्ट्रॉबेरी", "🍓"));
        ITEMS.add(new RawItem("f6", "fruits", "Grapes", "अंगूर", "🍇"));
        ITEMS.add(new RawItem("f7", "fruits", "Watermelon", "तरबूज", "🍉"));
        ITEMS.add(new RawItem("f8", "fruits", "Pineapple", "अनानास", "🍍"));
        ITEMS.add(new RawItem("f9", "fruits", "Papaya", "पपीता", "🍈"));
        ITEMS.add(new RawItem("f10", "fruits", "Guava", "अमरूद", "🍏"));
        ITEMS.add(new RawItem("f11", "fruits", "Kiwi", "कीवी", "🥝"));
        ITEMS.add(new RawItem("f12", "fruits", "Cherry", "चेरी", "🍒"));
        ITEMS.add(new RawItem("f13", "fruits", "Lemon", "नींबू", "🍋"));
        ITEMS.add(new RawItem("f14", "fruits", "Peach", "आड़ू", "🍑"));
        ITEMS.add(new RawItem("f15", "fruits", "Pomegranate", "अनार", "🍎"));
        ITEMS.add(new RawItem("f16", "fruits", "Plum", "आलू बुखारा", "🫐"));
        ITEMS.add(new RawItem("f17", "fruits", "Coconut", "नारियल", "🥥"));
        ITEMS.add(new RawItem("f18", "fruits", "Lychee", "लीची", "🍒"));
        ITEMS.add(new RawItem("f19", "fruits", "Fig", "अंजीर", "🌰"));
        ITEMS.add(new RawItem("f20", "fruits", "Apricot", "खुबानी", "🍑"));
        ITEMS.add(new RawItem("f21", "fruits", "Blueberry", "ब्लूबेरी", "🫐"));
        ITEMS.add(new RawItem("f22", "fruits", "Blackberry", "जामुन", "🍇"));
        ITEMS.add(new RawItem("f23", "fruits", "Avocado", "एवोकैडो", "🥑"));
        ITEMS.add(new RawItem("f24", "fruits", "Dragonfruit", "ड्रैगन फ्रूट", "🐉"));
        ITEMS.add(new RawItem("f25", "fruits", "Melon", "खरबूजा", "🍈"));

        // --- 2. ANIMALS (30 Items) ---
        ITEMS.add(new RawItem("a1", "animals", "Lion", "शेर", "🦁"));
        ITEMS.add(new RawItem("a2", "animals", "Tiger", "बाघ", "🐯"));
        ITEMS.add(new RawItem("a3", "animals", "Elephant", "हाथी", "🐘"));
        ITEMS.add(new RawItem("a4", "animals", "Monkey", "बंदर", "🐵"));
        ITEMS.add(new RawItem("a5", "animals", "Zebra", "ज़ेबरा", "🦓"));
        ITEMS.add(new RawItem("a6", "animals", "Giraffe", "जिराफ़", "🦒"));
        ITEMS.add(new RawItem("a7", "animals", "Kangaroo", "कंगारू", "🦘"));
        ITEMS.add(new RawItem("a8", "animals", "Bear", "भालू", "🐻"));
        ITEMS.add(new RawItem("a9", "animals", "Panda", "पांडा", "🐼"));
        ITEMS.add(new RawItem("a10", "animals", "Deer", "हिरण", "🦌"));
        ITEMS.add(new RawItem("a11", "animals", "Horse", "घोड़ा", "🐴"));
        ITEMS.add(new RawItem("a12", "animals", "Cow", "गाय", "🐮"));
        ITEMS.add(new RawItem("a13", "animals", "Sheep", "भेड़", "🐑"));
        ITEMS.add(new RawItem("a14", "animals", "Goat", "बकरी", "🐐"));
        ITEMS.add(new RawItem("a15", "animals", "Dog", "कुत्ता", "🐶"));
        ITEMS.add(new RawItem("a16", "animals", "Cat", "बिल्ली", "🐱"));
        ITEMS.add(new RawItem("a17", "animals", "Rabbit", "खरगोश", "🐰"));
        ITEMS.add(new RawItem("a18", "animals", "Fox", "लोमड़ी", "🦊"));
        ITEMS.add(new RawItem("a19", "animals", "Wolf", "भेड़िया", "🐺"));
        ITEMS.add(new RawItem("a20", "animals", "Camel", "ऊंट", "🐪"));
        ITEMS.add(new RawItem("a21", "animals", "Hippo", "दरियाई घोड़ा", "🦛"));
        ITEMS.add(new RawItem("a22", "animals", "Rhino", "गैंडा", "🦏"));
        ITEMS.add(new RawItem("a23", "animals", "Crocodile", "मगरमच्छ", "🐊"));
        ITEMS.add(new RawItem("a24", "animals", "Snake", "सांप", "🐍"));
        ITEMS.add(new RawItem("a25", "animals", "Frog", "मेंढक", "🐸"));
        ITEMS.add(new RawItem("a26", "animals", "Squirrel", "गिलहरी", "🐿️"));
        ITEMS.add(new RawItem("a27", "animals", "Pig", "सुअर", "🐷"));
        ITEMS.add(new RawItem("a28", "animals", "Cheetah", "चीता", "🐆"));
        ITEMS.add(new RawItem("a29", "animals", "Donkey", "गधा", "🫏"));
        ITEMS.add(new RawItem("a30", "animals", "Koala", "कोआला", "🐨"));

        // --- 3. BIRDS (25 Items) ---
        ITEMS.add(new RawItem("b1", "birds", "Parrot", "तोता", "🦜"));
        ITEMS.add(new RawItem("b2", "birds", "Peacock", "मोर", "🦚"));
        ITEMS.add(new RawItem("b3", "birds", "Sparrow", "गौरैया", "🐦"));
        ITEMS.add(new RawItem("b4", "birds", "Pigeon", "कबूतर", "🕊️"));
        ITEMS.add(new RawItem("b5", "birds", "Crow", "कौआ", "🐦‍⬛"));
        ITEMS.add(new RawItem("b6", "birds", "Eagle", "चील", "🦅"));
        ITEMS.add(new RawItem("b7", "birds", "Owl", "उल्लू", "🦉"));
        ITEMS.add(new RawItem("b8", "birds", "Duck", "बत्तख", "🦆"));
        ITEMS.add(new RawItem("b9", "birds", "Swan", "हंस", "🦢"));
        ITEMS.add(new RawItem("b10", "birds", "Flamingo", "राजहंस", "🦩"));
        ITEMS.add(new RawItem("b11", "birds", "Penguin", "पेंगुइन", "🐧"));
        ITEMS.add(new RawItem("b12", "birds", "Kingfisher", "रामचिरैया", "🐟"));
        ITEMS.add(new RawItem("b13", "birds", "Woodpecker", "कठफोड़वा", "🪵"));
        ITEMS.add(new RawItem("b14", "birds", "Ostrich", "शुतुरमुर्ग", "🦤"));
        ITEMS.add(new RawItem("b15", "birds", "Crane", "सारस", "🪶"));
        ITEMS.add(new RawItem("b16", "birds", "Toucan", "टूकैन", "🦜"));
        ITEMS.add(new RawItem("b17", "birds", "Robin", "रॉबिन", "🐦"));
        ITEMS.add(new RawItem("b18", "birds", "Hummingbird", "गुंजन पक्षी", "🌺"));
        ITEMS.add(new RawItem("b19", "birds", "Turkey", "टर्की", "🦃"));
        ITEMS.add(new RawItem("b20", "birds", "Seagull", "गंगा-चिल्ली", "🌊"));
        ITEMS.add(new RawItem("b21", "birds", "Rooster", "मुर्गा", "🐓"));
        ITEMS.add(new RawItem("b22", "birds", "Hen", "मुर्गी", "🐔"));
        ITEMS.add(new RawItem("b23", "birds", "Vulture", "गिद्ध", "🦅"));
        ITEMS.add(new RawItem("b24", "birds", "Falcon", "बाज", "🦅"));
        ITEMS.add(new RawItem("b25", "birds", "Pelican", "हवासील", "🐟"));

        // --- 4. VEHICLES (25 Items) ---
        ITEMS.add(new RawItem("v1", "vehicles", "Car", "कार", "🚗"));
        ITEMS.add(new RawItem("v2", "vehicles", "Bus", "बस", "🚌"));
        ITEMS.add(new RawItem("v3", "vehicles", "Train", "ट्रेन", "🚆"));
        ITEMS.add(new RawItem("v4", "vehicles", "Airplane", "हवाई जहाज़", "✈️"));
        ITEMS.add(new RawItem("v5", "vehicles", "Bicycle", "साइकिल", "🚲"));
        ITEMS.add(new RawItem("v6", "vehicles", "Motorcycle", "मोटरसाइकिल", "🏍️"));
        ITEMS.add(new RawItem("v7", "vehicles", "Helicopter", "हेलिकॉप्टर", "🚁"));
        ITEMS.add(new RawItem("v8", "vehicles", "Boat", "नाव", "⛵"));
        ITEMS.add(new RawItem("v9", "vehicles", "Ship", "जहाज़", "🚢"));
        ITEMS.add(new RawItem("v10", "vehicles", "Tractor", "ट्रैक्टर", "🚜"));
        ITEMS.add(new RawItem("v11", "vehicles", "Ambulance", "एम्बुलेंस", "🚑"));
        ITEMS.add(new RawItem("v12", "vehicles", "Fire Engine", "दमकल", "🚒"));
        ITEMS.add(new RawItem("v13", "vehicles", "Police Car", "पुलिस कार", "🚓"));
        ITEMS.add(new RawItem("v14", "vehicles", "Truck", "ट्रक", "🚚"));
        ITEMS.add(new RawItem("v15", "vehicles", "Rocket", "रॉकेट", "🚀"));
        ITEMS.add(new RawItem("v16", "vehicles", "Scooter", "स्कूटर", "🛵"));
        ITEMS.add(new RawItem("v17", "vehicles", "Van", "वैन", "🚐"));
        ITEMS.add(new RawItem("v18", "vehicles", "Taxi", "टैक्सी", "🚕"));
        ITEMS.add(new RawItem("v19", "vehicles", "Submarine", "पनडुब्बी", "🛥️"));
        ITEMS.add(new RawItem("v20", "vehicles", "Tram", "ट्राम", "🚊"));
        ITEMS.add(new RawItem("v21", "vehicles", "Auto Rickshaw", "ऑटो रिक्शा", "🛺"));
        ITEMS.add(new RawItem("v22", "vehicles", "Hot Air Balloon", "हॉट एयर बैलून", "🎈"));
        ITEMS.add(new RawItem("v23", "vehicles", "Sailboat", "पालनाव", "⛵"));
        ITEMS.add(new RawItem("v24", "vehicles", "Bulldozer", "बुलडोज़र", "🚜"));
        ITEMS.add(new RawItem("v25", "vehicles", "Metro", "मेट्रो", "🚇"));
    }

    public static List<RawItem> getAllItems() {
        return Collections.unmodifiableList(ITEMS);
    }

    public static List<Question> generateQuiz(String category, int count) {
        List<RawItem> pool = new ArrayList<>();
        for (RawItem item : ITEMS) {
            if (category == null || category.equalsIgnoreCase("all") || item.category.equalsIgnoreCase(category)) {
                pool.add(item);
            }
        }

        if (pool.isEmpty()) {
            pool.addAll(ITEMS);
        }

        // Shuffle pool
        Collections.shuffle(pool);

        int totalToTake = Math.min(count, pool.size());
        List<Question> questions = new ArrayList<>();
        Random random = new Random();

        for (int i = 0; i < totalToTake; i++) {
            RawItem correctItem = pool.get(i);

            // Find distractors from SAME category first for pedagogical quality
            List<RawItem> categoryDistractors = new ArrayList<>();
            for (RawItem other : ITEMS) {
                if (!other.id.equals(correctItem.id) && other.category.equals(correctItem.category)) {
                    categoryDistractors.add(other);
                }
            }

            // Fallback if category has less than 3 distractors
            if (categoryDistractors.size() < 3) {
                for (RawItem other : ITEMS) {
                    if (!other.id.equals(correctItem.id) && !categoryDistractors.contains(other)) {
                        categoryDistractors.add(other);
                    }
                }
            }

            Collections.shuffle(categoryDistractors);

            // Build 4 options (1 correct + 3 distractors)
            List<Question.Option> options = new ArrayList<>();
            options.add(new Question.Option(correctItem.english, correctItem.hindi, correctItem.emoji));
            for (int d = 0; d < 3 && d < categoryDistractors.size(); d++) {
                RawItem dist = categoryDistractors.get(d);
                options.add(new Question.Option(dist.english, dist.hindi, dist.emoji));
            }

            // Shuffle options
            Collections.shuffle(options);

            // Locate correct option index
            int correctIndex = 0;
            for (int optIdx = 0; optIdx < options.size(); optIdx++) {
                if (options.get(optIdx).english.equals(correctItem.english)) {
                    correctIndex = optIdx;
                    break;
                }
            }

            questions.add(new Question(
                correctItem.id,
                correctItem.category,
                correctItem.english,
                correctItem.hindi,
                correctItem.emoji,
                options,
                correctIndex
            ));
        }

        return questions;
    }
}
