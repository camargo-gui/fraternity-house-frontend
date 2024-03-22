export class Employee {
  public constructor(
    public name: string,
    public document: string,
    public email: string,
    public password: string,
    public phone: string,
    public role_id: number,
    public createdAt?: Date,
    public updatedAt?: Date,
    public id?: string,
  ) {}
}
