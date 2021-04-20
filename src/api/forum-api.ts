import { mockRequest } from 'api/__mock__/request'; // временно

import {
  ResponseThemes,
  ResponseSubThemes,
  ResponseMessage,
} from 'api/models/forum.d';
import {
  codeThemes,
  codeSubThemes,
  codeMessages,
  ThemesType,
  MessagesType,
  SubThemesType,
} from 'api/codecs/forum';

export type GetThemes = ApiResponse<ThemesType>;

export type GetMessages = ApiResponse<MessagesType>;

export type GetSubThemes = ApiResponse<SubThemesType>;

export type CreateTheme = ApiResponse<boolean>;

export const forumApi = {
  createTheme: async (values: Record<string, string>): Promise<CreateTheme> => {
    // tmp - эмитация добавления темы
    await new Promise((res) => setTimeout(() => res(values), 1000));
    return {
      data: true,
      error: undefined,
    };
  },

  getThemes: async (page: string | number = 1): Promise<GetThemes> => {
    const res = await mockRequest<ResponseThemes>('themes', page);
    return {
      data: res && codeThemes(res),
      error: undefined,
    };
  },

  getMessages: async (id: string | number): Promise<GetMessages> => {
    // eslint-disable-next-line no-console
    console.log(id);
    const res = await mockRequest<ResponseMessage>('messages');
    return {
      data: res && codeMessages(res),
      error: undefined,
    };
  },

  getSubThemes: async (page: string | number = 1): Promise<GetSubThemes> => {
    const res = await mockRequest<ResponseSubThemes>('subthemes', page);
    return {
      data: res && codeSubThemes(res),
      error: undefined,
    };
  },
};
