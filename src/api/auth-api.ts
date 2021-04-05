import { http } from 'network/http';
import { Auth } from './codecs';

// TODO - доработать в PR касающегося авторизации/регистрации
export const authApi = {
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
