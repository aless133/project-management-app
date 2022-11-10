import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import en from './locales/en/translation.json';
import ru from './ru/t.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      ru: {
        translation: ru,
      },
    },
    supportedLngs: ['en', 'ru'],
    fallbackLng: 'en',
    // debug: true,
    detection: {
      order: ['cookie'],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
