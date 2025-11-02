# Internationalization (i18n) Setup

This project now includes internationalization support using `react-i18next` and `i18next`.

## Features

- ✅ French (fr) - Default language with all current app texts
- ✅ Russian (ru) - Complete translation of all French texts
- ✅ Language switcher component with flag icons
- ✅ Automatic language detection from browser/localStorage
- ✅ Responsive design for mobile devices

## Files Added/Modified

### New Files

- `src/i18n.ts` - i18next configuration
- `src/app/components/LanguageSwitcher.tsx` - Language switcher component
- `src/styles/language-switcher.scss` - Styles for language switcher
- `public/locales/fr/translation.json` - French translations
- `public/locales/ru/translation.json` - Russian translations

### Modified Files

- `src/app/layout.tsx` - Added i18n import and language switcher styles
- `src/app/(surf)/page.tsx` - Added language switcher to main page
- All landing page components updated to use translations:
  - `src/app/components/landing/Advantage.tsx`
  - `src/app/components/landing/Cover.tsx`
  - `src/app/components/landing/About.tsx`
  - `src/app/components/landing/Difference.tsx`
  - `src/app/components/landing/Show.tsx`
  - `src/app/components/landing/Footer.tsx`

## Usage

### Adding New Translations

1. Add new keys to both translation files:
   - `public/locales/fr/translation.json`
   - `public/locales/ru/translation.json`

2. Use in components:

   ```tsx
   import { useTranslation } from 'react-i18next';

   const MyComponent = () => {
     const { t } = useTranslation();
     return <h1>{t('my.new.key')}</h1>;
   };
   ```

### Language Switcher

The language switcher is automatically included on the main page. It:

- Shows current language with flag icons
- Persists language choice in localStorage
- Has a modern glass-morphism design
- Is responsive for mobile devices

### Translation Structure

```json
{
  "common": {
    /* Common UI elements */
  },
  "navigation": {
    /* Navigation items */
  },
  "hero": {
    /* Hero section content */
  },
  "about": {
    /* About section */
  },
  "advantages": {
    /* Advantages section */
  },
  "difference": {
    /* Difference comparison */
  },
  "showcase": {
    /* Showcase section */
  },
  "transaction": {
    /* Transaction forms */
  },
  "footer": {
    /* Footer content */
  },
  "meta": {
    /* SEO meta content */
  }
}
```

## Dependencies Added

- `react-i18next` - React integration for i18next
- `i18next` - Core internationalization framework
- `i18next-browser-languagedetector` - Browser language detection

## Browser Support

- Language detection from browser settings
- Fallback to French if language not supported
- localStorage persistence across sessions
- Responsive design for all screen sizes
