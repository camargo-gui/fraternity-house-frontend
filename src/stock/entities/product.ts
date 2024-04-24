export class Product {
  public constructor(
    public name: string,
    public measurement: MeasurementType,
    public quantity?: number,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}

type MeasurementType = 'UNITY' | 'KG' | 'L';
