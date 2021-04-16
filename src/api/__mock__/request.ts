import themesPage1 from './forum/themes-page-1.json';
import themesPage2 from './forum/themes-page-2.json';
import subThemesPage1 from './forum/sub-themes-page-1.json';
import subThemesPage2 from './forum/sub-themes-page-2.json';

const hashMoks = {
  themes: {
    1: themesPage1,
    2: themesPage2,
  },
  subthemes: {
    1: subThemesPage1,
    2: subThemesPage2,
  },
};

export const mockRequest = async <T>(
  name: keyof typeof hashMoks,
  key?: string | number
): Promise<T> => {
  if (!Object.prototype.hasOwnProperty.call(hashMoks, name)) {
    throw new Error(`moks с названием ${name} не зарегистрирован`);
  }

  if (key && !Object.prototype.hasOwnProperty.call(hashMoks[name], key)) {
    throw new Error(`moks ${name} со странице ${key} не зарегистрирован`);
  }

  return new Promise((res) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const response = key ? hashMoks[name][key] : hashMoks[name];
    setTimeout(() => res(response), 1200);
  });
};
