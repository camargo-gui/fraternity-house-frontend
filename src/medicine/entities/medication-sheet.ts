import { type Prescription } from './prescription';

export class MedicationSheet {
  public constructor(
    public residentId: string,
    public observations: string,
    public prescriptions: Prescription[],
  ) {}
}
