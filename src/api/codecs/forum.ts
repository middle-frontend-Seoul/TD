// требует обзор
// eslint-disable-next-line import/no-cycle
import { Theme, SubTheme } from 'redux/slices/forum-slice';
import { Pages, ResponseThemes, ResponseSubThemes } from 'api/models/forum.d';

export type ThemesType = Pages<Theme>;

export const codeThemes = (res: ResponseThemes): ThemesType => {
  const items = res.data || [];
  const data = items.map<Theme>((item) => ({
    id: item.id,
    name: item.name,
    code: item.code,
    themeCount: item.theme_сount,
    messageCount: item.message_count,
  }));

  return {
    currentPage: res.current_page,
    pages: res.pages,
    data,
  };
};

export type SubThemesType = Pages<SubTheme>;

export const codeSubThemes = (res: ResponseSubThemes): SubThemesType => {
  const items = res.data || [];
  const data = items.map<SubTheme>((item) => ({
    id: item.id,
    name: item.name,
    code: item.code,
    viewCount: item.view_сount,
    messageCount: item.message_count,
  }));

  return {
    currentPage: res.current_page,
    pages: res.pages,
    data,
  };
};
