import { noop } from 'lodash';
import { type HttpClient } from '../../../common/http-client/http-client';
import { type Product } from '../../entities/product';
import { type MovimentationService } from '../interfaces/movimentation-service';

export class ObjectionMovimentationService implements MovimentationService {
  private readonly apiUrl = '/movimentation';

  async postInputMovimentation(
    httpClient: HttpClient,
    products: Product[],
  ): Promise<void> {
    try {
      await httpClient.request({
        path: this.apiUrl,
        method: 'post',
        data: {
          type: 'INPUT',
          products,
        },
      });
    } catch (e) {
      noop();
    }
  }

  async postOutputMovimentation(
    httpClient: HttpClient,
    products: Product[],
  ): Promise<void> {
    try {
      await httpClient.request({
        path: this.apiUrl,
        method: 'post',
        data: {
          type: 'OUTPUT',
          products,
        },
      });
    } catch (e) {
      noop();
    }
  }
}
