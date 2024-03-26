import React, { useState, type ReactElement } from 'react';
import { FormInput } from '../../../common/components/form-input/form-input';
import { Button, Wrapper } from '../resident.styles';
import { type ResidentDTO } from '../../dto/resident-dto';

interface Props {
  changeScreen: () => void;
  handleSubmit: (resident: ResidentDTO) => Promise<void>;
  isSubmitting: boolean;
  editingResident: ResidentDTO | null;
  isEditing: boolean;
}

const initialResidentState: ResidentDTO = {
  cpf: '',
  rg: '',
  name: '',
  contact_phone: '',
  birthday: new Date(),
};

export const ResidentScreenForm = ({
  changeScreen,
  handleSubmit,
  isSubmitting,
  editingResident,
  isEditing,
}: Props): ReactElement => {
  const [resident, setResident] = useState<ResidentDTO>(
    editingResident ?? initialResidentState,
  );

  function clearFields(): void {
    setResident(initialResidentState);
  }

  return (
    <Wrapper>
      <FormInput
        id="nome"
        label="Nome"
        placeholder="Nome"
        value={resident.name}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setResident({ ...resident, name: target.value });
        }}
        type="text"
      />
      <FormInput
        id="cpf"
        label="CPF"
        value={resident.cpf}
        type="text"
        placeholder="CPF"
        disabled={isEditing}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setResident({ ...resident, cpf: target.value });
        }}
      />
      <FormInput
        id="rg"
        label="RG"
        type="text"
        value={resident.rg}
        placeholder="RG"
        disabled={isEditing}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setResident({ ...resident, rg: target.value });
        }}
      />
      <FormInput
        id="contato"
        label="Contato"
        type="text"
        value={resident.contact_phone}
        placeholder="Contato"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setResident({ ...resident, contact_phone: target.value });
        }}
      />
      <FormInput
        id="dataNascimento"
        label="Data de Nascimento"
        type="date"
        value={JSON.stringify(resident.birthday).slice(1, 11)}
        placeholder="Data de Nascimento"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          const date = new Date(target.value);
          setResident({ ...resident, birthday: date });
        }}
      />
      <Button
        text="Cadastrar"
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          handleSubmit(resident);
          clearFields();
        }}
      />
      <Button
        text="Listar Moradores"
        onClick={changeScreen}
        backgroundColor="#6c757d"
        hoverBackgroundColor="#595f64"
        width="auto"
      />
    </Wrapper>
  );
};
