import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { WeddingDataProvider } from './contexts/WeddingDataContext';
import './index.css';
import './i18n/config';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WeddingDataProvider>
      <App />
    </WeddingDataProvider>
  </StrictMode>
);
