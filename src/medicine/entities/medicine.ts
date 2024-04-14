import { type PharmacologicalForm } from './pharmacological-form';
import type { PharmacologicalName } from './pharmacological-name';

export class Medicine {
  public constructor(
    public id: string,
    public name: string,
    public PharmacologicalForm: PharmacologicalForm,
    public PharmacologicalName: PharmacologicalName,
  ) {}
}
