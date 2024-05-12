import { type HttpClient } from '../../../common/http-client/http-client';
import { Screening } from '../../entities/screening';
import { type ScreeningService } from '../interfaces/screening-service';

export class ObjectionScreeningService implements ScreeningService {
  private readonly url = '/screening';

  public async get(
    httpClient: HttpClient,
    id: string,
  ): Promise<Screening | undefined> {
    const response = await httpClient.request({
      path: `${this.url}/${id}`,
      method: 'get',
    });
    return response?.getData(Screening);
  }

  public async create(
    httpClient: HttpClient,
    screening: Screening,
  ): Promise<void> {
    await httpClient.request({
      path: this.url,
      method: 'post',
      data: { screening },
    });
  }

  public async update(
    httpClient: HttpClient,
    screening: Screening,
  ): Promise<void> {
    await httpClient.request({
      path: this.url,
      method: 'put',
      data: { screening },
    });
  }
}
