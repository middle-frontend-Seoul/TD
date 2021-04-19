export type ResponsePages<T> = {
  current_page: number;
  pages: number;
  data: T[];
};

export type Pages<T> = {
  currentPage: number;
  pages: number;
  data: T[];
};

export type ResponseTheme = {
  id: number;
  code: string;
  name: string;
  theme_сount: number;
  message_count: number;
};

export type ResponseThemes = ResponsePages<ResponseTheme>;

export type ResponseSubTheme = {
  id: number;
  code: string;
  name: string;
  view_сount: number;
  message_count: number;
};

export type ResponseSubThemes = ResponsePages<ResponseSubTheme>;

export type ResponseMessage = {
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
