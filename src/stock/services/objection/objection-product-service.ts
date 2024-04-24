import { type HttpClient } from '../../../common/http-client/http-client';
import { Movimentation } from '../../entities/historic';
import { Product } from '../../entities/product';
import { type ProductService } from '../interfaces/product-service';

export class ObjectionProductService implements ProductService {
  private readonly apiUrl = '/product';

  public async getStock(httpClient: HttpClient): Promise<Product[]> {
    try {
      const response = await httpClient.request({
        path: this.apiUrl + '/stock',
        method: 'get',
      });

      return response?.getArrayData(Product) ?? [];
    } catch (e) {
      return [];
    }
  }

  public async getProducts(httpClient: HttpClient): Promise<Product[]> {
    try {
      const response = await httpClient.request({
        path: this.apiUrl,
        method: 'get',
      });

      return response?.getArrayData(Product) ?? [];
    } catch (e) {
      return [];
    }
  }

  public async getMovimentations(
    httpClient: HttpClient,
  ): Promise<Movimentation[]> {
    try {
      const response = await httpClient.request({
        path: '/movimentation',
        method: 'get',
      });

      return response?.getArrayData(Movimentation) ?? [];
    } catch (e) {
      return [];
    }
  }
}
