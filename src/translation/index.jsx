import { LANGUAGE_KEY } from '../constant';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import vi from './locales/vi.json';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem(LANGUAGE_KEY) || 'vi',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })
  .catch((err) => {
    throw err;
  });

export default i18n;
