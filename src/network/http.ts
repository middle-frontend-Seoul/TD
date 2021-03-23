import axios, { AxiosResponse } from 'axios';

import { API_BASE_URL } from 'constants/network';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_BASE_URL,
});

export async function httpGet<R>(
  url: string,
  headers?: Record<string, string>
): Promise<HttpResponse<R>> {
  const allHeaders = {
    'Content-type': 'application/json',
    ...headers,
  };
  try {
    const response = await axiosInstance.get<R, AxiosResponse<R>>(url, {
      headers: allHeaders,
    });
    return { response };
  } catch (error) {
    return { error: error.toJSON() };
  }
}

export async function httpPost<R>(
  url: string,
  data?: any, // eslint-disable-line
  headers?: Record<string, string>
): Promise<HttpResponse<R>> {
  const allHeaders = {
    'Content-type': 'application/json',
    ...headers,
  };
  try {
    const response = await axiosInstance.post<R, AxiosResponse<R>>(url, data, {
      headers: allHeaders,
    });
    return { response };
  } catch (error) {
    return { error: error.toJSON() };
  }
}
