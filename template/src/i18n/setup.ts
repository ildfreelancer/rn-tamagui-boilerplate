import 'intl-pluralrules';
import i18n from 'i18next';
import RNLocalize from 'react-native-localize';
import {I18nManager} from 'react-native';
import {initReactI18next} from 'react-i18next';
import en from './translations/en.json';
import {storage} from '@helpers/mmkv';
import {LOG} from '@helpers/logger';
import {LOCALE} from '@constants/app';

const DEFAULT_RTL = false;
const DEFAULT_LOCALE = 'en';

const LANGUAGES = {
  en: {
    translation: en,
  },
};

const LANG_CODES = Object.keys(LANGUAGES);
const defaultLanguage = {languageTag: DEFAULT_LOCALE, isRTL: DEFAULT_RTL};

const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: (callback: any) => {
    function setDefaultLanguage() {
      const {languageTag, isRTL} =
        RNLocalize.findBestAvailableLanguage(LANG_CODES) || defaultLanguage;
      // update layout direction
      I18nManager.forceRTL(isRTL);
      callback(languageTag);
    }

    const language = storage.getString(LOCALE);

    if (!language) {
      setDefaultLanguage();
    } else {
      callback(language);
    }
  },
  init: () => {
    //
  },
  cacheUserLanguage: (language: string) => {
    storage.set(LOCALE, language);
  },
};

export const setI18nConfig = () => {
  // clear translation cache
  try {
    i18n
      // detect language
      .use(LANGUAGE_DETECTOR as any)
      // pass the i18n instance to react-i18next.
      .use(initReactI18next)
      // set options
      .init({
        resources: LANGUAGES,
        react: {
          useSuspense: false,
        },
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
      });
  } catch (error) {}
};

export const getLocale = () => {
  // fallback if no available language fits
  const locale = storage.getString('locale');
  if (locale) {
    return locale;
  }
  const {languageTag} =
    RNLocalize.findBestAvailableLanguage(LANG_CODES) || defaultLanguage;
  return languageTag;
};

export const changeLanguage = async ({
  locale = DEFAULT_LOCALE,
  callback,
}: {
  locale: string;
  callback?: () => void;
}) => {
  storage.set('locale', locale);
  await i18n
    .changeLanguage(locale)
    .then(() => {
      callback && callback();
    })
    .catch(LOG.error);
};
