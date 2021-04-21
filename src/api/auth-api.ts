import { http } from 'network/http';
import { Auth, User } from 'api/codecs';

export const authApi = {
  getCurrentUser: async (): Promise<ApiResponse<UserInfo>> => {
    const { response, error } = await http.get<UserDto>(`/auth/user`);
    return {
      data: response && User.fromUserDto(response.data || {}),
      error,
    };
  },

  signIn: async (data: SignInRequestInfo): Promise<ApiResponse<SignInInfo>> => {
    const { response, error } = await http.post<SignInDto>(
      '/auth/signin',
      Auth.toSignInRequestDto(data)
    );
    return {
      data: response && Auth.fromSigInDto(response.data || {}),
      error,
    };
  },

  signUp: async (data: SignUpRequestInfo): Promise<ApiResponse<SignUpInfo>> => {
    const { response, error } = await http.post<SignUpDto>(
      '/auth/signup',
      Auth.toSignUpRequestDto(data)
    );
    return {
      data: response && Auth.fromSignUpDto(response.data || {}),
      error,
    };
  },

  logout: async (): Promise<ApiResponse<string>> => {
    const { response, error } = await http.post<string>('/auth/logout');
    return {
      data: response && response.data,
      error,
    };
  },
};
