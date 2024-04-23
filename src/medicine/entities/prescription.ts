export class Prescription {
  public constructor(
    public medicineId: string,
    public dosage: string,
    public frequency: string,
    public startDate: string,
    public endDate: string,
    public firstTime: string,
  ) {}
}
