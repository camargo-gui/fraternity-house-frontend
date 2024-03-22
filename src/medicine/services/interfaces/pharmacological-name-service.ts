import type { PharmacologicalName } from '../../entities/pharmacological-name';

export interface PharmacologicalNameService {
  getPharmacologicalNames: () => Promise<PharmacologicalName[]>;
}
