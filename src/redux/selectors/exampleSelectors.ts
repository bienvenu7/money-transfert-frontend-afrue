import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { ExampleState } from '../types';

// Base selector
const selectExampleState = (state: RootState): ExampleState => state.example;

// Simple selectors
export const selectExample = selectExampleState;
export const selectExampleItems = (state: RootState) => state.example.items;
export const selectExampleCount = (state: RootState) => state.example.count;
export const selectExampleLoading = (state: RootState) =>
  state.example.isLoading;
export const selectExampleError = (state: RootState) => state.example.error;

// Memoized selectors using createSelector
export const selectExampleStats = createSelector(
  [selectExampleItems, selectExampleCount],
  (items, count) => ({
    totalItems: items.length,
    count,
    hasItems: items.length > 0,
  })
);

export const selectExampleWithStats = createSelector(
  [selectExample, selectExampleStats],
  (example, stats) => ({
    ...example,
    stats,
  })
);

export const selectFilteredItems = createSelector(
  [selectExampleItems, (_, filter: string) => filter],
  (items, filter) => {
    if (!filter) return items;
    return items.filter(item =>
      item.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export const selectExampleLoadingState = createSelector(
  [selectExampleLoading, selectExampleError],
  (isLoading, error) => ({
    isLoading,
    error,
    hasError: !!error,
  })
);
