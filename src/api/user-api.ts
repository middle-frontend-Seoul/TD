import { http } from 'network/http';
import { httpForum } from 'network/http-forum';
import { User } from 'api/codecs';

export const userApi = {
  getTheme: async (id: number): Promise<ApiResponse<string>> => {
    const { response, error } = await httpForum.get<string>(
      `/users/theme/${id}`
    );
    return {
      data: response && response.data,
      error,
    };
  },

  getUser: async (id: number): Promise<ApiResponse<UserInfo>> => {
    const { response, error } = await http.get<UserDto>(`/user/user/${id}`);
    return {
      data: response && User.fromUserDto(response.data || {}),
      error,
    };
  },

  updateUser: async (data: UserRequestInfo): Promise<ApiResponse<UserInfo>> => {
    const { response, error } = await http.put<UserDto>(
      '/user/profile',
      User.toUserRequestDto(data)
    );
    return {
      data: response && User.fromUserDto(response.data || {}),
      error,
    };
  },

  updateAvatar: async (
    data: UserAvatarRequestInfo
  ): Promise<ApiResponse<null>> => {
    const { response, error } = await http.put<undefined>(
      '/user/profile/avatar',
      User.toUserAvatarRequestDto(data)
    );
    return {
      data: response && response.data,
      error,
    };
  },

  updatePassword: async (
    data: UserPasswordRequestInfo
  ): Promise<ApiResponse<null>> => {
    const { response, error } = await http.put<undefined>(
      '/user/password',
      User.toUserPasswordRequestDto(data)
    );
    return {
      data: response && response.data,
      error,
    };
  },
};
