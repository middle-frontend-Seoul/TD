import { httpPost } from 'network/http';

// TODO - доработать в PR касающегося авторизации/регистрации
export const authApi = {
  login: async (): Promise<ApiResponse<string, string>> => {
    const { response, error } = await httpPost<string>('/auth/signin', {
      login: process.env.USER_LOGIN,
      password: process.env.USER_PASSWORD,
    });
    if (response) {
      return {
        data: response.data,
      };
    }
    return { error };
  },

  logout: async (): Promise<ApiResponse<string, string>> => {
    const { response, error } = await httpPost<string>('/auth/logout');
    if (response) {
      return {
        data: response.data,
      };
    }
    return { error };
  },
};
