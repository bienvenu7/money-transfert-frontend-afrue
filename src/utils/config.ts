/**
 * Application configuration
 */

// Environment variables with fallbacks
export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:7001',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  },

  // App Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Afrue Webapp',
    version: import.meta.env.VITE_APP_VERSION || __APP_VERSION__ || '1.0.0',
  },

  // Feature Flags
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    debug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  },

  // External Services
  services: {
    googleAnalytics: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
    sentry: import.meta.env.VITE_SENTRY_DSN,
  },

  // Development
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

// Type-safe environment check
export const isDevelopment = config.isDevelopment;
export const isProduction = config.isProduction;

// API helper
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = config.api.baseUrl.replace(/\/$/, '');
  const cleanEndpoint = endpoint.replace(/^\//, '');
  return `${baseUrl}/${cleanEndpoint}`;
};

// Logging helper (respects debug flag)
export const debugLog = (...args: unknown[]): void => {
  if (config.features.debug) {
    // eslint-disable-next-line no-console
    console.log('[DEBUG]', ...args);
  }
};
