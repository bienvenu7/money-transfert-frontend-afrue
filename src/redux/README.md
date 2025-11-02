# Redux Toolkit Setup

This directory contains a complete Redux Toolkit setup with thunk middleware for the application.

## Structure

```
src/redux/
├── store.ts              # Main store configuration
├── types.ts              # TypeScript types and interfaces
├── hooks.ts              # Typed Redux hooks
├── ReduxProvider.tsx     # Redux Provider component
├── index.ts              # Main exports
├── slices/
│   └── exampleSlice.ts   # Example slice with sync reducers
├── thunks/
│   ├── index.ts          # Thunks exports
│   └── exampleThunks.ts  # Async thunks for example slice
├── selectors/
│   ├── index.ts          # Selectors exports
│   └── exampleSelectors.ts # Selectors for example slice
└── README.md             # This file
```

## Features

- ✅ Redux Toolkit with thunk middleware
- ✅ TypeScript support with typed hooks
- ✅ Separated concerns: slices, thunks, and selectors
- ✅ Example slice with sync reducers
- ✅ Async thunks for API calls
- ✅ Memoized selectors for performance
- ✅ Proper error handling
- ✅ Loading states
- ✅ Clean architecture with organized file structure

## Usage

### 1. Wrap your app with ReduxProvider

```tsx
import { ReduxProvider } from '@/redux';

function App() {
  return <ReduxProvider>{/* Your app components */}</ReduxProvider>;
}
```

### 2. Use typed hooks in components

```tsx
import { useAppDispatch, useAppSelector } from '@/redux';

function MyComponent() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(state => state.example.count);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
}
```

### 3. Dispatch async thunks

```tsx
import { fetchExampleData, addItemAsync } from '@/redux';

function DataComponent() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.example.isLoading);

  const handleFetch = () => {
    dispatch(fetchExampleData({ limit: 10 }));
  };

  const handleAddItem = () => {
    dispatch(addItemAsync('New Item'));
  };

  return (
    <div>
      <button onClick={handleFetch} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Data'}
      </button>
      <button onClick={handleAddItem} disabled={isLoading}>
        Add Item
      </button>
    </div>
  );
}
```

### 4. Use memoized selectors

```tsx
import { selectExampleStats, selectFilteredItems } from '@/redux';

function StatsComponent() {
  const stats = useAppSelector(selectExampleStats);
  const filteredItems = useAppSelector(state =>
    selectFilteredItems(state, 'search term')
  );

  return (
    <div>
      <p>Total Items: {stats.totalItems}</p>
      <p>Has Items: {stats.hasItems ? 'Yes' : 'No'}</p>
      <p>Filtered Items: {filteredItems.length}</p>
    </div>
  );
}
```

## File Organization

### Slices (`slices/`)

Contains only synchronous reducers and initial state. No async logic here.

### Thunks (`thunks/`)

Contains all async thunks for API calls and side effects.

### Selectors (`selectors/`)

Contains all selectors, including memoized ones for performance optimization.

## Example Implementation

The example demonstrates:

**Slice (`exampleSlice.ts`):**

- Basic reducers (increment, decrement, setCount)
- Array operations (addItem, removeItem, clearItems)
- Extra reducers for handling async thunk states

**Thunks (`exampleThunks.ts`):**

- `fetchExampleData` - Fetch data with loading states
- `addItemAsync` - Add item with API simulation
- `removeItemAsync` - Remove item with API simulation

**Selectors (`exampleSelectors.ts`):**

- Simple selectors for direct state access
- Memoized selectors for computed values
- Parameterized selectors for filtering

## Adding New Features

### 1. Add a new slice

1. Create slice file in `slices/`
2. Add reducer to `store.ts`
3. Export from `slices/index.ts`

### 2. Add async thunks

1. Create thunk file in `thunks/`
2. Import thunks in your slice's `extraReducers`
3. Export from `thunks/index.ts`

### 3. Add selectors

1. Create selector file in `selectors/`
2. Use `createSelector` for memoized selectors
3. Export from `selectors/index.ts`

## Best Practices

- Use selectors for accessing state
- Keep slices focused on a single domain
- Use async thunks for API calls
- Handle loading and error states
- Use TypeScript for type safety
