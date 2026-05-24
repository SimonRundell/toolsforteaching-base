/**
 * Hook for fetching the public apps list from the API.
 * @license CC BY-NC-SA 4.0
 */
import { useState, useEffect } from 'react';
import client from '../api/client';

/**
 * @returns {{ apps: Array, loading: boolean, error: string|null, reload: Function }}
 */
export function useApps() {
  const [apps,    setApps]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await client.get('/apps.php');
      setApps(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.error ?? 'Failed to load tools');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return { apps, loading, error, reload: load };
}
