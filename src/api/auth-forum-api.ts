import { httpForum } from 'network/http-forum';
import { Auth, User } from 'api/codecs';

export const authForumApi = {
  getCurrentUser: async (): Promise<ApiResponse<ForumUserInfo>> => {
    const { response, error } = await httpForum.get<ForumUserDto>(`/auth/user`);
    return {
      data: response && User.fromForumUserDto(response.data || {}),
      error,
    };
  },

  signIn: async (
    data: ForumSignInRequestInfo
  ): Promise<ApiResponse<ForumUserInfo>> => {
    const { response, error } = await httpForum.post<ForumUserDto>(
      '/auth/login',
      Auth.toForumSignInRequestDto(data)
    );
    return {
      data: response && User.fromForumUserDto(response.data || {}),
      error,
    };
  },

  signUp: async (
    data: ForumSignUpRequestInfo
  ): Promise<ApiResponse<ForumUserInfo>> => {
    const { response, error } = await httpForum.post<ForumUserDto>(
      '/auth/registration',
      Auth.toForumSignUpRequestDto(data)
    );
    return {
      data: response && User.fromForumUserDto(response.data || {}),
      error,
    };
  },

  logout: async (): Promise<ApiResponse<string>> => {
    const { response, error } = await httpForum.post<string>('/auth/logout');
    return {
      data: response && response.data,
      error,
    };
  },
};
