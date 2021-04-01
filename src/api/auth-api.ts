import { http } from 'network/http';

export interface InputData {
  login: string;
  email: string;
  password: string;
  repeatedPassword: string;
}

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

  signUp: async (data: InputData): Promise<ApiResponse<string>> => {
    const { response, error } = await http.post<string>('/auth/signup', {
      first_name: data.login,
      second_name: data.login,
      phone: '8888888888',
      ...data,
    });
    return {
      data: response && response.data,
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
