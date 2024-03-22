import type { Medicine } from '../../entities/medicine';

export interface MedicineService {
  getMedicines: () => Promise<Medicine[]>;
  getMedicine: (id: string) => Promise<Medicine>;
  createMedicine: (medicine: Medicine) => Promise<void>;
  updateMedicine: (medicine: Medicine) => Promise<void>;
  deleteMedicine: (id: string) => Promise<void>;
}
