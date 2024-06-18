import moment from 'moment';
import { type AccompanimentStatusEnum } from './accompaniment-status';

export class Accompaniment {
  public constructor(
    public id: number,
    public date: Date | string,
    public description: string,
    public residentId: number,
    public employeeId: number,
    public type: 'PSYCHOLOGIST' | 'PHYSIOTHERAPIST' | 'NUTRITIONIST',
    public residentName: string,
    public updated_at?: Date | string,
    public nutritionistStatus?: AccompanimentStatusEnum,
    public psychologicalStatus?: AccompanimentStatusEnum,
    public physicalStatus?: AccompanimentStatusEnum,
  ) {}

  toDomain(): Accompaniment {
    return new Accompaniment(
      this.id,
      moment(this.date).format('DD/MM/YYYY'),
      this.description,
      this.residentId,
      this.employeeId,
      this.type,
      this.residentName,
      moment(this.updated_at ?? new Date()).format('DD/MM/YYYY'),
      this.nutritionistStatus,
      this.psychologicalStatus,
      this.physicalStatus,
    );
  }

  setDescription(description: string): this {
    this.description = description;
    return this;
  }
}
