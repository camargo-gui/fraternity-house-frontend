import { type Employee } from '../../entities/employee';

export class EmployeeResponse {
  public constructor(public employees: Employee[]) {}
}
