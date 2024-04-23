import { type HttpClient } from '../../../common/http-client/http-client';
import { type Login } from '../../entities/login';
import { type LoginResponse } from '../response/login-response';

export interface LoginService {
  login: (
    httpClient: HttpClient,
    data: Login,
  ) => Promise<LoginResponse | undefined>;
}
