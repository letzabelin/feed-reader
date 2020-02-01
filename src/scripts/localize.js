import i18next from 'i18next';
import Languagedetector from 'i18next-browser-languagedetector';
import translationRU from './locales/ru/translation.json';
import translationEN from './locales/en/translation.json';

const resources = {
  ru: {
    translation: translationRU,
  },
  en: {
    translation: translationEN,
  },
};

const options = {
  resources,
  fallbackLng: 'en',
  debug: true,
};

export default i18next
  .use(Languagedetector)
  .init(options);
