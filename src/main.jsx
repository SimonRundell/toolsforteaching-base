/**
 * Application entry point.
 * Loads .config.json before mounting React so the API base URL is ready.
 * @license CC BY-NC-SA 4.0
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { loadConfig } from './api/client';
import App from './App';
import './styles/main.css';

loadConfig().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
});
