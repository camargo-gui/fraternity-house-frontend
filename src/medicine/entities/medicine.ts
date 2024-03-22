import type { PharmacologicalName } from './pharmacological-name';

export class Medicine {
  public constructor(
    public id: string,
    public name: string,
    public pharmaceuticalForms: string,
    public pharmacologicalName: PharmacologicalName,
  ) {}
}
