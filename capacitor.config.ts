import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.filmotech.app',
  appName: 'filmotech',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
