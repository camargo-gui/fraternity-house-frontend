import { type RoleEnum } from '../interfaces/role';

export class LoginResponse {
  public constructor(
    public readonly token: string,
    public readonly name: string,
    public readonly role: RoleEnum,
  ) {}
}
