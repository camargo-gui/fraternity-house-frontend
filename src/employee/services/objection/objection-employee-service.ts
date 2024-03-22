import { type EmployeeService } from '../interfaces/employee-service';
import { type Employee } from '../../entities/employee';
import { type HttpClient } from '../../../common/http-client/http-client';
import { toast } from 'react-toastify';
import { noop } from 'lodash';

export class ObjectionEmployeeService implements EmployeeService {
  private readonly apiUrl = '/employee';

  public async registerEmployee(
    httpClient: HttpClient,
    employee: Employee,
  ): Promise<void> {
    try {
      await httpClient.request({
        path: this.apiUrl,
        method: 'post',
        data: employee,
      });
      toast.success('Funcionário cadastrado com sucesso');
    } catch (e) {
      noop();
    }
  }
}
