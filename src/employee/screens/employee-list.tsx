import { type ReactElement } from 'react';
import { type Employee } from '../entities/employee';
import { EmployeeTable } from '../components/employee-table';
import { Wrapper } from './employee.styles';
import { Button } from '../../common/components/button/button';

interface Props {
  employees: Employee[];
  changeScreen: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
}

export const EmployeeeList = ({
  employees,
  changeScreen,
  onEdit,
  onDelete,
}: Props): ReactElement => {
  return (
    <Wrapper>
      <EmployeeTable
        employees={employees}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <Button
        text="Novo Funcionário"
        onClick={changeScreen}
        backgroundColor="#6c757d"
        hoverBackgroundColor="#595f64"
        width="auto"
      />
    </Wrapper>
  );
};
