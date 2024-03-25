import {
  useState,
  type ReactElement,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { EmployeeScreen } from './employee-register';
import { type Role } from '../entities/role';
import { ObjectionRoleService } from '../services/objection/objection-role-service';
import { ObjectionEmployeeService } from '../services/objection/objection-employee-service';
import { type Employee } from '../entities/employee';
import { ApplicationContext } from '../../application-context';
import { EmployeeeList } from './employee-list';
import { noop } from 'lodash';

type Screen = 'EmployeeRegister' | 'EmployeeList';

export const EmployeeContainer = (): ReactElement => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [screen, setScreen] = useState<Screen>('EmployeeList');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { httpClient } = useContext(ApplicationContext);

  useEffect(() => {
    const fetchRoles = async (): Promise<void> => {
      const response = await new ObjectionRoleService().getRoles(httpClient);
      setRoles(response);
    };
    fetchRoles().catch(() => {});
  }, []);

  const changeScreen = useCallback((): void => {
    setScreen(screen === 'EmployeeList' ? 'EmployeeRegister' : 'EmployeeList');
  }, [screen]);

  useEffect(() => {
    const fetchEmployees = async (): Promise<void> => {
      const response = await new ObjectionEmployeeService().getEmployees(
        httpClient,
      );
      setEmployees(response);
    };

    fetchEmployees().catch(() => {});
  }, [changeScreen]);

  const onSubmit = async (employee: Employee): Promise<void> => {
    setIsSubmitting(true);
    await new ObjectionEmployeeService().registerEmployee(httpClient, employee);
    setIsSubmitting(false);
    changeScreen();
  };

  if (screen === 'EmployeeList') {
    return (
      <EmployeeeList
        employees={employees}
        changeScreen={changeScreen}
        onDelete={noop}
        onEdit={noop}
      />
    );
  }

  return (
    <EmployeeScreen
      roles={roles}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      changeScreen={changeScreen}
    />
  );
};
