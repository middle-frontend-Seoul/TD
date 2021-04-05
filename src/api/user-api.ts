import { http } from 'network/http';
import { User } from './codecs';

export const userApi = {
  getCurrentUser: async (): Promise<ApiResponse<UserInfo>> => {
    const { response, error } = await http.get<UserDto>(`/auth/user`);
    return {
      data: response && User.decodeUser(response.data || {}),
      error,
    };
  },

  getUser: async (id: number): Promise<ApiResponse<UserInfo>> => {
    const { response, error } = await http.get<UserDto>(`/user/user/${id}`);
    return {
      data: response && User.decodeUser(response.data || {}),
      error,
    };
  },

  updateUser: async (data: UserRequestInfo): Promise<ApiResponse<UserInfo>> => {
    const { response, error } = await http.put<UserDto>(
      '/user/profile',
      User.encodeUserRequest(data)
    );
    return {
      data: response && User.decodeUser(response.data || {}),
      error,
    };
  },

  updateAvatar: async (avatar: FormData): Promise<ApiResponse<null>> => {
    const { response, error } = await http.put<null>(
      '/user/profile/avatar',
      avatar
    );
    return {
      data: response && response.data,
      error,
    };
  },

  updatePassword: async (
    data: UserPasswordRequestInfo
  ): Promise<ApiResponse<null>> => {
    const { response, error } = await http.put<null>(
      '/user/password',
      User.encodeUserPasswordRequest(data)
    );
    return {
      data: response && response.data,
      error,
    };
  },
};
