import { TextInput } from '../../common/components/text-input/text-input';
import React, { type ReactElement } from 'react';
import { Button, Wrapper } from './resident.styles';

interface Props {
  changeScreen: () => void;
}

export const ResidentScreen = ({ changeScreen }: Props): ReactElement => {
  return (
    <Wrapper>
      <TextInput label="Nome" placeholder="Nome" />
      <TextInput label="CPF" placeholder="CPF" />
      <TextInput label="RG" placeholder="RG" />
      <TextInput label="Contato" placeholder="Contato" />
      <TextInput label="Data de Nascimento" placeholder="Data de Nascimento" />
      <Button text="Cadastrar" onClick={() => {}} />
      <Button
        text="Cadastrados"
        onClick={changeScreen}
        backgroundColor="#6c757d"
        hoverBackgroundColor="#595f64"
      />
    </Wrapper>
  );
};
