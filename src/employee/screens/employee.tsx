import { useState, type ReactElement } from 'react';
import { FormInput } from '../../common/components/form-input/form-input';
import { Wrapper } from '../../resident/screens/resident.styles';
import { type Role } from '../entities/role';
import { Button } from '../../common/components/button/button';
import { type Employee } from '../entities/employee';

interface Props {
  roles: Role[];
  onSubmit: (employee: Employee) => Promise<void>;
  isSubmitting: boolean;
}

export const EmployeeScreen = ({
  roles,
  isSubmitting,
  onSubmit,
}: Props): ReactElement => {
  const [employee, setEmployee] = useState<Employee>({
    name: '',
    document: '',
    email: '',
    password: '',
    phone: '',
    role_id: 0,
  });

  return (
    <Wrapper>
      <FormInput
        label="Nome"
        type="text"
        placeholder="Nome"
        id="name"
        onChange={() => {
          setEmployee({
            ...employee,
            name: 'name',
          });
        }}
      />

      <FormInput
        label="CPF"
        type="text"
        placeholder="CPF"
        id="document"
        onChange={() => {
          setEmployee({
            ...employee,
            document: 'document',
          });
        }}
      />

      <FormInput
        label="Email"
        type="text"
        placeholder="Email"
        id="email"
        onChange={() => {
          setEmployee({
            ...employee,
            email: 'email',
          });
        }}
      />

      <FormInput
        label="Primeira senha"
        type="text"
        placeholder="Primeira senha"
        id="password"
        onChange={() => {
          setEmployee({
            ...employee,
            password: 'password',
          });
        }}
      />

      <FormInput
        label="Telefone"
        type="text"
        placeholder="Telefone"
        id="phone"
        onChange={() => {
          setEmployee({
            ...employee,
            phone: 'phone',
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
            role_id: Number(target.value),
          });
        }}
      />

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
    </Wrapper>
  );
};
