import { noop } from 'lodash';
import { type HttpClient } from '../../../common/http-client/http-client';
import { type Login } from '../../entities/login';
import { type LoginService } from '../interfaces/login-service';
import { LoginResponse } from '../response/login-response';
import { formatSpecialCharacters } from '../../../utils/format-special-characters';

export class ObjectionLoginService implements LoginService {
  private readonly apiUrl = '/login';

  public async login(
    httpClient: HttpClient,
    data: Login,
  ): Promise<LoginResponse | undefined> {
    try {
      const response = await httpClient.request({
        path: this.apiUrl,
        method: 'post',
        data: {
          cpf: formatSpecialCharacters(data.cpf),
          password: data.password,
        },
      });

      return response?.getData(LoginResponse);
    } catch (e) {
      noop();
    }
  }
}
