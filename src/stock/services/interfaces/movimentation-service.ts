import { type HttpClient } from '../../../common/http-client/http-client';
import { type Product } from '../../entities/product';
export interface MovimentationService {
  postInputMovimentation: (
    httpClient: HttpClient,
    products: Product[],
  ) => Promise<void>;
}
