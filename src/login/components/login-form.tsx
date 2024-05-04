import { type ReactElement } from 'react';
import { IMaskInput } from 'react-imask';
import { FormInput } from '../../common/components/form-input/form-input';
import { formatCpf } from '../../utils/format-special-characters';
import { TransparentButton } from '../screens/login/login.styles';

export const FormLogin = ({
  login,
  setLogin,
  setResetPasswordForm,
}: {
  login: { cpf: string; password: string };
  setLogin: (login: { cpf: string; password: string }) => void;
  setResetPasswordForm: (resetPasswordForm: boolean) => void;
}): ReactElement => {
  return (
    <>
      <FormInput
        id="cpf"
        label="CPF"
        placeholder="CPF"
        type="text"
        mask="000.000.000-00"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setLogin({
            ...login,
            cpf: target.value,
          });
        }}
        value={formatCpf(login.cpf)}
      />

      <FormInput
        id="password"
        placeholder="Senha"
        type="password"
        as={IMaskInput}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setLogin({
            ...login,
            password: target.value,
          });
        }}
      />

      <TransparentButton
        onClick={() => {
          setResetPasswordForm(true);
        }}
        text="Esqueci minha senha"
        color="#002b5e"
        id="forgot_password"
        width="200px"
        padding="0 0 10px 0"
      />
    </>
  );
};
