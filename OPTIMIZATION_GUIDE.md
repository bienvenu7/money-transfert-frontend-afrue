# Vite Optimization Guide

This guide explains the optimizations implemented in your Vite configuration for assets, images, and reverse proxy setup.

## 🚀 Features Implemented

### 1. Asset Optimization

- **Automatic asset inlining** for files smaller than 4KB
- **CSS code splitting** for better loading performance
- **Organized asset structure** with separate folders for images, fonts, and JS
- **Hash-based file naming** for optimal caching

### 2. Image Optimization

- **OptimizedImage component** with lazy loading
- **Format detection** (WebP, AVIF support)
- **Responsive image handling**
- **Fallback support** for failed image loads
- **Blur placeholder** support

### 3. Reverse Proxy Configuration

- **API proxy** (`/api/*` → backend server)
- **WebSocket proxy** (`/ws/*` → WebSocket server)
- **Static assets proxy** (`/static/*` → static server)

### 4. Build Optimizations

- **Terser minification** with console.log removal
- **Manual chunk splitting** for vendor libraries
- **Source map configuration**
- **Dependency pre-bundling**

## 📁 File Structure

```
src/
├── components/
│   └── OptimizedImage.tsx    # Optimized image component
├── lib/
│   ├── assets.ts            # Asset utility functions
│   └── config.ts            # Environment configuration
└── vite-env.d.ts            # TypeScript environment declarations
```

## 🛠 Usage Examples

### Using the OptimizedImage Component

```tsx
import { OptimizedImage } from '@/components/OptimizedImage'

// Basic usage
<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
/>

// With optimization options
<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
  quality={90}
  format="webp"
  lazy={true}
  placeholder="/images/hero-blur.jpg"
  fallback="/images/hero-fallback.jpg"
/>
```

### Using Asset Utilities

```tsx
import {
  getOptimizedImageUrl,
  preloadImage,
  getBestImageFormat,
} from '@/lib/assets';

// Get optimized image URL
const optimizedUrl = getOptimizedImageUrl('/images/photo.jpg', {
  width: 400,
  height: 300,
  quality: 85,
  format: 'webp',
});

// Preload critical images
await preloadImage('/images/critical-hero.jpg');

// Get best supported format
const bestFormat = getBestImageFormat(); // 'avif', 'webp', or 'jpeg'
```

### Using Configuration

```tsx
import { config, getApiUrl, debugLog } from '@/lib/config';

// Access configuration
console.log(config.app.name); // 'Afrue Webapp'
console.log(config.api.baseUrl); // 'http://localhost:8000'

// Build API URLs
const userApiUrl = getApiUrl('/users'); // 'http://localhost:8000/users'

// Debug logging (only in development)
debugLog('User data:', userData);
```

## 🔧 Environment Variables

Create a `.env.local` file in your project root:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=10000

# App Configuration
VITE_APP_NAME=Afrue Webapp
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

## 🚀 Development Commands

```bash
# Install dependencies
yarn install

# Start development server with proxy
yarn dev

# Build optimized production bundle
yarn build

# Preview production build
yarn preview
```

## 📊 Performance Benefits

### Asset Optimization

- **Smaller bundle sizes** through code splitting
- **Better caching** with hash-based filenames
- **Faster loading** with asset inlining

### Image Optimization

- **Reduced bandwidth** with modern formats (WebP, AVIF)
- **Faster page loads** with lazy loading
- **Better UX** with blur placeholders

### Build Optimizations

- **Smaller production bundles** with Terser minification
- **Better caching** with vendor chunk separation
- **Faster development** with dependency pre-bundling

## 🔄 Reverse Proxy Setup

The configuration includes three proxy endpoints:

1. **API Proxy** (`/api/*`)
   - Forwards requests to your backend API
   - Removes `/api` prefix before forwarding
   - Adds security headers

2. **WebSocket Proxy** (`/ws/*`)
   - Forwards WebSocket connections
   - Maintains connection state

3. **Static Assets Proxy** (`/static/*`)
   - Serves static files from backend
   - Useful for user uploads or generated assets

### Customizing Proxy Targets

Update the `target` URLs in `vite.config.ts`:

```typescript
proxy: {
  '/api': {
    target: 'http://your-backend-server:port',
    // ... other options
  }
}
```

## 🎯 Best Practices

1. **Use OptimizedImage** for all images in your app
2. **Set appropriate quality levels** (80-90 for photos, 95+ for graphics)
3. **Provide fallback images** for better error handling
4. **Use lazy loading** for images below the fold
5. **Preload critical images** for above-the-fold content
6. **Configure environment variables** for different deployment stages

## 🔍 Monitoring Performance

Use browser dev tools to monitor:

- **Network tab**: Check asset loading times
- **Lighthouse**: Run performance audits
- **Bundle analyzer**: Use `vite-bundle-analyzer` to analyze bundle sizes

## 📝 Additional Notes

- The configuration is optimized for modern browsers
- Image optimization works best with external services (Cloudinary, ImageKit)
- Adjust proxy targets based on your backend setup
- Consider adding service workers for offline support
- Monitor bundle sizes as your app grows

## 🆘 Troubleshooting

### Common Issues

1. **Images not loading**: Check file paths and CORS settings
2. **Proxy not working**: Verify backend server is running
3. **Build errors**: Check TypeScript types and imports
4. **Performance issues**: Use browser dev tools to identify bottlenecks

### Getting Help

- Check Vite documentation: https://vitejs.dev/
- Review React optimization guides
- Use browser dev tools for debugging
