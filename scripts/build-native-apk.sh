#!/usr/bin/env bash
set -eo pipefail

echo "=========================================================="
echo "  Haffu Quiz — Native Java Android APK Builder"
echo "=========================================================="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${ROOT_DIR}"

BUILD_DIR="/tmp/native-apk-build"
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR/gen"
mkdir -p "$BUILD_DIR/bin"
mkdir -p "$BUILD_DIR/out"

# Check Android SDK / tools
if [ ! -f /tmp/android.jar ]; then
  echo "[*] Downloading android.jar..."
  curl -L -s -o /tmp/android.jar https://github.com/Sable/android-platforms/raw/master/android-30/android.jar
fi

if [ ! -f /tmp/r8.jar ]; then
  echo "[*] Downloading r8.jar..."
  curl -L -s -o /tmp/r8.jar https://dl.google.com/android/maven2/com/android/tools/r8/8.2.33/r8-8.2.33.jar
fi

# Copy mipmap icons if missing
cp public/pwa-512x512.png android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png 2>/dev/null || true
cp public/pwa-512x512.png android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png 2>/dev/null || true
cp public/pwa-192x192.png android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png 2>/dev/null || true
cp public/pwa-192x192.png android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png 2>/dev/null || true
cp public/pwa-192x192.png android/app/src/main/res/mipmap-xhdpi/ic_launcher.png 2>/dev/null || true
cp public/pwa-192x192.png android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png 2>/dev/null || true
cp public/pwa-192x192.png android/app/src/main/res/mipmap-hdpi/ic_launcher.png 2>/dev/null || true
cp public/pwa-192x192.png android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png 2>/dev/null || true
cp public/pwa-192x192.png android/app/src/main/res/mipmap-mdpi/ic_launcher.png 2>/dev/null || true
cp public/pwa-192x192.png android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png 2>/dev/null || true

# 1. Compile Android resources with aapt
echo "[1/5] Compiling resources and generating R.java..."
aapt package -f -m \
    -J "$BUILD_DIR/gen" \
    -M "android/app/src/main/AndroidManifest.xml" \
    -S "android/app/src/main/res" \
    -I /tmp/android.jar

# 2. Compile Java Source Files
echo "[2/5] Compiling Java source files..."
javac -encoding UTF-8 \
    -classpath /tmp/android.jar \
    -d "$BUILD_DIR/bin" \
    $(find "$BUILD_DIR/gen" -name "*.java") \
    $(find "android/app/src/main/java" -name "*.java")

# 3. Convert Bytecode to Dalvik classes.dex with D8
echo "[3/5] Converting bytecode to Dalvik classes.dex..."
java -cp /tmp/r8.jar com.android.tools.r8.D8 \
    --min-api 21 \
    --lib /tmp/android.jar \
    --output "$BUILD_DIR" \
    $(find "$BUILD_DIR/bin" -name "*.class")

# 4. Package APK with aapt
echo "[4/5] Packaging unaligned APK..."
aapt package -f \
    -M "android/app/src/main/AndroidManifest.xml" \
    -S "android/app/src/main/res" \
    -I /tmp/android.jar \
    -F "$BUILD_DIR/unaligned.apk"

# Add classes.dex into unaligned.apk
(cd "$BUILD_DIR" && aapt add unaligned.apk classes.dex)

# Align APK
zipalign -v -p 4 "$BUILD_DIR/unaligned.apk" "$BUILD_DIR/aligned.apk"

# Ensure signing keystore
KEYSTORE="${ROOT_DIR}/scripts/haffu-key.jks"
if [ ! -f "$KEYSTORE" ]; then
    echo "[*] Generating persistent keystore..."
    keytool -genkeypair -v \
        -keystore "$KEYSTORE" \
        -alias haffu \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -storepass haffu123 \
        -keypass haffu123 \
        -dname "CN=Haffu, OU=Kids, O=HaffuGames, L=City, S=State, C=IN"
fi

# 5. Sign APK
echo "[5/5] Signing APK with apksigner..."
mkdir -p public dist android/app/build/outputs/apk/debug

apksigner sign \
    --ks "$KEYSTORE" \
    --ks-key-alias haffu \
    --ks-pass pass:haffu123 \
    --key-pass pass:haffu123 \
    --out "public/haffu-quiz-game.apk" \
    "$BUILD_DIR/aligned.apk"

# Verify signature
echo "=== Verifying APK Signature ==="
apksigner verify --verbose "public/haffu-quiz-game.apk"

# Copy output to standard paths
cp "public/haffu-quiz-game.apk" "dist/haffu-quiz-game.apk"
cp "public/haffu-quiz-game.apk" "android/app/build/outputs/apk/debug/app-debug.apk"

APK_SIZE=$(du -h "public/haffu-quiz-game.apk" | cut -f1)
echo "=========================================================="
echo " SUCCESS: Native Java APK ready! ($APK_SIZE)"
echo " Path: public/haffu-quiz-game.apk"
echo " Path: android/app/build/outputs/apk/debug/app-debug.apk"
echo "=========================================================="
