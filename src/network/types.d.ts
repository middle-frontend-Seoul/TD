import { AxiosResponse, AxiosError } from 'axios';

declare global {
  type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
  type HttpConfig = {
    url: string;
    headers?: Record<string, string>;
    data?: any;
  };

  type HttpResponse<Dto> = {
    response?: AxiosResponse<Dto>;
    error?: AxiosError;
  };
  
  type ApiResponse<Info> = {
    data?: Info;
    error?: AxiosError;
  };
}
