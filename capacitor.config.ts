import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.haffu.quizgame',
  appName: 'Haffu Quiz Game',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
