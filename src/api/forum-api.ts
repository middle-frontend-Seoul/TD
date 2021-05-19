import { httpForum } from 'network/http-forum';
import { Forum } from 'api/codecs';

export const forumApi = {
  getAllForums: async (): Promise<ApiResponse<ForumInfo[]>> => {
    const { response, error } = await httpForum.get<ForumDto[]>('/forums');
    return {
      data: response && (response.data || []).map(Forum.fromForumDto),
      error,
    };
  },

  createForum: async (
    data: ForumRequestInfo
  ): Promise<ApiResponse<ForumInfo>> => {
    const { response, error } = await httpForum.post<ForumDto>(
      '/forums',
      Forum.toForumRequestDto(data)
    );
    return {
      data: response && Forum.fromForumDto(response.data || {}),
      error,
    };
  },

  getAllThemes: async (forumId?: number): Promise<ApiResponse<ThemeInfo[]>> => {
    const { response, error } = await httpForum.get<ThemeDto[]>(
      forumId ? `forums/themes?forumId=${forumId}` : 'forums/themes'
    );
    return {
      data: response && (response.data || []).map(Forum.fromThemeDto),
      error,
    };
  },

  createTheme: async (
    data: ThemeRequestInfo
  ): Promise<ApiResponse<ThemeInfo>> => {
    const { response, error } = await httpForum.post<ThemeDto>(
      '/forums/themes',
      Forum.toThemeRequestDto(data)
    );
    return {
      data: response && Forum.fromThemeDto(response.data || {}),
      error,
    };
  },

  updateThemeViewCount: async (
    id: number,
    data: ThemeUpdateViewCountInfo
  ): Promise<ApiResponse<ThemeInfo>> => {
    const { response, error } = await httpForum.put<ThemeDto>(
      `/forums/themes/${id}`,
      Forum.toThemeUpdateViewCountDto(data)
    );
    return {
      data: response && Forum.fromThemeDto(response.data || {}),
      error,
    };
  },

  getTheme: async (id: number): Promise<ApiResponse<ThemeInfo>> => {
    const { response, error } = await httpForum.get<ThemeDto>(
      `/forums/themes/${id}`
    );
    return {
      data: response && Forum.fromThemeDto(response.data || {}),
      error,
    };
  },

  getAllMessages: async (
    themeId?: number
  ): Promise<ApiResponse<MessageInfo[]>> => {
    const { response, error } = await httpForum.get<MessageDto[]>(
      themeId ? `forums/messages?themeId=${themeId}` : 'forums/messages'
    );
    return {
      data: response && (response.data || []).map(Forum.fromMessageDto),
      error,
    };
  },

  createMessage: async (
    data: MessageRequestInfo
  ): Promise<ApiResponse<MessageInfo>> => {
    const { response, error } = await httpForum.post<MessageDto>(
      '/forums/messages',
      Forum.toMessageRequestDto(data)
    );
    return {
      data: response && Forum.fromMessageDto(response.data || {}),
      error,
    };
  },
};
