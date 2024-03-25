import { type HttpClient } from '../../../common/http-client/http-client';
import { type Login } from '../../entities/login';
import { type LoginService } from '../interfaces/login-service';
import { LoginResponse } from '../response/login-response';

export class ObjectionLoginService implements LoginService {
  private readonly apiUrl = '/login';

  public async login(httpClient: HttpClient, data: Login): Promise<string> {
    try {
      const response = await httpClient.request({
        path: this.apiUrl,
        method: 'post',
        data,
      });

      return response?.getData(LoginResponse).token ?? '';
    } catch (e) {
      return '';
    }
  }
}
