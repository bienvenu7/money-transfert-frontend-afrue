# Prettier & ESLint Configuration Guide

This guide explains the Prettier and ESLint configuration set up for your project, optimized for Node.js v22.18.0.

## 🎯 **What's Configured**

### **Prettier Configuration**

- **Code formatting** with consistent style across the project
- **Single quotes** for strings and JSX
- **Semicolons** enabled
- **2-space indentation** (no tabs)
- **80 character line width**
- **Trailing commas** for ES5 compatibility
- **LF line endings** for cross-platform compatibility

### **ESLint Configuration**

- **Flat config system** (ESLint 9.x compatible)
- **TypeScript support** with strict rules
- **React hooks** validation
- **Prettier integration** to prevent conflicts
- **Node.js v22** compatibility with ES2024 features
- **Modern JavaScript** best practices

## 📁 **Configuration Files**

### **`.prettierrc`**

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "embeddedLanguageFormatting": "auto"
}
```

### **`.prettierignore`**

- Excludes build outputs, dependencies, and generated files
- Prevents formatting of minified files
- Ignores environment and log files

### **`eslint.config.js`**

- **Flat configuration** for ESLint 9.x
- **TypeScript ESLint** integration
- **React hooks** rules
- **Prettier** integration
- **Node.js v22** globals and ES2024 support

### **VS Code Settings**

- **Auto-format on save** with Prettier
- **Auto-fix ESLint** issues on save
- **Organize imports** automatically
- **Recommended extensions** for better development

## 🚀 **Available Scripts**

```bash
# Format all files with Prettier
yarn format

# Check if files are formatted correctly
yarn format:check

# Lint all TypeScript/React files
yarn lint

# Fix auto-fixable ESLint issues
yarn lint:fix

# Type check without emitting files
yarn type-check
```

## 🔧 **Key Features**

### **Prettier Integration**

- **Consistent formatting** across the entire codebase
- **No more formatting debates** - Prettier handles it
- **Integration with ESLint** to prevent conflicts
- **VS Code integration** for real-time formatting

### **ESLint Rules**

- **TypeScript strict mode** with proper type checking
- **React hooks** exhaustive dependencies
- **No console statements** in production (warnings in dev)
- **Prefer const** over let/var
- **Unused variables** detection with underscore prefix support
- **Non-null assertions** warnings

### **Node.js v22 Compatibility**

- **ES2024 features** support
- **Modern globals** available
- **Latest ECMAScript** version (2024)
- **Node.js specific** globals included

## 📋 **ESLint Rules Summary**

### **TypeScript Rules**

- `@typescript-eslint/no-unused-vars`: Error for unused variables (except `_` prefixed)
- `@typescript-eslint/no-explicit-any`: Warning for `any` type usage
- `@typescript-eslint/no-non-null-assertion`: Warning for `!` assertions
- `@typescript-eslint/ban-ts-comment`: Warning for `@ts-ignore` comments

### **React Rules**

- `react-hooks/exhaustive-deps`: Ensures all dependencies are included
- `react-refresh/only-export-components`: Warns about non-component exports

### **General Rules**

- `no-console`: Warning for console statements
- `no-debugger`: Warning for debugger statements
- `prefer-const`: Error for variables that should be const
- `no-var`: Error for var declarations

## 🎨 **Code Style Examples**

### **Before Prettier**

```typescript
const user = {
  name: 'John',
  age: 30,
  isActive: true,
};

function greetUser(user: User) {
  if (user.isActive) {
    console.log(`Hello ${user.name}!`);
  }
}
```

### **After Prettier**

```typescript
const user = {
  name: 'John',
  age: 30,
  isActive: true,
};

function greetUser(user: User) {
  if (user.isActive) {
    console.log(`Hello ${user.name}!`);
  }
}
```

## 🔍 **VS Code Integration**

### **Recommended Extensions**

- **Prettier - Code formatter**
- **ESLint**
- **TypeScript Importer**
- **Auto Rename Tag**
- **Path Intellisense**

### **Settings Applied**

- Format on save enabled
- ESLint auto-fix on save
- Import organization on save
- TypeScript strict mode

## 🚨 **Common Issues & Solutions**

### **Prettier Conflicts**

If you see formatting conflicts:

```bash
# Run Prettier to fix formatting
yarn format

# Then run ESLint to fix other issues
yarn lint:fix
```

### **ESLint Warnings**

Common warnings and how to fix them:

1. **Unused variables**: Prefix with `_` or remove
2. **Missing dependencies**: Add to useEffect dependency array
3. **Console statements**: Use `debugLog` helper or add eslint-disable comment
4. **Non-null assertions**: Add proper null checks

### **TypeScript Errors**

- Use proper type annotations
- Avoid `any` type when possible
- Use type guards for unknown types

## 📊 **Performance Benefits**

### **Development Experience**

- **Consistent code style** across team
- **Automatic formatting** saves time
- **Early error detection** with ESLint
- **Type safety** with TypeScript

### **Code Quality**

- **Enforced best practices**
- **Reduced bugs** through strict rules
- **Better maintainability**
- **Improved readability**

## 🔄 **Workflow Integration**

### **Pre-commit Hooks** (Optional)

You can add pre-commit hooks to ensure code quality:

```bash
# Install husky and lint-staged
yarn add -D husky lint-staged

# Add to package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

### **CI/CD Integration**

Add to your CI pipeline:

```yaml
- name: Lint and Format Check
  run: |
    yarn lint
    yarn format:check
    yarn type-check
```

## 🎯 **Best Practices**

1. **Always run `yarn format`** before committing
2. **Fix ESLint warnings** before pushing
3. **Use TypeScript** types instead of `any`
4. **Follow React hooks** dependency rules
5. **Use `debugLog`** instead of `console.log`
6. **Add proper error handling** for async operations

## 🆘 **Troubleshooting**

### **ESLint Not Working**

- Check if extensions are installed
- Restart VS Code
- Run `yarn lint` to see errors

### **Prettier Not Formatting**

- Check VS Code settings
- Ensure Prettier extension is enabled
- Run `yarn format` manually

### **TypeScript Errors**

- Run `yarn type-check`
- Check `tsconfig.json` settings
- Ensure proper type imports

## 📚 **Additional Resources**

- [Prettier Documentation](https://prettier.io/docs/en/)
- [ESLint Documentation](https://eslint.org/docs/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [React Hooks ESLint Plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks)

---

Your project is now configured with industry-standard code formatting and linting tools, optimized for Node.js v22 and modern React development! 🎉
