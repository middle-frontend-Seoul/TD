type ThemeDto = {
  id: number;
  code: string;
  name: string;
  theme_сount: number;
  message_count: number;
};

type ThemeInfo = {
  id: number | string;
  name: string;
  code: string;
  themeCount: number;
  messageCount: number;
};

type ThemesDto = PagesDto<ThemeDto>;

type SubThemeDto = {
  id: number;
  code: string;
  name: string;
  view_сount: number;
  message_count: number;
};

type SubThemeInfo = {
  id: number | string;
  name: string;
  code: string;
  viewCount: number;
  messageCount: number;
};

type SubThemesDto = PagesDto<SubThemeDto>;

type MessagesDto = {
  id: number;
  code: string;
  name: string;
  messages: {
    id: number;
    date: Date;
    user_name: string;
    message: string;
  }[];
};

type ThemeMessageInfo = {
  id: number | string;
  userName: string;
  message: string;
  date: Date;
};
