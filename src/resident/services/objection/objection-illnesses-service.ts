import { type HttpClient } from '../../../common/http-client/http-client';
import { Illnesses } from '../../entities/illnesses';
import { type IllnessesService } from '../interfaces/illnesses-service';

export class ObjectionIllnessesService implements IllnessesService {
  private readonly url = '/illnesses';

  getIllnesses = async (
    httpClient: HttpClient,
  ): Promise<Illnesses[] | undefined> => {
    try {
      const response = await httpClient.request({
        path: this.url,
        method: 'get',
      });
      return response?.getArrayData(Illnesses) ?? [];
    } catch (error) {
      return [];
    }
  };
}
