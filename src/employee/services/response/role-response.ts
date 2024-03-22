import { type Role } from '../../entities/role';

export class RoleResponse {
  public constructor(public roles: Role[]) {}
}
