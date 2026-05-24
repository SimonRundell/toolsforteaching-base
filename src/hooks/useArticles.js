/**
 * Hook for fetching the public articles list from the API.
 * @license CC BY-NC-SA 4.0
 */
import { useState, useEffect } from 'react';
import client from '../api/client';

/**
 * @returns {{ articles: Array, loading: boolean, error: string|null, reload: Function }}
 */
export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await client.get('/articles.php');
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.error ?? 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return { articles, loading, error, reload: load };
}
