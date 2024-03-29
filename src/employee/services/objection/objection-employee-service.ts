import { type EmployeeService } from '../interfaces/employee-service';
import { type Employee } from '../../entities/employee';
import { type HttpClient } from '../../../common/http-client/http-client';
import { noop } from 'lodash';
import { EmployeeResponse } from '../response/employee-response';

export class ObjectionEmployeeService implements EmployeeService {
  private readonly apiUrl = '/employee';

  public async registerEmployee(
    httpClient: HttpClient,
    employee: Employee,
  ): Promise<boolean> {
    try {
      const { Role, ...employeeData } = employee;
      await httpClient.request({
        path: this.apiUrl,
        method: 'post',
        data: {
          ...employeeData,
          role_id: Number(employee.Role.id),
        },
      });
      return true;
    } catch (e) {
      noop();
      return false;
    }
  }

  public async getEmployees(httpClient: HttpClient): Promise<Employee[]> {
    try {
      const response = await httpClient.request({
        path: this.apiUrl,
        method: 'get',
      });

      return response?.getData(EmployeeResponse).employees ?? [];
    } catch (e) {
      return [];
    }
  }

  public async deleteEmployee(
    httpClient: HttpClient,
    document: string,
  ): Promise<void> {
    try {
      await httpClient.request({
        path: `${this.apiUrl}/${document}`,
        method: 'delete',
      });
    } catch (e) {
      noop();
    }
  }

  public async updateEmployee(
    httpClient: HttpClient,
    employee: Employee,
  ): Promise<boolean> {
    const { Role, ...employeeData } = employee;
    try {
      await httpClient.request({
        path: `${this.apiUrl}`,
        method: 'put',
        data: {
          ...employeeData,
          role_id: Number(employee.Role.id),
        },
      });
      return true;
    } catch (e) {
      noop();
      return false;
    }
  }
}
