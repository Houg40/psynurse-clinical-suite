import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const now = new Date();
const buildTime = now.getTime();
const buildDate = now.toISOString();

function versionPlugin() {
  return {
    name: 'version-generator',
    buildStart() {
      try {
        const versionData = JSON.stringify({ version: '1.1.0', buildTime, buildDate }, null, 2);
        fs.writeFileSync(path.resolve(import.meta.dirname, 'public/version.json'), versionData);
      } catch (e) {
        console.warn('Could not write public/version.json:', e);
      }
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: JSON.stringify({ version: '1.1.0', buildTime, buildDate }, null, 2)
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), versionPlugin()],
  base: './',
  define: {
    __APP_BUILD_TIME__: JSON.stringify(buildTime),
    __APP_BUILD_DATE__: JSON.stringify(buildDate),
    __APP_VERSION__: JSON.stringify('1.1.0')
  }
})

