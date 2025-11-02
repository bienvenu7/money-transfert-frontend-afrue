import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Build optimization
  build: {
    // Output directory
    outDir: 'dist',

    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    cssCodeSplit: true, // Enable CSS code splitting

    // Rollup options for better bundling
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: id => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            return 'vendor';
          }
        },
        // Asset file naming for better caching
        assetFileNames: assetInfo => {
          if (!assetInfo.name) return `assets/[name]-[hash][extname]`;

          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },

    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },

    // Source maps for production debugging
    sourcemap: false, // Set to true if you need source maps in production
  },

  // Development server configuration
  server: {
    port: 3000,
    host: true, // Allow external connections
    open: true, // Auto-open browser

    // Reverse proxy configuration
    proxy: {
      // API proxy - adjust the target URL to your backend
      '/api': {
        target: 'http://82.146.49.197/v1/', // Your backend server URL
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },

  // Preview server configuration
  preview: {
    port: 4173,
    host: true,
  },

  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/pages': resolve(__dirname, 'src/pages'),
      '@/assets': resolve(__dirname, 'src/assets'),
      '@/hooks': resolve(__dirname, 'src/hooks'),
      '@/lib': resolve(__dirname, 'src/lib'),
      '@/utils': resolve(__dirname, 'src/utils'),
      '@/styles': resolve(__dirname, 'src/styles'),
      '@/types': resolve(__dirname, 'types'),
      '@/providers': resolve(__dirname, 'src/providers'),
      '@/redux': resolve(__dirname, 'src/redux'),
    },
  },

  // CSS configuration
  css: {
    devSourcemap: true,
    // PostCSS configuration (you can add postcss.config.js if needed)
  },

  // Asset handling
  assetsInclude: [
    '**/*.png',
    '**/*.jpg',
    '**/*.jpeg',
    '**/*.gif',
    '**/*.svg',
    '**/*.webp',
    '**/*.avif',
    '**/*.ico',
    '**/*.woff',
    '**/*.woff2',
    '**/*.ttf',
    '**/*.eot',
  ],

  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },

  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      // Add other dependencies that should be pre-bundled
    ],
    exclude: [
      // Exclude dependencies that should not be pre-bundled
    ],
  },
});
