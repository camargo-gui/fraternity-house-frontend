import { type Role } from '../../entities/role';
import { type RoleService } from '../interfaces/role-service';
import { type HttpClient } from '../../../common/http-client/http-client';
import { toast } from 'react-toastify';
import { RoleResponse } from '../response/role-response';

export class ObjectionRoleService implements RoleService {
  private readonly apiUrl = '/role';

  public async getRoles(httpClient: HttpClient): Promise<Role[]> {
    try {
      const response = await httpClient.request({
        path: this.apiUrl,
        method: 'get',
      });
      toast.success('Roles com sucesso');
      return response?.getData(RoleResponse).roles ?? [];
    } catch (e) {
      return [];
    }
  }
}
