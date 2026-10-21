import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.haffu.quizgame',
  appName: 'Haffu Quiz Game',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    cleartext: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#581c87',
      showSpinner: false,
      androidSplashResourceName: 'splash',
    },
  },
};

export default config;
