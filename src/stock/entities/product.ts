import { type MeasurementEnum } from './measurement-type';

export class Product {
  public constructor(
    public name: string,
    public measurement: MeasurementEnum,
    public id?: string,
    public quantity?: number,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
