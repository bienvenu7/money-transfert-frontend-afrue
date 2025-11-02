import { getAuth } from '@/lib/auth';
import type { IClientResponse } from '@/types/user';
import { clearAuthCookies, getCookie } from '@/utils/cookies';
import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Auth State Interface
interface AuthState {
  isAuthenticated: boolean;
  user: IClientResponse | null;
  isLoading: boolean;
  error: string | null;
}

// Auth Context Interface
interface AuthContextType {
  state: AuthState;
  resetState: () => void;
  fillState: (user: IClientResponse) => void;
  setSelectedCode: (code: string) => void;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    error: null,
  });

  const navigate = useNavigate();

  // Initialize auth state from cookies
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken = getCookie('accessToken');

        // Check if we're on a login page - if so, clear everything and don't auto-login
        const isOnLoginPage = window.location.pathname.includes('/auth');

        if (accessToken) {
          try {
            // Validate token by making API call
            const user = await getAuth();

            setState(prev => ({
              ...prev,
              isAuthenticated: true,
              user,
              isLoading: false,
              error: null,
            }));

            if (isOnLoginPage) {
              return navigate('/');
            }
          } catch {
            clearAuthCookies();
            setState(prev => ({
              ...prev,
              isLoading: false,
              error: 'Token validation failed, clearing auth data',
            }));
          }
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
          clearAuthCookies();
        }
      } catch {
        clearAuthCookies();
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, [navigate]);

  const resetState = () => {
    clearAuthCookies();
    setState({
      error: null,
      isAuthenticated: false,
      isLoading: false,
      user: null,
    });
  };

  const fillState = (user: IClientResponse) => {
    setState({
      error: null,
      isLoading: false,
      isAuthenticated: true,
      user: user,
    });
  };

  const setSelectedCode = (code: string) => {
    const newValue = code === '' ? null : code;
    setState(prev => ({ ...prev, selectedCode: newValue }));
  };

  const value: AuthContextType = {
    state,
    resetState,
    fillState,
    setSelectedCode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const Auth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
