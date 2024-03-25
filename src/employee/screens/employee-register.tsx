import { useState, type ReactElement } from 'react';
import { FormInput } from '../../common/components/form-input/form-input';
import { Wrapper } from '../../resident/screens/resident.styles';
import { type Role } from '../entities/role';
import { Button } from '../../common/components/button/button';
import { type Employee } from '../entities/employee';
import { ButtonWrapper } from './employee.styles';

interface Props {
  roles: Role[];
  onSubmit: (employee: Employee) => Promise<void>;
  changeScreen: () => void;
  isSubmitting: boolean;
}

export const EmployeeScreen = ({
  roles,
  isSubmitting,
  changeScreen,
  onSubmit,
}: Props): ReactElement => {
  const [employee, setEmployee] = useState<Employee>({
    name: '',
    document: '',
    email: '',
    password: '',
    phone: '',
    Role: {
      id: '',
      name: '',
    },
  });

  return (
    <Wrapper>
      <FormInput
        label="Nome"
        type="text"
        placeholder="Nome"
        id="name"
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
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setEmployee({
            ...employee,
            email: target.value,
          });
        }}
      />

      <FormInput
        label="Primeira senha"
        type="password"
        placeholder="Primeira senha"
        id="password"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setEmployee({
            ...employee,
            password: target.value,
          });
        }}
      />

      <FormInput
        label="Telefone"
        type="text"
        placeholder="Telefone"
        id="phone"
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
          text="Cadastrar"
          onClick={() => {
            void onSubmit(employee);
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
