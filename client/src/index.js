// * React:
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// * Redux:
import { Provider } from 'react-redux';
import store from './store/store';

// * Translations:
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import enTranslation from './locales/en.json';
import plTranslation from './locales/pl.json';

i18n.init({
    interpolation: { escapeValue: false },
    lng: 'pl', 
    resources: {
        en: {
            translation: enTranslation,
        },
        pl: {
            translation: plTranslation,
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);
