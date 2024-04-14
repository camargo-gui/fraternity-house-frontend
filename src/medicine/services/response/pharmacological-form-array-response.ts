import { type PharmacologicalForm } from '../../entities/pharmacological-form';

export class PharmacologicalFormArrayResponse {
  public constructor(public pharmacologicalForms: PharmacologicalForm[]) {}
}
