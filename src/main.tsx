import i18next from 'i18next';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter como Router
import './index.css';

import App from './App.tsx';
import Header from './components/Header.tsx';
import global_en from './locales/en/global.json';
import global_es from './locales/es/global.json';

const savedLanguage = localStorage.getItem('i18nextLng') || 'es';

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: savedLanguage,
  fallbackLng: 'en',
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
  },
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage'],
  },
});

i18next.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <Router>
        <Header />

        <App />
      </Router>
    </I18nextProvider>
  </StrictMode>
);
