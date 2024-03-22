import { useState, type ReactElement, useEffect, useContext } from 'react';
import { EmployeeScreen } from './employee';
import { type Role } from '../entities/role';
import { ObjectionRoleService } from '../services/objection/objection-role-service';
import { ObjectionEmployeeService } from '../services/objection/objection-employee-service';
import { toast } from 'react-toastify';
import { type Employee } from '../entities/employee';
import { ApplicationContext } from '../../application-context';

export const EmployeeContainer = (): ReactElement => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { httpClient } = useContext(ApplicationContext);

  useEffect(() => {
    const fetchRoles = async (): Promise<void> => {
      const response = await new ObjectionRoleService().getRoles();
      setRoles(response);
    };
    fetchRoles().catch(() => {});
  }, []);

  const onSubmit = async (employee: Employee): Promise<void> => {
    setIsSubmitting(true);
    const response = await new ObjectionEmployeeService().registerEmployee(
      httpClient,
      employee,
    );
    if (response) toast.success('Funcionário cadastrado com sucesso!');
    setIsSubmitting(false);
  };

  return (
    <EmployeeScreen
      roles={roles}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
    />
  );
};
