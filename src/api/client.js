/**
 * Axios API client for Tools for Teaching
 * Reads base URL from /.config.json; injects auth token automatically.
 * @license CC BY-NC-SA 4.0
 */
import axios from 'axios';

let config = { apiBase: '/api', web3formsKey: '' };

/**
 * Loads .config.json from the site root and caches the result.
 * Call once in main.jsx before rendering.
 */
export async function loadConfig() {
  try {
    const res = await fetch('/.config.json');
    if (res.ok) {
      config = await res.json();
    }
  } catch {
    // fall back to defaults above
  }
}

export function getConfig() { return config; }

/** Axios instance with auth token injection */
const client = axios.create();

client.interceptors.request.use(cfg => {
  cfg.baseURL = config.apiBase;
  const token = localStorage.getItem('tft_token');
  if (token) {
    cfg.headers = cfg.headers ?? {};
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

export default client;
