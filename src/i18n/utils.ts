import { defaultLang, ui } from './translations.ts';

export const getLangFromUrl = (url: URL) => {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in ui) return lang as keyof typeof ui;
  return defaultLang;
};

export const useTranslations = (lang: keyof typeof ui | string | undefined) => {
  const safeLang = (lang && lang in ui ? lang : defaultLang) as keyof typeof ui;

  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    const translations = ui[safeLang] || ui[defaultLang];
    return translations[key] || ui[defaultLang][key] || key;
  };
};
