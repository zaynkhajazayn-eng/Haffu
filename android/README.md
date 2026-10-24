# Haffu Quiz — Complete Native Java Android App

A production-quality native Android quiz game in **pure Java** with **XML layouts** for children aged 3 years and above.

- **Package Name**: `com.haffu.quizgame`
- **Architecture**: 100% Native Android Java (`Activity`, standard Android Views, `ViewFlipper`)
- **No WebViews, No HTML/JS, No Jetpack Compose**
- **Min SDK**: API 21 (Android 5.0 Lollipop)
- **Target SDK**: API 34 (Android 14)
- **Zero Blank Screen Guarantee**: Native XML view hierarchy loaded directly in `onCreate`, with safe error boundary and offline local assets.

---

## 🌟 Key Features

1. **4 Rich Categories (105 Questions)**:
   - 🍎 **Fruits (फल)**: 25 items (Apple, Mango, Banana, Strawberry, Kiwi, etc.)
   - 🦁 **Animals (जानवर)**: 30 items (Lion, Tiger, Elephant, Monkey, Panda, etc.)
   - 🦜 **Birds (पक्षी)**: 25 items (Parrot, Peacock, Sparrow, Owl, Flamingo, etc.)
   - 🚗 **Vehicles (गाड़ियाँ)**: 25 items (Car, Bus, Train, Airplane, Tractor, etc.)
2. **Pedagogical Distractors**:
   - Every question dynamically picks 3 wrong answers from the **same category**, preventing absurd distractors and encouraging real learning.
3. **Bilingual Speech & Sound Effects**:
   - Native Android `TextToSpeech` with English and Hindi Unicode support.
   - Low-latency sound feedback using Android `ToneGenerator` (pops, correct chimes, wrong buzzer, victory fanfare).
4. **Child-Friendly Design**:
   - 10-second animated countdown timer (`ProgressBar`).
   - 4 large rounded buttons designed for toddler motor skills.
   - Immediate green/red visual answer feedback with star accumulation.
   - Stars Bank persisted across app restarts via `SharedPreferences`.

---

## 📁 Source Tree Structure

```text
android/
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── AndroidManifest.xml
│   │       ├── java/com/haffu/quizgame/
│   │       │   ├── MainActivity.java      # Activity lifecycle, UI flipper, timer, scoring
│   │       │   ├── Question.java          # Question & Option data model
│   │       │   ├── QuizRepository.java    # 105 distinct questions across 4 categories
│   │       │   └── SoundManager.java      # ToneGenerator and Android TextToSpeech engine
│   │       └── res/
│   │           ├── layout/
│   │           │   └── activity_main.xml  # Complete native XML layout (Home, Quiz, Results, Error)
│   │           ├── drawable/              # Custom shapes, gradients, button state lists, progress bar
│   │           ├── values/
│   │           │   ├── colors.xml         # Cheerful child-friendly color palette
│   │           │   ├── strings.xml        # English & Hindi Unicode strings
│   │           │   └── styles.xml         # Material Light NoActionBar theme
│   │           └── mipmap-*/              # High-definition app launcher icons
│   └── build.gradle
├── build.gradle
├── settings.gradle
└── gradlew
```

---

## 🛠️ How to Build & Run

### Method 1: In Android Studio
1. Launch Android Studio.
2. Select **Open** and choose the `android/` directory.
3. Allow Gradle to sync.
4. Click **Run** (`Shift + F10`) or select **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

### Method 2: Via Terminal (Gradle Wrapper)
```bash
cd android
./gradlew assembleDebug
```
*Generated APK location:*
`android/app/build/outputs/apk/debug/app-debug.apk`

### Method 3: Direct Standalone Builder Script
```bash
bash scripts/build-native-apk.sh
```
*Generated APK location:*
`public/haffu-quiz-game.apk` (852 KB signed release APK)
