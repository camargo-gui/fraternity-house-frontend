import type { HttpClient } from '../../../common/http-client/http-client';
import type { PharmacologicalName } from '../../entities/pharmacological-name';

export interface PharmacologicalNameService {
  getPharmacologicalNames: (
    httpClient: HttpClient,
  ) => Promise<PharmacologicalName[] | undefined>;
}
