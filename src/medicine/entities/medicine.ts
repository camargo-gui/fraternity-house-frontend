import type { PharmacologicalName } from './pharmacological-name';

export class Medicine {
  public constructor(
    public id: string,
    public name: string,
    public pharmaceutical_forms: string,
    public PharmacologicalName: PharmacologicalName,
  ) {}
}
