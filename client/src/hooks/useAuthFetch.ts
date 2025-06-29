import { useState, useEffect } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    env: {
      API_URL?: string;
    };
  }
}

interface UseAuthFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  data?: any;
  params?: any;
}

export const useAuthFetch = (url: string, options: UseAuthFetchOptions = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...(options.headers || {}),
        };

        const response = await axios({
          url: `${window.env?.API_URL || 'http://localhost:3001/api'}${url}`,
          method: options.method || 'GET',
          headers,
          data: options.data,
          params: options.params,
        });

        setData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options.method, options.headers, options.data, options.params]);

  return { data, loading, error };
};
