import axios, { type AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface ApiResponse<T> {
  data: T;
  message: string[];
}

export class HttpClient {
  private readonly baseUrl: string;
  private readonly instance;

  public constructor() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.baseUrl = 'http://localhost:3344';
    this.instance = axios.create({
      baseURL: this.baseUrl,
    });
  }

  public setAuthorization(token: string): void {
    this.instance.defaults.headers.Authorization = `Bearer ${token}`;
  }

  // get
  public async get<T>(url: string): Promise<T | undefined> {
    try {
      const response = await this.instance.get<ApiResponse<T>>(
        this.baseUrl + url,
      );
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(
        (axiosError.response?.data as { message: string[] })?.message
          .map((message: string) => message)
          .join('\n'),
      );
      return undefined;
    }
  }

  // post
  public async post<T>(url: string, data: T): Promise<boolean> {
    try {
      await this.instance.post(this.baseUrl + url, data);
      return true;
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(
        (axiosError.response?.data as { message: string[] })?.message
          .map((message: string) => message)
          .join('\n'),
      );
      return false;
    }
  }

  // put
  public async put<T>(url: string, data: T): Promise<boolean> {
    try {
      await this.instance.put(this.baseUrl + url, data);
      return true;
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(
        (axiosError.response?.data as { message: string[] })?.message
          .map((message: string) => message)
          .join('\n'),
      );
      return false;
    }
  }

  // delete
  public async delete(url: string): Promise<boolean> {
    try {
      await this.instance.delete(this.baseUrl + url);
      return true;
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(
        (axiosError.response?.data as { message: string[] })?.message
          .map((message: string) => message)
          .join('\n'),
      );
      return false;
    }
  }
}
