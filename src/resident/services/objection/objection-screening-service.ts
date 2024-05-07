import { type HttpClient } from '../../../common/http-client/http-client';
import { type Screening } from '../../entities/screening';
import { ScreeningResponse } from '../response/screening-response';

export class ObjectionScreeningService {
  private readonly url = '/screening';
  public async getScreening(
    httpClient: HttpClient,
    id: string,
  ): Promise<Screening | undefined> {
    try {
      const response = await httpClient.request({
        path: `${this.url}/${id}`,
        method: 'get',
      });
      return response?.getData(ScreeningResponse).screening;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  // postScreening(httpClient, screening) {
  //   return httpClient.post('/screening', screening);
  // }

  // updateScreening(httpClient, screening) {
  //   return httpClient.put('/screening', screening);
  // }
}
