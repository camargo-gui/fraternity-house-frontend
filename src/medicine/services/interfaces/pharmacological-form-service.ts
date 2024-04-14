import type { HttpClient } from '../../../common/http-client/http-client';
import { type PharmacologicalForm } from '../../entities/pharmacological-form';

export interface PharmacologicalFormService {
  getPharmacologicalForms: (
    httpClient: HttpClient,
  ) => Promise<PharmacologicalForm[] | undefined>;
}
