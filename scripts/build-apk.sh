#!/bin/bash
set -e

echo "=== Building Web Dist Assets ==="
npm run build

echo "=== Setting up APK Build Workspace ==="
BUILD_DIR="/tmp/apk-build"
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR/src/com/haffu/quizgame"
mkdir -p "$BUILD_DIR/gen"
mkdir -p "$BUILD_DIR/bin"
mkdir -p "$BUILD_DIR/res/values"
mkdir -p "$BUILD_DIR/res/drawable"
mkdir -p "$BUILD_DIR/res/mipmap-hdpi"
mkdir -p "$BUILD_DIR/res/mipmap-mdpi"
mkdir -p "$BUILD_DIR/res/mipmap-xhdpi"
mkdir -p "$BUILD_DIR/res/mipmap-xxhdpi"
mkdir -p "$BUILD_DIR/res/mipmap-xxxhdpi"
mkdir -p "$BUILD_DIR/assets"

# Copy dist files into assets
cp -r dist "$BUILD_DIR/assets/"

# Copy icon
cp public/pwa-512x512.png "$BUILD_DIR/res/mipmap-xxxhdpi/ic_launcher.png"
cp public/pwa-192x192.png "$BUILD_DIR/res/mipmap-xxhdpi/ic_launcher.png"
cp public/pwa-192x192.png "$BUILD_DIR/res/mipmap-xhdpi/ic_launcher.png"
cp public/pwa-192x192.png "$BUILD_DIR/res/mipmap-hdpi/ic_launcher.png"
cp public/pwa-192x192.png "$BUILD_DIR/res/mipmap-mdpi/ic_launcher.png"

# Write strings.xml
cat << 'EOF' > "$BUILD_DIR/res/values/strings.xml"
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Haffu Quiz Game</string>
</resources>
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
        android:allowBackup="true"
        android:hardwareAccelerated="true">
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

# Write MainActivity.java
cat << 'EOF' > "$BUILD_DIR/src/com/haffu/quizgame/MainActivity.java"
package com.haffu.quizgame;

import android.app.Activity;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private WebView mWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

        mWebView = new WebView(this);
        WebSettings settings = mWebView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setMediaPlaybackRequiresUserGesture(false);

        mWebView.setWebViewClient(new WebViewClient());
        mWebView.loadUrl("file:///android_asset/dist/index.html");

        setContentView(mWebView);
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

echo "=== 1. Compiling Android Resources with aapt ==="
aapt package -f -m \
    -J "$BUILD_DIR/gen" \
    -M "$BUILD_DIR/AndroidManifest.xml" \
    -S "$BUILD_DIR/res" \
    -I /tmp/android.jar

echo "=== 2. Compiling Java Source Files ==="
javac -encoding UTF-8 \
    -classpath /tmp/android.jar \
    -d "$BUILD_DIR/bin" \
    "$BUILD_DIR/gen/com/haffu/quizgame/R.java" \
    "$BUILD_DIR/src/com/haffu/quizgame/MainActivity.java"

echo "=== 3. Converting Bytecode to Dalvik Executable (classes.dex) with D8 ==="
java -cp /tmp/r8.jar com.android.tools.r8.D8 \
    --min-api 21 \
    --lib /tmp/android.jar \
    --output "$BUILD_DIR" \
    $(find "$BUILD_DIR/bin" -name "*.class")

echo "=== 4. Packaging APK with aapt ==="
aapt package -f \
    -M "$BUILD_DIR/AndroidManifest.xml" \
    -S "$BUILD_DIR/res" \
    -A "$BUILD_DIR/assets" \
    -I /tmp/android.jar \
    -F "$BUILD_DIR/unaligned.apk"

# Add classes.dex into unaligned.apk
(cd "$BUILD_DIR" && aapt add unaligned.apk classes.dex)

echo "=== 5. Aligning APK with zipalign ==="
zipalign -v -p 4 "$BUILD_DIR/unaligned.apk" "$BUILD_DIR/aligned.apk"

echo "=== 6. Generating Keystore & Signing APK with apksigner ==="
KEYSTORE="/tmp/haffu-release.jks"
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

apksigner sign \
    --ks "$KEYSTORE" \
    --ks-key-alias haffu \
    --ks-pass pass:haffu123 \
    --key-pass pass:haffu123 \
    --out "public/haffu-quiz-game.apk" \
    "$BUILD_DIR/aligned.apk"

echo "=== 7. Verifying Signed APK ==="
apksigner verify --verbose "public/haffu-quiz-game.apk"

ls -lh "public/haffu-quiz-game.apk"
echo "=== SUCCESS: public/haffu-quiz-game.apk generated successfully! ==="
