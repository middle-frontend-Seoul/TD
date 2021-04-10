import { http } from 'network/http';
import { Auth, User } from 'api/codecs';

export const authApi = {
  getCurrentUser: async (): Promise<ApiResponse<UserInfo>> => {
    const { response, error } = await http.get<UserDto>(`/auth/user`);
    return {
      data: response && User.decodeUser(response.data || {}),
      error,
    };
  },

  signIn: async (data: SignInRequestInfo): Promise<ApiResponse<SignInInfo>> => {
    const { response, error } = await http.post<SignInDto>(
      '/auth/signin',
      Auth.encodeSignInRequest(data)
    );
    return {
      data: response && Auth.decodeSigIn(response.data || {}),
      error,
    };
  },

  signUp: async (data: SignUpRequestInfo): Promise<ApiResponse<SignUpInfo>> => {
    const { response, error } = await http.post<SignUpDto>(
      '/auth/signup',
      Auth.encodeSignUpRequest(data)
    );
    return {
      data: response && Auth.decodeSignUp(response.data || {}),
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
