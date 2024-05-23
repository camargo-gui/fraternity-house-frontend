import { type HttpClient } from '../../../common/http-client/http-client';
import { type Employee } from '../../entities/employee';

export interface EmployeeService {
  registerEmployee: (
    httpClient: HttpClient,
    employee: Employee,
  ) => Promise<void>;

  getEmployees: (httpClient: HttpClient) => Promise<Employee[]>;

  deleteEmployee: (httpClient: HttpClient, id: string) => Promise<void>;

  updateEmployee: (
    httpClient: HttpClient,
    employee: Employee,
  ) => Promise<boolean>;
}
