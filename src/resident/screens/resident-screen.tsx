import { type ReactElement } from 'react';
import { FormInput } from '../../common/components/form-input/form-input';
import { Button, Wrapper } from './resident.styles';

interface Props {
  changeScreen: () => void;
}

export const ResidentScreenForm = ({ changeScreen }: Props): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: React.ChangeEvent<any>): void => {
    console.log(e.target.value);
  };

  return (
    <Wrapper>
      <FormInput
        id="nome"
        label="Nome"
        placeholder="Nome"
        onChange={handleChange}
        type="text"
      />
      <FormInput
        id="nome"
        label="Nome"
        type="text"
        placeholder="Nome"
        onChange={handleChange}
      />
      <FormInput
        id="cpf"
        label="CPF"
        type="text"
        placeholder="CPF"
        onChange={handleChange}
      />
      <FormInput
        id="rg"
        label="RG"
        type="text"
        placeholder="RG"
        onChange={handleChange}
      />
      <FormInput
        id="contato"
        label="Contato"
        type="text"
        placeholder="Contato"
        onChange={handleChange}
      />
      <FormInput
        id="dataNascimento"
        label="Data de Nascimento"
        type="date"
        placeholder="Data de Nascimento"
        onChange={handleChange}
      />
      <Button text="Cadastrar" onClick={() => {}} />
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
