import { createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching example data
export const fetchExampleData = createAsyncThunk(
  'example/fetchData',
  async (params: { limit?: number } = {}, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data
      const mockData = Array.from(
        { length: params.limit || 5 },
        (_, i) => `Item ${i + 1}`
      );

      return mockData;
    } catch (error) {
      return rejectWithValue('Failed to fetch data');
    }
  }
);

// Async thunk for adding item with API call
export const addItemAsync = createAsyncThunk(
  'example/addItemAsync',
  async (item: string, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock API response
      return { id: Date.now(), text: item };
    } catch (error) {
      return rejectWithValue('Failed to add item');
    }
  }
);

// Async thunk for removing item with API call
export const removeItemAsync = createAsyncThunk(
  'example/removeItemAsync',
  async (index: number, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      return index;
    } catch (error) {
      return rejectWithValue('Failed to remove item');
    }
  }
);
