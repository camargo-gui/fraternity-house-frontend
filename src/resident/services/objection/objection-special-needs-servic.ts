import { type HttpClient } from '../../../common/http-client/http-client';
import { SpecialNeeds } from '../../entities/special-needs';
import { type SpecialNeedsService } from '../interfaces/special-needs-service';

export class ObjectionSpecialNeedsService implements SpecialNeedsService {
  private readonly url = '/specialNeeds';

  getSpecialNeeds = async (
    httpClient: HttpClient,
  ): Promise<SpecialNeeds[] | undefined> => {
    try {
      const response = await httpClient.request({
        path: this.url,
        method: 'get',
      });
      return response?.getArrayData(SpecialNeeds) ?? [];
    } catch (error) {
      return [];
    }
  };
}
