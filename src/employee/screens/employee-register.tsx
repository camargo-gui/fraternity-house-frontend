import { useState, type ReactElement } from 'react';
import { FormInput } from '../../common/components/form-input/form-input';
import { Wrapper } from '../../resident/screens/resident.styles';
import { type Role } from '../entities/role';
import { Button } from '../../common/components/button/button';
import { type Employee } from '../entities/employee';
import { ButtonWrapper } from './employee.styles';
import { IMaskInput } from 'react-imask';

interface Props {
  roles: Role[];
  isSubmitting: boolean;
  employeeToEdit?: Employee;
  isEditting: boolean;
  onSubmit: (employee: Employee) => Promise<void>;
  changeScreen: () => void;
  onEdit: (employee: Employee) => Promise<void>;
}

const initialEmployeeState: Employee = {
  name: '',
  document: '',
  email: '',
  password: '',
  phone: '',
  Role: {
    id: '',
    name: '',
  },
};

export const EmployeeScreen = ({
  roles,
  isSubmitting,
  employeeToEdit,
  isEditting,
  changeScreen,
  onSubmit,
  onEdit,
}: Props): ReactElement => {
  const [employee, setEmployee] = useState<Employee>(
    employeeToEdit ?? initialEmployeeState,
  );

  const onPress = async (): Promise<void> => {
    if (isEditting) {
      await onEdit(employee);
    } else await onSubmit(employee);
  };

  return (
    <Wrapper>
      <FormInput
        label="Nome"
        type="text"
        placeholder="Nome"
        id="name"
        value={employee?.name}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setEmployee({
            ...employee,
            name: target.value,
          });
        }}
      />

      <FormInput
        label="CPF"
        type="text"
        placeholder="CPF"
        id="document"
        disabled={isEditting}
        as={IMaskInput}
        mask="000.000.000-00"
        value={employee?.document}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setEmployee({
            ...employee,
            document: target.value,
          });
        }}
      />

      <FormInput
        label="Email"
        type="text"
        placeholder="Email"
        id="email"
        value={employee?.email}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setEmployee({
            ...employee,
            email: target.value,
          });
        }}
      />

      {!isEditting && (
        <FormInput
          label="Primeira senha"
          type="password"
          placeholder="Primeira senha"
          id="password"
          value={employee?.password}
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setEmployee({
              ...employee,
              password: target.value,
            });
          }}
        />
      )}

      <FormInput
        label="Telefone"
        type="text"
        placeholder="Telefone"
        id="phone"
        as={IMaskInput}
        mask="(00) 00000-0000"
        value={employee?.phone}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setEmployee({
            ...employee,
            phone: target.value,
          });
        }}
      />
      <FormInput
        id="role"
        label="Cargo"
        type="select"
        value={employee.Role.id}
        options={roles.map((role) => {
          return {
            label: role.name,
            value: role.id,
          };
        })}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setEmployee({
            ...employee,
            Role: {
              id: target.value,
              name: '',
            },
          });
        }}
      />

      <ButtonWrapper>
        <Button
          text={isEditting ? 'Editar funcionário' : 'Cadastrar funcionário'}
          onClick={() => {
            void onPress();
          }}
          backgroundColor="#6c757d"
          hoverBackgroundColor="#595f64"
          width="auto"
          isLoading={isSubmitting}
        />

        <Button
          text="Listar funcionários"
          onClick={changeScreen}
          backgroundColor="#413dca"
          hoverBackgroundColor="#3a37b3"
          width="auto"
        />
      </ButtonWrapper>
    </Wrapper>
  );
};
