import { type HttpClient } from '../../../common/http-client/http-client';
import { type Product } from '../../entities/product';

export interface ProductService {
  getProducts: (httpClient: HttpClient) => Promise<Product[]>;
  getStock: (httpClient: HttpClient) => Promise<Product[]>;
}
