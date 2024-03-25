import { type ReactElement } from 'react';
import { type Employee } from '../entities/employee';
import { EmployeeTable } from '../components/employee-table';
import { Wrapper } from './employee.styles';
import { Button } from '../../common/components/button/button';

interface Props {
  changeScreen: () => void;
  employees: Employee[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EmployeeeList = ({
  changeScreen,
  employees,
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
