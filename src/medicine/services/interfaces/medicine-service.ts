import type { HttpClient } from '../../../common/http-client/http-client';
import type { Medicine } from '../../entities/medicine';

export interface MedicineService {
  getMedicines: (httpClient: HttpClient) => Promise<Medicine[]>;
  getMedicine: (
    httpClient: HttpClient,
    id: string,
  ) => Promise<Medicine | undefined>;
  createMedicine: (httpClient: HttpClient, medicine: Medicine) => Promise<void>;
  updateMedicine: (httpClient: HttpClient, medicine: Medicine) => Promise<void>;
  deleteMedicine: (httpClient: HttpClient, id: string) => Promise<void>;
}
