#!/usr/bin/env bash
set -eo pipefail

echo "=================================================="
echo "  Haffu Quiz Game - Production Android APK Builder "
echo "=================================================="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${ROOT_DIR}"

# 1. Build production web assets
echo "[1/7] Building web production assets (Vite)..."
npm run build

if [ ! -f "dist/index.html" ]; then
  echo "[-] Error: dist/index.html is missing after build." >&2
  exit 1
fi

# 2. Sync with Capacitor
if command -v npx >/dev/null 2>&1; then
  echo "[2/7] Synchronizing with Capacitor Android..."
  npx cap sync android || true
fi

# 3. Setup temporary APK build workspace
echo "[3/7] Setting up Android build workspace..."
BUILD_DIR="/tmp/haffu-apk-build"
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR/src/com/haffu/quizgame"
mkdir -p "$BUILD_DIR/gen"
mkdir -p "$BUILD_DIR/bin"
mkdir -p "$BUILD_DIR/res/values"
mkdir -p "$BUILD_DIR/res/xml"
mkdir -p "$BUILD_DIR/res/drawable"
mkdir -p "$BUILD_DIR/res/mipmap-hdpi"
mkdir -p "$BUILD_DIR/res/mipmap-mdpi"
mkdir -p "$BUILD_DIR/res/mipmap-xhdpi"
mkdir -p "$BUILD_DIR/res/mipmap-xxhdpi"
mkdir -p "$BUILD_DIR/res/mipmap-xxxhdpi"
mkdir -p "$BUILD_DIR/assets"

# Copy dist bundle into assets
cp -r dist "$BUILD_DIR/assets/"

# Copy launcher icons
cp public/pwa-512x512.png "$BUILD_DIR/res/mipmap-xxxhdpi/ic_launcher.png"
cp public/pwa-512x512.png "$BUILD_DIR/res/mipmap-xxxhdpi/ic_launcher_round.png"
cp public/pwa-192x192.png "$BUILD_DIR/res/mipmap-xxhdpi/ic_launcher.png"
cp public/pwa-192x192.png "$BUILD_DIR/res/mipmap-xxhdpi/ic_launcher_round.png"
cp public/pwa-192x192.png "$BUILD_DIR/res/mipmap-xhdpi/ic_launcher.png"
cp public/pwa-192x192.png "$BUILD_DIR/res/mipmap-xhdpi/ic_launcher_round.png"
cp public/pwa-192x192.png "$BUILD_DIR/res/mipmap-hdpi/ic_launcher.png"
cp public/pwa-192x192.png "$BUILD_DIR/res/mipmap-hdpi/ic_launcher_round.png"
cp public/pwa-192x192.png "$BUILD_DIR/res/mipmap-mdpi/ic_launcher.png"
cp public/pwa-192x192.png "$BUILD_DIR/res/mipmap-mdpi/ic_launcher_round.png"

# Write strings.xml
cat << 'EOF' > "$BUILD_DIR/res/values/strings.xml"
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Haffu Quiz Game</string>
</resources>
EOF

# Write network_security_config.xml
cat << 'EOF' > "$BUILD_DIR/res/xml/network_security_config.xml"
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
</network-security-config>
EOF

# Write AndroidManifest.xml
cat << 'EOF' > "$BUILD_DIR/AndroidManifest.xml"
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.haffu.quizgame"
    android:versionCode="1"
    android:versionName="1.0.0">

    <uses-sdk android:minSdkVersion="21" android:targetSdkVersion="34" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:allowBackup="true"
        android:hardwareAccelerated="true"
        android:usesCleartextTraffic="true"
        android:networkSecurityConfig="@xml/network_security_config">
        <activity
            android:name="com.haffu.quizgame.MainActivity"
            android:label="@string/app_name"
            android:screenOrientation="portrait"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
EOF

# Write bulletproof MainActivity.java
cat << 'EOF' > "$BUILD_DIR/src/com/haffu/quizgame/MainActivity.java"
package com.haffu.quizgame;

