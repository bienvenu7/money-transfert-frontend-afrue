/**
 * Asset utility functions for optimized image and asset handling
 */

// Image optimization types

export type IFormatImage = 'webp' | 'avif' | 'jpeg' | 'png';
export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: IFormatImage;
  blur?: number;
}

/**
 * Get optimized image URL with query parameters
 * This can be used with image optimization services like Cloudinary, ImageKit, etc.
 */
export function getOptimizedImageUrl(
  src: string,
  options: ImageOptimizationOptions = {}
): string {
  const { width, height, quality = 80, format, blur } = options;

  // If it's a local asset, return as is
  if (src.startsWith('/') || src.startsWith('./') || src.startsWith('../')) {
    return src;
  }

  // For external images, you can add optimization parameters
  // This is a placeholder - implement based on your image optimization service
  const params = new URLSearchParams();

  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  if (quality) params.set('q', quality.toString());
  if (format) params.set('f', format);
  if (blur) params.set('blur', blur.toString());

  const queryString = params.toString();
  return queryString ? `${src}?${queryString}` : src;
}

/**
 * Preload critical images
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Lazy load images with intersection observer
 */
export function lazyLoadImages(selector: string = 'img[data-src]'): void {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll(selector).forEach(img => {
      imageObserver.observe(img);
    });
  }
}

/**
 * Get responsive image sources for different screen sizes
 */
export function getResponsiveImageSources(
  baseSrc: string,
  sizes: { width: number; suffix?: string }[] = [
    { width: 320, suffix: 'sm' },
    { width: 768, suffix: 'md' },
    { width: 1024, suffix: 'lg' },
    { width: 1920, suffix: 'xl' },
  ]
): { src: string; media: string }[] {
  return sizes.map(({ width, suffix }) => ({
    src: suffix ? `${baseSrc}-${suffix}` : baseSrc,
    media: `(max-width: ${width}px)`,
  }));
}

/**
 * Convert file to base64 for small assets
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

/**
 * Check if image format is supported
 */
export function isImageFormatSupported(format: string): boolean {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  try {
    return canvas.toDataURL(`image/${format}`).indexOf(`image/${format}`) === 5;
  } catch {
    return false;
  }
}

/**
 * Get the best image format based on browser support
 */
export function getBestImageFormat(): string {
  if (isImageFormatSupported('avif')) return 'avif';
  if (isImageFormatSupported('webp')) return 'webp';
  return 'jpeg';
}
