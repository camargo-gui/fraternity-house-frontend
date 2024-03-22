import axios from 'axios';
import { type Role } from '../../entities/role';
import { type RoleService } from '../interfaces/role-service';

export class ObjectionRoleService implements RoleService {
  private readonly apiUrl = 'http://localhost:3344/role';

  public async getRoles(): Promise<Role[]> {
    const response = await axios.get<{ roles: Role[] }>(this.apiUrl, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`,
      },
    });
    return response.data.roles;
  }
}
