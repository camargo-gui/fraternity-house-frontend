import { type ReactElement } from 'react';
import { FormInput } from '../../common/components/form-input/form-input';
import { FaArrowLeft } from 'react-icons/fa';
import { GoBackButton } from '../screens/login/login.styles';
import { formatCpf } from '../../utils/format-special-characters';

export const EmailSendForm = ({
  document,
  setDocument,
  setEmailSendForm,
}: {
  document: string;
  setDocument: (document: string) => void;
  setEmailSendForm: (resetPasswordForm: boolean) => void;
}): ReactElement => {
  return (
    <>
      <GoBackButton
        onClick={() => {
          setDocument('');
          setEmailSendForm(false);
        }}
        text="Voltar para login"
        leadingIcon={<FaArrowLeft />}
      />
      <FormInput
        id="cpf"
        label="CPF"
        placeholder="Digite seu CPF"
        type="text"
        mask="000.000.000-00"
        value={formatCpf(document)}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setDocument(target.value);
        }}
      />
    </>
  );
};
