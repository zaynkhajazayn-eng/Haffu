package com.haffu.quizgame;

import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;

public class WebViewActivity extends Activity {
    private static final String TAG = "HaffuQuizWebView";
    private static final String APP_URL = "file:///android_asset/public/index.html";

    private WebView mWebView;
    private FrameLayout mRootContainer;
    private LinearLayout mErrorLayout;
    private TextView mErrorTextView;
    private boolean mHasError = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        );

        mRootContainer = new FrameLayout(this);
        mRootContainer.setBackgroundColor(Color.parseColor("#1e1b4b"));
        setContentView(mRootContainer);

        setupWebView();
        setupErrorView();
        loadApp();
    }

    private void setupWebView() {
        mWebView = new WebView(this);
        mWebView.setLayoutParams(new ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        ));
        mWebView.setBackgroundColor(Color.parseColor("#1e1b4b"));

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

        mWebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
                mHasError = false;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (!mHasError) showWebView();
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                super.onReceivedError(view, request, error);
                if (request != null && request.isForMainFrame()) {
                    mHasError = true;
                    CharSequence desc = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && error != null ? error.getDescription() : "Navigation error";
                    showErrorView("Unable to load game: " + desc);
                }
            }

            @SuppressWarnings("deprecation")
            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                super.onReceivedError(view, errorCode, description, failingUrl);
                if (failingUrl != null && failingUrl.equals(APP_URL)) {
                    mHasError = true;
                    showErrorView("Error: " + description);
                }
            }
        });

        mWebView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onConsoleMessage(ConsoleMessage cm) {
                Log.d(TAG, "[Console] " + cm.message());
                return true;
            }
        });

        mRootContainer.addView(mWebView);
    }

    private void setupErrorView() {
        mErrorLayout = new LinearLayout(this);
        mErrorLayout.setOrientation(LinearLayout.VERTICAL);
        mErrorLayout.setGravity(android.view.Gravity.CENTER);
        mErrorLayout.setBackgroundColor(Color.parseColor("#1e1b4b"));
        mErrorLayout.setPadding(48, 48, 48, 48);
        mErrorLayout.setLayoutParams(new ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        ));
        mErrorLayout.setVisibility(View.GONE);

        TextView emojiView = new TextView(this);
        emojiView.setText("🦁");
        emojiView.setTextSize(64);
        mErrorLayout.addView(emojiView);

        TextView titleView = new TextView(this);
        titleView.setText("Oops! Let's Try Again");
        titleView.setTextColor(Color.WHITE);
        titleView.setTextSize(22);
        titleView.setPadding(0, 24, 0, 12);
        mErrorLayout.addView(titleView);

        mErrorTextView = new TextView(this);
        mErrorTextView.setText("Something unexpected happened while loading.");
        mErrorTextView.setTextColor(Color.parseColor("#E9D5FF"));
        mErrorTextView.setPadding(0, 0, 0, 36);
        mErrorLayout.addView(mErrorTextView);

        Button retryButton = new Button(this);
        retryButton.setText("Reload Game 🔄");
        retryButton.setTextColor(Color.WHITE);
        retryButton.setBackgroundColor(Color.parseColor("#EC4899"));
        retryButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loadApp();
            }
        });
        mErrorLayout.addView(retryButton);

        mRootContainer.addView(mErrorLayout);
    }

    private void loadApp() {
        showWebView();
        if (mWebView != null) {
            mWebView.loadUrl(APP_URL);
        }
    }

    private void showWebView() {
        if (mWebView != null) mWebView.setVisibility(View.VISIBLE);
        if (mErrorLayout != null) mErrorLayout.setVisibility(View.GONE);
    }

    private void showErrorView(String message) {
        if (mWebView != null) mWebView.setVisibility(View.GONE);
        if (mErrorLayout != null) {
            if (mErrorTextView != null && message != null) {
                mErrorTextView.setText(message);
            }
            mErrorLayout.setVisibility(View.VISIBLE);
        }
    }

    @Override
    public void onBackPressed() {
        if (mWebView != null && mWebView.canGoBack()) {
            mWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (mWebView != null) mWebView.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (mWebView != null) mWebView.onPause();
    }

    @Override
    protected void onDestroy() {
        if (mWebView != null) {
            mWebView.loadUrl("about:blank");
            mWebView.stopLoading();
            if (mRootContainer != null) mRootContainer.removeView(mWebView);
            mWebView.destroy();
            mWebView = null;
        }
        super.onDestroy();
    }
}
