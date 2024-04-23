export class Product {
  public constructor(
    public name: string,
    public quantity: number,
    public measurement: MeasurementType,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}

type MeasurementType = 'UNITY' | 'KG' | 'L';
