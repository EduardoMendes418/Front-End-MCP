import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useApi = (endpoint: string, initialData: any = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let result;
        
        switch (endpoint) {
          case 'users':
            result = await apiService.getUsers();
            break;
          case 'products':
            result = await apiService.getProducts();
            break;
          case 'sales':
            result = await apiService.getSales();
            break;
          case 'dashboard':
            result = await apiService.getDashboardData();
            break;
          default:
            result = initialData;
        }
        
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, initialData]);

  return { data, loading, error };
};