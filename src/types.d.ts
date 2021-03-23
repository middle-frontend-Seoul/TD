import { AxiosResponse, AxiosError } from 'axios';

declare global {
  type HttpResponse<R> = {
    response?: AxiosResponse<R>;
    error?: AxiosError<R>;
  };
  
  type HttpError<R> = AxiosError<R>;
  
  type ApiResponse<Info, Dto> = {
    data?: Info;
    error?: HttpError<Dto>;
  };
}
