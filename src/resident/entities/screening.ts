import { type Responsible } from './responsible';
import { type SpecialNeeds } from './special-needs';
import { type Illnesses } from './illnesses';
import { initialScreeningState } from '../screens/screening/tabs/types';

export class Screening {
  public constructor(
    public religion: string,
    public smoking: boolean,
    public entry_date: Date,
    public father_name: string,
    public mother_name: string,
    public source_of_income: string,
    public income: number,
    public health_insurance: string,
    public funeral_insurance: string,
    public number_of_sibling: number,
    public number_of_children: number,
    public number_of_grandchildren: number,
    public id_resident: number,
    public Responsible: Responsible,
    public Illnesses: Illnesses[],
    public SpecialNeeds: SpecialNeeds[],
    public id?: number,
  ) {}

  public static fromDTO(screening?: Screening, idResident?: number): Screening {
    if (!screening) return initialScreeningState(idResident);
    return new Screening(
      screening.religion,
      screening.smoking,
      new Date(screening.entry_date),
      screening.father_name,
      screening.mother_name,
      screening.source_of_income,
      screening.income,
      screening.health_insurance,
      screening.funeral_insurance,
      screening.number_of_sibling,
      screening.number_of_children,
      screening.number_of_grandchildren,
      screening.id_resident,
      screening.Responsible,
      screening.Illnesses,
      screening.SpecialNeeds,
      screening.id,
    );
  }
}
