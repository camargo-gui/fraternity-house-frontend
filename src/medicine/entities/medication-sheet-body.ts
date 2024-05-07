import { type Employee } from '../../employee/entities/employee';
import { type Resident } from '../../resident/entities/resident';

export class MedicationSheetBody {
  public constructor(
    public id: number,
    public Resident: Resident,
    public Employee: Employee,
    public prescriptions: PrescriptionsInterface[],
    public observations: string,
  ) {}
}

export interface PrescriptionsInterface {
  medicationSheetId?: number;
  id: number;
  Medicine: {
    PharmacologicalForm: {
      id: number;
      name: string;
      created_at: string;
      updated_at: string;
    };
    PharmacologicalName: {
      id: number;
      name: string;
      created_at: string;
      updated_at: string;
    };
    name: string;
  };
  firstTime: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
}
