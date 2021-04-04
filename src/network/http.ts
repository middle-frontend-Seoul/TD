import axios, { AxiosResponse } from 'axios';

import { API_BASE_URL } from 'constants/network';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_BASE_URL,
});

async function httpRequest<Dto>(
  method: HttpMethod,
  config: HttpConfig
): Promise<HttpResponse<Dto>> {
  const allHeaders = {
    'Content-type': 'application/json',
    ...config.headers,
  };

  let response: AxiosResponse<Dto>;

  try {
    switch (method) {
      case 'GET':
        response = await axiosInstance.get<Dto, AxiosResponse<Dto>>(
          config.url,
          { headers: allHeaders }
        );
        break;

      case 'POST':
        response = await axiosInstance.post<Dto, AxiosResponse<Dto>>(
          config.url,
          config.data,
          { headers: allHeaders }
        );
        break;

      case 'PUT':
        response = await axiosInstance.put<Dto, AxiosResponse<Dto>>(
          config.url,
          config.data,
          { headers: allHeaders }
        );
        break;

      case 'DELETE':
        response = await axiosInstance.delete<Dto, AxiosResponse<Dto>>(
          config.url,
          { headers: allHeaders }
        );
        break;

      default:
        throw new Error('method not implemented');
    }
    return { response };
  } catch (error) {
    return { error };
  }
}

export const http = {
  get: async <Dto>(
    url: string,
    headers?: Record<string, string>
  ): Promise<HttpResponse<Dto>> => httpRequest<Dto>('GET', { url, headers }),

  post: async <Dto>(
    url: string,
    data?: any, // eslint-disable-line
    headers?: Record<string, string>
  ): Promise<HttpResponse<Dto>> =>
    httpRequest<Dto>('POST', { url, data, headers }),

  put: async <Dto>(
    url: string,
    data?: any, // eslint-disable-line
    headers?: Record<string, string>
  ): Promise<HttpResponse<Dto>> =>
    httpRequest<Dto>('PUT', { url, data, headers }),

  delete: async <Dto>(
    url: string,
    headers?: Record<string, string>
  ): Promise<HttpResponse<Dto>> => httpRequest<Dto>('DELETE', { url, headers }),
};