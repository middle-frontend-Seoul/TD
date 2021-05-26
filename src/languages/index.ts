import { i18n } from './i18n';

type Lang = keyof typeof i18n;

export const getLanguage = (
  code: any,
  defaultValue: string = '',
  lang: Lang = 'ru'
): string => {
  if (!i18n.hasOwnProperty(lang) || !i18n[lang].hasOwnProperty(code)) {
    return defaultValue;
  }

  const languages: any = i18n[lang];
  return languages[code];
};

export default getLanguage;
