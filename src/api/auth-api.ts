import { http } from 'network/http';
import { Auth } from './codecs';

// TODO - доработать в PR касающегося авторизации/регистрации
export const authApi = {
  login: async (): Promise<ApiResponse<string>> => {
    const { response, error } = await http.post<string>('/auth/signin', {
      login: process.env.USER_LOGIN,
      password: process.env.USER_PASSWORD,
    });
    return {
      data: response && response.data,
      error,
    };
  },

  signUp: async (data: SignUpRequestInfo): Promise<ApiResponse<SignUpInfo>> => {
    const { response, error } = await http.post<SignUpDto>(
      '/auth/signup',
      Auth.encodeLeaderboardRequest(data)
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
