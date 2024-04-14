import type { HttpClient } from '../../../common/http-client/http-client';
import { type PharmacologicalForm } from '../../entities/pharmacological-form';
import { type PharmacologicalFormService } from '../interfaces/pharmacological-form-service';
import { PharmacologicalFormArrayResponse } from '../response/pharmacological-form-array-response';

export class ObjectionPharmacologicalFormService
  implements PharmacologicalFormService
{
  private readonly apiUrl = '/pharmacological-form';

  public async getPharmacologicalForms(
    httpClient: HttpClient,
  ): Promise<PharmacologicalForm[]> {
    try {
      const response = await httpClient.request({
        path: this.apiUrl,
        method: 'get',
      });

      return (
        response?.getData(PharmacologicalFormArrayResponse)
          .pharmacologicalForms ?? []
      );
    } catch (e) {
      return [];
    }
  }
}
