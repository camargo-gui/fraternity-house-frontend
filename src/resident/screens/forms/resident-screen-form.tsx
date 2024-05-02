import { useState, type ReactElement } from 'react';
import { FormInput } from '../../../common/components/form-input/form-input';
import { type ResidentDTO } from '../../dto/resident-dto';
import { Button, Wrapper } from '../resident.styles';
import { IMaskInput } from 'react-imask';
import { cpf } from 'cpf-cnpj-validator';

interface Props {
  changeScreen: () => void;
  handleSubmit: (resident: ResidentDTO) => Promise<void>;
  isSubmitting: boolean;
  editingResident: ResidentDTO | null;
  isEditing: boolean;
  setSelectedFile: (file: File | null) => void;
}

const initialResidentState: ResidentDTO = {
  cpf: '',
  rg: '',
  name: '',
  contact_phone: '',
  birthday: new Date(),
  url_image: '',
};

export const ResidentScreenForm = ({
  changeScreen,
  handleSubmit,
  isSubmitting,
  editingResident,
  isEditing,
  setSelectedFile,
}: Props): ReactElement => {
  const [resident, setResident] = useState<ResidentDTO>(
    editingResident ?? initialResidentState,
  );
  const [cpfError, setCpfError] = useState<string | undefined>(undefined);

  function clearFields(): void {
    setResident(initialResidentState);
  }

  const onClick = async (): Promise<void> => {
    if (cpf.isValid(resident.cpf)) {
      await handleSubmit(resident);
      clearFields();
      return;
    }

    setCpfError('CPF inválido');
  };

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
        errorMessage={cpfError}
        type="text"
        placeholder="CPF"
        as={IMaskInput}
        mask="000.000.000-00"
        disabled={isEditing}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setResident({ ...resident, cpf: target.value });
          setCpfError(undefined);
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
        as={IMaskInput}
        mask="(00) 00000-0000"
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
      <FormInput
        id="resident_image"
        label="Imagem"
        type="file"
        placeholder="Imagem"
        onChange={(e) => {
          const files = (e.target as HTMLInputElement).files;
          if (files !== null && files.length > 0) {
            setSelectedFile(files[0]);
          } else {
            setSelectedFile(null);
          }
        }}
      />
      <Button
        text={isEditing ? 'Editar Morador' : 'Cadastrar Morador'}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async () => {
          await onClick();
        }}
        isLoading={isSubmitting}
        width="200px"
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
