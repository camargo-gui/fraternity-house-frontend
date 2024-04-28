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
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/slices/loadingSlice';
import { cpf } from 'cpf-cnpj-validator';
import { toast } from 'react-toastify';

type Screen = 'EmployeeRegister' | 'EmployeeList';

export const EmployeeContainer = (): ReactElement => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [screen, setScreen] = useState<Screen>('EmployeeList');

  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | undefined>();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { httpClient } = useContext(ApplicationContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRoles = async (): Promise<void> => {
      const response = await new ObjectionRoleService().getRoles(httpClient);
      setRoles(response);
    };
    fetchRoles().catch(() => {});
  }, [httpClient]);

  const changeScreen = useCallback((): void => {
    if (screen === 'EmployeeList' && isEditting) {
      setIsEditting(false);
      setEmployeeToEdit(undefined);
    }
    setScreen(screen === 'EmployeeList' ? 'EmployeeRegister' : 'EmployeeList');
  }, [isEditting, screen]);

  const fetchEmployees = useCallback(async (): Promise<void> => {
    dispatch(setLoading(true));
    const response = await new ObjectionEmployeeService().getEmployees(
      httpClient,
    );
    setEmployees(response);
    dispatch(setLoading(false));
  }, [dispatch, httpClient]);

  useEffect(() => {
    fetchEmployees().catch(noop);
  }, [changeScreen, fetchEmployees]);

  const onSubmit = async (employee: Employee): Promise<void> => {
    setIsSubmitting(true);

    if (cpf.isValid(employee.document)) {
      const response = await new ObjectionEmployeeService().registerEmployee(
        httpClient,
        employee,
      );
      if (response) changeScreen();
    } else {
      toast.error('CPF inválido');
    }
    setIsSubmitting(false);
  };

  const onEditPress = (document: string): void => {
    const employee = employees.find((emp) => emp.document === document);
    if (employee !== undefined) {
      setEmployeeToEdit(employee);
      setIsEditting(true);
      setScreen('EmployeeRegister');
    }
  };

  const onEdit = async (employee: Employee): Promise<void> => {
    setIsSubmitting(true);
    const response = await new ObjectionEmployeeService().updateEmployee(
      httpClient,
      employee,
    );
    setIsSubmitting(false);
    if (response) changeScreen();
  };

  const onDelete = async (document: string): Promise<void> => {
    await new ObjectionEmployeeService().deleteEmployee(httpClient, document);
    setEmployees(employees.filter((employee) => employee.id !== document));
    fetchEmployees().catch(noop);
  };

  if (screen === 'EmployeeList') {
    return (
      <EmployeeeList
        employees={employees}
        changeScreen={changeScreen}
        onDelete={onDelete}
        onEdit={onEditPress}
      />
    );
  }

  return (
    <EmployeeScreen
      roles={roles}
      isSubmitting={isSubmitting}
      employeeToEdit={employeeToEdit}
      isEditting={isEditting}
      onSubmit={onSubmit}
      onEdit={onEdit}
      changeScreen={changeScreen}
    />
  );
};
