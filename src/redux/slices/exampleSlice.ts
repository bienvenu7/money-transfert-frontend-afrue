import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  addItemAsync,
  fetchExampleData,
  removeItemAsync,
} from '../thunks/exampleThunks';
import type { ExampleState } from '../types';

// Initial state
const initialState: ExampleState = {
  items: [],
  count: 0,
  isLoading: false,
  error: null,
};

// Slice
export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    increment: state => {
      state.count += 1;
    },
    decrement: state => {
      state.count -= 1;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    addItem: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },
    clearItems: state => {
      state.items = [];
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch data
      .addCase(fetchExampleData.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExampleData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchExampleData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add item async
      .addCase(addItemAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload.text);
        state.error = null;
      })
      .addCase(addItemAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Remove item async
      .addCase(removeItemAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeItemAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.splice(action.payload, 1);
        state.error = null;
      })
      .addCase(removeItemAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  increment,
  decrement,
  setCount,
  addItem,
  removeItem,
  clearItems,
  clearError,
} = exampleSlice.actions;

// Note: Selectors are now exported from selectors/exampleSelectors.ts
