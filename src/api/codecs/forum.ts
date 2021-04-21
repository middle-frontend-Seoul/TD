export type ThemesType = PagesInfo<ThemeInfo>;

export const fromThemesDto = (res: ThemesDto): ThemesType => {
  const items = res.data || [];
  const data = items.map<ThemeInfo>((item) => ({
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

export type MessagesType = {
  theme: Pick<ThemeInfo, 'id' | 'code' | 'name'>;
  messages: ThemeMessageInfo[];
};

export const fromMessagesDto = (res: MessagesDto): MessagesType => {
  const { messages, id, code, name } = res;
  const themeMessages = messages.map<ThemeMessageInfo>((item) => ({
    id: item.id,
    date: item.date,
    userName: item.user_name,
    message: item.message,
  }));

  return {
    theme: { id, code, name },
    messages: themeMessages,
  };
};

export type SubThemesType = PagesInfo<SubThemeInfo>;

export const fromSubThemesDto = (res: SubThemesDto): SubThemesType => {
  const items = res.data || [];
  const data = items.map<SubThemeInfo>((item) => ({
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
