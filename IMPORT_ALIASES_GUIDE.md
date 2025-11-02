# Import Aliases Configuration Guide

This guide explains the `@` import aliases configured in your project for clean, maintainable imports.

## 🎯 **What's Configured**

### **Path Aliases**

- **`@/*`** → `src/*` (root source directory)
- **`@/components/*`** → `src/components/*`
- **`@/pages/*`** → `src/pages/*`
- **`@/assets/*`** → `src/assets/*`
- **`@/hooks/*`** → `src/hooks/*`
- **`@/lib/*`** → `src/lib/*`
- **`@/utils/*`** → `src/utils/*`
- **`@/styles/*`** → `src/styles/*`
- **`@/types/*`** → `types/*`
- **`@/providers/*`** → `src/providers/*`
- **`@/redux/*`** → `src/redux/*`

## 📁 **Configuration Files**

### **TypeScript Configuration (`tsconfig.app.json`)**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/pages/*": ["src/pages/*"],
      "@/assets/*": ["src/assets/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/lib/*": ["src/lib/*"],
      "@/utils/*": ["src/utils/*"],
      "@/styles/*": ["src/styles/*"],
      "@/types/*": ["types/*"],
      "@/providers/*": ["src/providers/*"],
      "@/redux/*": ["src/redux/*"]
    }
  }
}
```

### **Vite Configuration (`vite.config.ts`)**

```typescript
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
}
```

### **VS Code Settings (`.vscode/settings.json`)**

```json
{
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "typescript.suggest.autoImports": true,
  "typescript.suggest.paths": true,
  "typescript.preferences.includePackageJsonAutoImports": "auto"
}
```

## 🚀 **Usage Examples**

### **✅ RECOMMENDED: Using @ Aliases**

```typescript
// Components
import { OptimizedImage } from '@/components/OptimizedImage';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';

// Utilities
import { config, getApiUrl } from '@/utils/config';
import { getOptimizedImageUrl } from '@/utils/assets';
import { formatDate, validateEmail } from '@/utils/helpers';

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useApi } from '@/hooks/useApi';

// Types
import type { User } from '@/types/user';
import type { ApiResponse } from '@/types/api';
import type { Theme } from '@/types/theme';

// Providers
import { AuthProvider } from '@/providers/AuthProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

// Redux
import { store } from '@/redux/store';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

// Assets
import logoImage from '@/assets/logo.png';
import heroImage from '@/assets/images/hero.jpg';
import iconSvg from '@/assets/icons/icon.svg';

// Styles
import '@/styles/globals.css';
import '@/styles/components.css';
```

### **❌ AVOID: Relative Imports**

```typescript
// ❌ Hard to maintain relative imports
import { config } from '../utils/config';
import { OptimizedImage } from '../components/OptimizedImage';
import { useAuth } from '../../hooks/useAuth';

// ❌ Deep relative imports
import { config } from '../../../utils/config';
import { Button } from '../../../../components/Button';
```

## 🎨 **Import Organization**

### **Recommended Import Order**

```typescript
// 1. React and external libraries
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// 2. Internal components (using @ aliases)
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';

// 3. Hooks
import { useAuth } from '@/hooks/useAuth';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// 4. Utilities and helpers
import { config } from '@/utils/config';
import { formatDate } from '@/utils/helpers';

// 5. Types
import type { User } from '@/types/user';
import type { ApiResponse } from '@/types/api';

// 6. Assets
import logoImage from '@/assets/logo.png';

// 7. Styles
import '@/styles/globals.css';
```

## 🔧 **VS Code Features**

### **Auto-Import with @ Aliases**

- **Type `@/`** and VS Code will suggest available paths
- **Auto-complete** for all configured aliases
- **Go to definition** works with @ imports
- **Refactoring** maintains @ imports when moving files

### **IntelliSense Support**

- **Path suggestions** as you type
- **Import organization** on save
- **Auto-import** for unused imports
- **Type checking** with proper path resolution

## 📊 **Benefits**

### **Maintainability**

- **No more `../../../`** chains
- **Easy refactoring** when moving files
- **Consistent imports** across the project
- **Clear project structure**

### **Developer Experience**

- **Faster imports** with auto-complete
- **Better IntelliSense** support
- **Easier navigation** with go-to-definition
- **Reduced cognitive load**

### **Team Collaboration**

- **Consistent import style** across team
- **Easier code reviews**
- **Reduced merge conflicts**
- **Better onboarding** for new developers

## 🚨 **Common Issues & Solutions**

### **Import Not Found**

```bash
# Check if the file exists
ls src/components/Button.tsx

# Verify TypeScript configuration
yarn type-check

# Restart VS Code TypeScript server
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### **VS Code Not Suggesting @ Imports**

1. **Restart TypeScript server** in VS Code
2. **Check VS Code settings** for import preferences
3. **Verify `tsconfig.json`** path configuration
4. **Reload VS Code window**

### **Build Errors with @ Imports**

```bash
# Check Vite configuration
yarn dev

# Verify path resolution
yarn type-check

# Check for typos in import paths
```

## 🎯 **Best Practices**

### **1. Use Specific Aliases**

```typescript
// ✅ Good: Specific and clear
import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';

// ❌ Avoid: Too generic
import { Button } from '@/Button';
import { useAuth } from '@/useAuth';
```

### **2. Consistent Import Style**

```typescript
// ✅ Good: Consistent naming
import { OptimizedImage } from '@/components/OptimizedImage';
import { useOptimizedImage } from '@/hooks/useOptimizedImage';

// ❌ Avoid: Inconsistent naming
import { OptimizedImage } from '@/components/OptimizedImage';
import { useOptimizedImage } from '@/hooks/useOptimizedImage';
```

### **3. Group Related Imports**

```typescript
// ✅ Good: Grouped by functionality
import { Button, Modal, Input } from '@/components';
import { useAuth, useTheme } from '@/hooks';
import { config, helpers } from '@/utils';
```

### **4. Use Type Imports**

```typescript
// ✅ Good: Explicit type imports
import type { User } from '@/types/user';
import type { ApiResponse } from '@/types/api';

// ❌ Avoid: Mixed imports
import { User, ApiResponse } from '@/types';
```

## 🔄 **Migration Guide**

### **Converting Existing Relative Imports**

```typescript
// Before: Relative imports
import { config } from '../utils/config';
import { Button } from '../components/Button';

// After: @ alias imports
import { config } from '@/utils/config';
import { Button } from '@/components/Button';
```

### **VS Code Refactoring**

1. **Select the import statement**
2. **Right-click → "Refactor"**
3. **Choose "Convert to @ import"**
4. **Apply the change**

## 📚 **Additional Resources**

- [TypeScript Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
- [Vite Alias Configuration](https://vitejs.dev/config/shared-options.html#resolve-alias)
- [VS Code TypeScript Settings](https://code.visualstudio.com/docs/languages/typescript)

---

Your project now has clean, maintainable imports with `@` aliases! 🎉
