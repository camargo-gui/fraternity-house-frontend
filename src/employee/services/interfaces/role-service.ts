import { type HttpClient } from '../../../common/http-client/http-client';
import { type Role } from '../../entities/role';

export interface RoleService {
  getRoles: (httpClient: HttpClient) => Promise<Role[]>;
}
