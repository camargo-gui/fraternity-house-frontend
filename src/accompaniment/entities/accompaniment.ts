import moment from 'moment';

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
    );
  }

  setDescription(description: string): this {
    this.description = description;
    return this;
  }
}
