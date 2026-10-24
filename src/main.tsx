import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Automatically register service worker in production browser environments (skip in WebViews)
if (import.meta.env.PROD && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  const isWebView = /wv|Android.*Version\/[0-9.]+/i.test(navigator.userAgent);
  if (!isWebView) {
    import('virtual:pwa-register')
      .then(({ registerSW }) => {
        try {
          registerSW({ immediate: true });
        } catch (e) {
          console.warn('PWA service worker registration bypassed:', e);
        }
      })
      .catch((e) => {
        console.warn('PWA module not active:', e);
      });
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    createRoot(rootElement).render(<App />);
  } catch (error) {
    console.error('Fatal render error:', error);
  }
}
