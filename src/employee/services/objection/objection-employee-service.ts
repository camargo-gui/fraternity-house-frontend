import { type EmployeeService } from '../interfaces/employee-service';
import { type Employee } from '../../entities/employee';
import { type HttpClient } from '../../../common/http-client/http-client';

export class ObjectionEmployeeService implements EmployeeService {
  private readonly apiUrl = '/employee';

  public async registerEmployee(
    httpClient: HttpClient,
    employee: Employee,
  ): Promise<boolean> {
    return await httpClient.post(this.apiUrl, employee);
  }
}
