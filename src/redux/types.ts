// Common Redux types and interfaces

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Example state interface
export interface ExampleState extends LoadingState {
  items: string[];
  count: number;
}

// Async thunk types
export interface AsyncThunkConfig {
  state: any;
  dispatch: any;
  extra?: any;
  rejectValue?: any;
  serializedErrorType?: any;
  pendingMeta?: any;
  fulfilledMeta?: any;
  rejectedMeta?: any;
}
