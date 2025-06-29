// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: [
      '*.ngrok-free.app'  // ✅ allows any subdomain from ngrok
    ]
  }
});
