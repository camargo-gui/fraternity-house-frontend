export class ResidentDTO {
  public constructor(
    public cpf: string,
    public rg: string,
    public name: string,
    public contact_phone: string,
    public birthday: Date,
  ) {}
}
