import { mockRequest } from 'api/__mock__/request'; // временно

import { ResponseThemes, ResponseSubThemes } from 'api/models/forum.d';
import {
  codeThemes,
  codeSubThemes,
  ThemesType,
  SubThemesType,
} from 'api/codecs/forum';

export type GetThemes = ApiResponse<ThemesType>;

export type GetSubThemes = ApiResponse<SubThemesType>;

export const forumApi = {
  getThemes: async (page: string | number = 1): Promise<GetThemes> => {
    const res = await mockRequest<ResponseThemes>('themes', page);
    return {
      data: res && codeThemes(res),
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
