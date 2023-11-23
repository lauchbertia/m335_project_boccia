import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'demo.app',
  appName: 'demo-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      imagePath: 'android\app\resources\splash.png'
    }
  }
};

export default config;
