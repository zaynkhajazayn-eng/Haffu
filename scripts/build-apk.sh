#!/usr/bin/env bash
set -eo pipefail

echo "=========================================="
echo "  Haffu Quiz Game - Android APK Builder  "
echo "=========================================="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${ROOT_DIR}"

# 1. Check Node.js and dependencies
if ! command -v node >/dev/null 2>&1; then
  echo "[-] Error: Node.js is not installed or not in PATH." >&2
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "[*] node_modules not found. Running npm install..."
  npm install
fi

# 2. Build production web assets
echo "[*] Step 1/4: Building web production assets (Vite)..."
npm run build

if [ ! -f "dist/index.html" ]; then
  echo "[-] Error: Production web build failed. dist/index.html is missing." >&2
  exit 1
fi
echo "[+] Web build successful: dist/ ready."

# 3. Synchronize with Capacitor Android project
echo "[*] Step 2/4: Synchronizing web assets with Capacitor Android..."
if ! command -v npx >/dev/null 2>&1; then
  echo "[-] Error: npx is required to run Capacitor." >&2
  exit 1
fi

npx cap sync android
echo "[+] Capacitor sync successful."

# 4. Check Java and Android SDK prerequisites
echo "[*] Step 3/4: Checking Android build prerequisites..."
if ! command -v java >/dev/null 2>&1 && [ -z "${JAVA_HOME}" ]; then
  echo "[-] Note: Java (JDK 17+) is required for local Gradle builds." >&2
  echo "    In GitHub Actions, this is automatically configured via actions/setup-java@v4." >&2
  echo "    If running locally, please install OpenJDK 17 and set JAVA_HOME." >&2
  exit 1
fi

if [ ! -f "android/gradlew" ]; then
  echo "[-] Error: android/gradlew is missing. Please run 'npx cap add android' first." >&2
  exit 1
fi

chmod +x android/gradlew

# 5. Build Android Debug APK with Gradle
echo "[*] Step 4/4: Building Android debug APK with Gradle..."
cd android
./gradlew assembleDebug --stacktrace --no-daemon
cd "${ROOT_DIR}"

EXPECTED_APK="android/app/build/outputs/apk/debug/app-debug.apk"
if [ ! -f "${EXPECTED_APK}" ]; then
  echo "[-] Error: Gradle build finished but APK was not found at ${EXPECTED_APK}." >&2
  exit 1
fi

APK_SIZE=$(du -h "${EXPECTED_APK}" | cut -f1)
echo "[+] SUCCESS: APK built successfully!"
echo "    Path: ${EXPECTED_APK}"
echo "    Size: ${APK_SIZE}"

# Copy to public and dist for in-browser download
mkdir -p public dist
cp "${EXPECTED_APK}" "public/haffu-quiz-game.apk"
cp "${EXPECTED_APK}" "dist/haffu-quiz-game.apk" 2>/dev/null || true
echo "[+] APK copied to public/haffu-quiz-game.apk"
