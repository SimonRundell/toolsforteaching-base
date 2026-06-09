/**
 * Authentication hook for the admin panel.
 * Stores token in localStorage and verifies it on mount.
 * @license CC BY-NC-SA 4.0
 */
import { useState, useEffect, useCallback } from 'react';
import client from '../api/client';

const TOKEN_KEY = 'tft_token';

/**
 * @returns {{ user, loading, login, logout }}
 */
export function useAuth() {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // Verify stored token on mount
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) { setLoading(false); return; }
    client.get('/auth.php')
      .then(({ data }) => setUser(data.user))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  /**
   * @param {string} username
   * @param {string} password
   * @returns {Promise<void>}
   * @throws on invalid credentials
   */
  const login = useCallback(async (username, password) => {
    const { data } = await client.post('/auth.php', { username, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    try { await client.delete('/auth.php'); } catch { /* swallow */ }
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  return { user, loading, login, logout };
}
