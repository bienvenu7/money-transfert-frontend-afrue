import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from '@/providers/AuthContext';
import ToastProvider from '@/providers/ToastProvider';
import { ReduxProvider } from '@/redux';
import AppRouter from '@/router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ReduxProvider>
            <ToastProvider>
              <AppRouter />
            </ToastProvider>
          </ReduxProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
