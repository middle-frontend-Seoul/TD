import { http } from 'network/http';
import { OAuth } from 'api/codecs';

export const oAuthApi = {
  getClientID: async (redirectUri: string): Promise<ApiResponse<OAuthInfo>> => {
    const { response, error } = await http.get<OAuthDto>(
      `/oauth/yandex/service-id?redirect_uri=${redirectUri}`
    );
    return {
      data: response && OAuth.fromOAuthDto(response.data || {}),
      error,
    };
  },

  signIn: async (
    data: OAuthSignInRequestInfo
  ): Promise<ApiResponse<OAuthSignInInfo>> => {
    const { response, error } = await http.post<OAuthSignInDto>(
      '/oauth/yandex',
      OAuth.toOAuthSignInRequestDto(data)
    );
    return {
      data: response && OAuth.fromOAuthSigInDto(response.data || {}),
      error,
    };
  },
};
