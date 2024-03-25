import { type HttpClient } from '../../../common/http-client/http-client';
import { type Login } from '../../entities/login';

export interface LoginService {
  login: (httpClient: HttpClient, data: Login) => Promise<string>;
}
