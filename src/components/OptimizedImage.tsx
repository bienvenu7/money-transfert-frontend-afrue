import {
  getBestImageFormat,
  getOptimizedImageUrl,
  preloadImage,
  type IFormatImage,
} from '@/utils/assets';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface OptimizedImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  blur?: number;
  lazy?: boolean;
  placeholder?: string;
  fallback?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  quality = 80,
  format,
  blur,
  lazy = true,
  placeholder,
  fallback,
  onLoad,
  onError,
  className = '',
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState<string>(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Get the best format if not specified
  const imageFormat = format || getBestImageFormat();

  // Generate optimized image URL
  const optimizedSrc = getOptimizedImageUrl(src, {
    width,
    height,
    quality,
    format: imageFormat as IFormatImage,
    blur,
  });

  const loadImage = useCallback(async () => {
    try {
      await preloadImage(optimizedSrc);
      setImageSrc(optimizedSrc);
      setIsLoaded(true);
      onLoad?.();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load image:', error);
      if (fallback) {
        setImageSrc(fallback);
      }
      setHasError(true);
      onError?.();
    }
  }, [optimizedSrc, fallback, onLoad, onError]);

  useEffect(() => {
    if (!lazy) {
      loadImage();
    }
  }, [lazy, loadImage]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || !imgRef.current) return;

    const currentRef = imgRef.current;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [lazy, loadImage]);

  const handleError = () => {
    if (fallback && imageSrc !== fallback) {
      setImageSrc(fallback);
    } else {
      setHasError(true);
    }
    onError?.();
  };

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={`optimized-image ${isLoaded ? 'loaded' : 'loading'} ${
        hasError ? 'error' : ''
      } ${className}`}
      onError={handleError}
      loading={lazy ? 'lazy' : 'eager'}
      {...props}
    />
  );
};

// CSS for the optimized image component (add to your CSS file)
export const optimizedImageStyles = `
.optimized-image {
  transition: opacity 0.3s ease;
}

.optimized-image.loading {
  opacity: 0.5;
}

.optimized-image.loaded {
  opacity: 1;
}

.optimized-image.error {
  opacity: 0.3;
  background-color: #f0f0f0;
}
`;
