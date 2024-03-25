import type { PharmacologicalName } from '../../entities/pharmacological-name';

export class PharmacologicalNameArrayResponse {
  public constructor(public pharmacologicalNames: PharmacologicalName[]) {}
}
