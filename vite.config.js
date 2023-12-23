import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
const pkg = require('./package.json');

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: `dist/${pkg.version}`,
    cssCodeSplit: true,
    sourcemap: false,
    manifest: true,
    rollupOptions: {
      output: {
        entryFileNames: `js/bendar-bmi-calculator.${pkg.version}.js`,
        chunkFileNames: `js/bendar-bmi-calculator-vendors.${pkg.version}.js`,
        assetFileNames: `css/bendar-bmi-calculator.${pkg.version}.[ext]`,
      },
    },
  },

  server: {
    port: 3000,
  },

  define: {
    // Add any global constants here if needed
  },

  resolve: {
    alias: {
      // Add any aliases here if needed
    },
  },

  optimizeDeps: {
    include: ['vue'],
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
