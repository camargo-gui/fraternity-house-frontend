import type { HttpClient } from '../../../common/http-client/http-client';
import type { PharmacologicalName } from '../../entities/pharmacological-name';
import type { PharmacologicalNameService } from '../interfaces/pharmacological-name-service';
import { PharmacologicalNameArrayResponse } from '../response/pharmacological-name-array-response';

export class ObjectionPharmacologicalNameService
  implements PharmacologicalNameService
{
  private readonly apiUrl = '/pharmacological-name';

  public async getPharmacologicalNames(
    httpClient: HttpClient,
  ): Promise<PharmacologicalName[]> {
    try {
      const response = await httpClient.request({
        path: this.apiUrl,
        method: 'get',
      });

      return (
        response?.getData(PharmacologicalNameArrayResponse)
          .pharmacologicalNames ?? []
      );
    } catch (e) {
      return [];
    }
  }
}
