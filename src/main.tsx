import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { WeddingDataProvider } from './contexts/WeddingDataContext';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary';
import './index.css';
import './i18n/config';

console.log("VITE_ROOT_PROOF", import.meta.env.BASE_URL, window.location.href);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <WeddingDataProvider>
        <App />
      </WeddingDataProvider>
    </GlobalErrorBoundary>
  </StrictMode>
);
