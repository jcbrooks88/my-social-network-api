import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/global.css';  // Import global styles (e.g., Tailwind CSS)
import App from './App.tsx';

// Ensure rootElement is of type HTMLElement and handle null case
const rootElement = document.getElementById('root') as HTMLElement | null;

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error('Root element not found!');
}

