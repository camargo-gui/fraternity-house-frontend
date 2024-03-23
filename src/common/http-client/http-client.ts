import axios, { type AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { HttpClientResponse } from './http-client-response';
import { type HttpClientRequest } from './http-client-request';

interface ApiResponse<T> {
  data: T;
  message: string[];
}

export class HttpClient {
  private readonly baseUrl: string;
  private readonly instance;

  public constructor() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.baseUrl = 'https://fraternity-house-backend.onrender.com';
    this.instance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoxLCJpYXQiOjE3MTExMjg4NjIsImV4cCI6MTcxMTIxNTI2Mn0.aGNCNOXXeQvoNyAK5CM1IfGqHpwHVNAH5O4KeHq5KMY`,
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
