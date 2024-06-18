import { type AccompanimentStatusEnum } from '../../accompaniment/entities/accompaniment-status';
export class Resident {
  public constructor(
    public cpf: string,
    public rg: string,
    public name: string,
    public contact_phone: string,
    public birthday: Date,
    public has_screening: boolean,
    public psychologicalStatus?: AccompanimentStatusEnum,
    public nutritionistStatus?: AccompanimentStatusEnum,
    public physicalStatus?: AccompanimentStatusEnum,
    public id?: number,
    public url_image?: string,
  ) {}
}
