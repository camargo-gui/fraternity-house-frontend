import axios, { type AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { type HttpClientRequest } from './http-client-request';
import { HttpClientResponse } from './http-client-response';

interface ApiResponse<T> {
  data: T;
  message: string[];
}

export class HttpClient {
  private readonly baseUrl: string;
  private readonly instance;

  public constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL ?? 'http://localhost:3344';
    this.instance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  public setAuthorization(token: string): void {
    this.instance.defaults.headers.Authorization = `Bearer ${token}`;
  }

  public async request(
    request: HttpClientRequest,
  ): Promise<HttpClientResponse | undefined> {
    try {
      const response = await this.instance.request<ApiResponse<unknown>>({
        url: this.baseUrl + request.path,
        method: request.method,
        data: request.data,
        params: request.params,
        headers: request.headers,
      });
      return new HttpClientResponse(response.status, response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(
        (axiosError.response?.data as { message: string[] })?.message
          .map((message: string) => message)
          .join('\n'),
      );
      throw new Error();
    }
  }
}
