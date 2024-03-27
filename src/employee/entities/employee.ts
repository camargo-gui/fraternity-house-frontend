import { type Role } from './role';

export class Employee {
  public constructor(
    public name: string,
    public document: string,
    public email: string,
    public phone: string,
    public Role: Role,
    public password?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public id?: string,
  ) {}
}
