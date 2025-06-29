import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

declare global {
  interface Window {
    env: {
      API_URL?: string;
    };
  }
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'STUDENT' | 'SELLER' | 'ADMIN';
  wallet?: {
    id: string;
    balance: number;
  };
}

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  initialize: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  fetchCurrentUser: () => Promise<User | null>;
  updateUser: (updates: Partial<User>) => void;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create a custom storage object that works with Next.js 13+
const storage = {
  getItem: async (name: string): Promise<string | null> => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          console.log('Attempting login with:', { email }); // Don't log password for security
          
          // Configure axios with CORS and credentials
          const axiosInstance = axios.create({
            baseURL: API_URL,
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const response = await axiosInstance.post('/auth/login', { email, password });
          console.log('Login response status:', response.status);
          console.log('Login response data:', response.data);
          
          const { user, access_token } = response.data;
          console.log('Extracted token:', access_token);
          console.log('Token type:', typeof access_token);
          
          if (!access_token) {
            console.error('No token received in response');
            throw new Error('No token received from server');
          }

          // Ensure token is a string
          if (typeof access_token !== 'string') {
            console.error('Token is not a string:', typeof access_token);
            throw new Error('Invalid token type received');
          }

          // Store token in localStorage
          localStorage.setItem('token', access_token);
          console.log('Token stored in localStorage');
          
          // Update auth state
          set({
            user,
            token: access_token,
            isAuthenticated: true,
            isLoading: false,
          });
          console.log('Auth state updated');
          console.log('User data:', user);
          console.log('Token:', access_token);
        } catch (error: any) {
          console.error('Login error:', error);
          if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
          }
          set({
            error: error.response?.data?.message || 'Login failed',
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
          const { user, access_token } = response.data;
          
          // Store token in localStorage
          localStorage.setItem('token', access_token);
          
          set({
            user,
            token: access_token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Registration failed',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      clearError: () => set({ error: null }),

      initialize: async () => {
        const { checkAuth } = get();
        await checkAuth();
      },

      checkAuth: async (): Promise<boolean> => {
        const { token } = get();
        if (!token) return false;

        set({ isLoading: true });
        try {
          const response = await axios.get(`${API_URL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          set({
            user: response.data,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch (error) {
          console.error('Auth check failed:', error);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem('auth-storage');
          }
          return false;
        }
      },

      fetchCurrentUser: async (): Promise<User | null> => {
        const { token } = get();
        if (!token) return null;

        try {
          const response = await axios.get(`${API_URL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = response.data;
          set({ user: userData });
          return userData;
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          return null;
        }
      },

      updateUser: (updates: Partial<User>) => {
        set(state => ({
          user: state.user ? { ...state.user, ...updates } : null
        }));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => storage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