import android.app.Activity;
import android.content.res.AssetManager;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends Activity {
    private static final String TAG = "HaffuQuiz";
    private WebView mWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

        mWebView = new WebView(this);
        mWebView.setBackgroundColor(Color.parseColor("#1e1b4b")); // Dark purple matching app theme

        WebSettings settings = mWebView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);

        mWebView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onConsoleMessage(ConsoleMessage cm) {
                Log.d(TAG, cm.message() + " -- From line " + cm.lineNumber() + " of " + cm.sourceId());
                return true;
            }
        });

        mWebView.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                // Intercept both local https origin and standard asset requests
                if (url.startsWith("https://localhost/") || url.startsWith("http://localhost/") || url.startsWith("https://appassets.local/")) {
                    String path = request.getUrl().getPath();
                    if (path == null || path.equals("/") || path.isEmpty()) {
                        path = "index.html";
                    }
                    if (path.startsWith("/")) {
                        path = path.substring(1);
                    }
                    try {
                        AssetManager am = getAssets();
                        InputStream is = am.open("dist/" + path);
                        String mimeType = getMimeType(path);
                        Map<String, String> headers = new HashMap<String, String>();
                        headers.put("Access-Control-Allow-Origin", "*");
                        headers.put("Access-Control-Allow-Methods", "GET, OPTIONS");
                        headers.put("Access-Control-Allow-Headers", "*");
                        return new WebResourceResponse(mimeType, "UTF-8", 200, "OK", headers, is);
                    } catch (Exception e) {
                        Log.e(TAG, "Asset not found: " + path, e);
                    }
                }
                return super.shouldInterceptRequest(view, request);
            }

            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                Log.e(TAG, "WebView error: " + description + " for " + failingUrl);
            }
        });

        // Load via https origin so ES modules have full same-origin CORS support
        mWebView.loadUrl("https://localhost/index.html");
        setContentView(mWebView);
    }

    private String getMimeType(String path) {
        String lower = path.toLowerCase();
        if (lower.endsWith(".html")) return "text/html";
        if (lower.endsWith(".js") || lower.endsWith(".mjs")) return "application/javascript";
        if (lower.endsWith(".css")) return "text/css";
        if (lower.endsWith(".json") || lower.endsWith(".webmanifest")) return "application/json";
        if (lower.endsWith(".png")) return "image/png";
        if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
        if (lower.endsWith(".svg")) return "image/svg+xml";
        if (lower.endsWith(".ico")) return "image/x-icon";
        if (lower.endsWith(".mp3")) return "audio/mpeg";
        if (lower.endsWith(".woff2")) return "font/woff2";
        if (lower.endsWith(".woff")) return "font/woff";
        if (lower.endsWith(".ttf")) return "font/ttf";
        return "application/octet-stream";
    }

    @Override
    public void onBackPressed() {
        if (mWebView != null && mWebView.canGoBack()) {
            mWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
EOF

# 4. Compile Android Resources with aapt
echo "[4/7] Compiling Android resources with aapt..."
aapt package -f -m \
    -J "$BUILD_DIR/gen" \
    -M "$BUILD_DIR/AndroidManifest.xml" \
    -S "$BUILD_DIR/res" \
    -I /tmp/android.jar

# 5. Compile Java Source Files
echo "[5/7] Compiling Java source files..."
javac -encoding UTF-8 \
    -classpath /tmp/android.jar \
    -d "$BUILD_DIR/bin" \
    "$BUILD_DIR/gen/com/haffu/quizgame/R.java" \
    "$BUILD_DIR/src/com/haffu/quizgame/MainActivity.java"

# 6. Convert Bytecode to Dalvik Executable (classes.dex) with D8
echo "[6/7] Converting bytecode to Dalvik executable (classes.dex)..."
java -cp /tmp/r8.jar com.android.tools.r8.D8 \
    --min-api 21 \
    --lib /tmp/android.jar \
    --output "$BUILD_DIR" \
    $(find "$BUILD_DIR/bin" -name "*.class")

# 7. Package, Align, and Sign APK
echo "[7/7] Packaging and signing APK..."
aapt package -f \
    -M "$BUILD_DIR/AndroidManifest.xml" \
    -S "$BUILD_DIR/res" \
    -A "$BUILD_DIR/assets" \
    -I /tmp/android.jar \
    -F "$BUILD_DIR/unaligned.apk"

# Add classes.dex into unaligned.apk
(cd "$BUILD_DIR" && aapt add unaligned.apk classes.dex)

# Align APK
zipalign -v -p 4 "$BUILD_DIR/unaligned.apk" "$BUILD_DIR/aligned.apk"

# Persistent signing keystore
KEYSTORE="${ROOT_DIR}/scripts/haffu-key.jks"
if [ ! -f "$KEYSTORE" ]; then
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

# Sign APK
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

# Copy to dist for production web serving
mkdir -p dist
cp "public/haffu-quiz-game.apk" "dist/haffu-quiz-game.apk"

APK_SIZE=$(du -h "public/haffu-quiz-game.apk" | cut -f1)
echo "=================================================="
echo " SUCCESS: public/haffu-quiz-game.apk ready! ($APK_SIZE)"
echo "=================================================="
