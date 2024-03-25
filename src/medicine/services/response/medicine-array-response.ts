import type { Medicine } from '../../entities/medicine';

export class MedicineArrayResponse {
  public constructor(public medicines: Medicine[]) {}
}
