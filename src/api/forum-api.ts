import { mockRequest } from 'api/__mock__/request'; // временно
import {
  fromThemesDto,
  fromMessagesDto,
  fromSubThemesDto,
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
    const res = await mockRequest<ThemesDto>('themes', page);
    return {
      data: res && fromThemesDto(res),
      error: undefined,
    };
  },

  getMessages: async (id: string | number): Promise<GetMessages> => {
    // eslint-disable-next-line no-console
    console.log(id);
    const res = await mockRequest<MessagesDto>('messages');
    return {
      data: res && fromMessagesDto(res),
      error: undefined,
    };
  },

  getSubThemes: async (page: string | number = 1): Promise<GetSubThemes> => {
    const res = await mockRequest<SubThemesDto>('subthemes', page);
    return {
      data: res && fromSubThemesDto(res),
      error: undefined,
    };
  },
};
