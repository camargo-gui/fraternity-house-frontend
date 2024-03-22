import React, { useState, type ReactElement, useContext } from 'react';
import { FormInput } from '../../../common/components/form-input/form-input';
import { Button, Wrapper } from '../resident.styles';
import { ObjectionResidentService } from '../../services/objection/objection-resident-service';
import { toast } from 'react-toastify';
import { type ResidentDTO } from '../../dto/resident-dto';
import { ApplicationContext } from '../../../application-context';

interface Props {
  changeScreen: () => void;
}

export const ResidentScreenForm = ({ changeScreen }: Props): ReactElement => {
  const { httpClient } = useContext(ApplicationContext);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [resident, setResident] = useState<ResidentDTO>({
    cpf: '',
    rg: '',
    name: '',
    contact_phone: '',
    birthday: new Date(),
  });
  const service = new ObjectionResidentService();

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    const response = await service.postResident(httpClient, resident);
    if (response) {
      toast.success('Morador cadastrado com sucesso!');
    }
    setIsSubmitting(false);
  };

  return (
    <Wrapper>
      <FormInput
        id="nome"
        label="Nome"
        placeholder="Nome"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setResident({ ...resident, name: target.value });
        }}
        type="text"
      />
      <FormInput
        id="cpf"
        label="CPF"
        type="text"
        placeholder="CPF"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setResident({ ...resident, cpf: target.value });
        }}
      />
      <FormInput
        id="rg"
        label="RG"
        type="text"
        placeholder="RG"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setResident({ ...resident, rg: target.value });
        }}
      />
      <FormInput
        id="contato"
        label="Contato"
        type="text"
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
          handleSubmit();
        }}
        isLoading={isSubmitting}
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
