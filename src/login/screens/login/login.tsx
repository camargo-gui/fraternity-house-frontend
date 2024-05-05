import { useState, type ReactElement } from 'react';
import ImageLogo from '../../../assets/images/logo.png';
import { type Login } from '../../entities/login';
import { Button, LeftSize, Logo, RightSize, Wrapper } from './login.styles';
import { FormLogin } from '../../components/login-form';
import { EmailSendForm } from '../../components/email-send-form';

interface Props {
  onSubmit: (login: Login) => Promise<void>;
  isSubmitting: boolean;
  onEmailSend: (document: string) => Promise<void>;
  emailSendForm: boolean;
  setEmailSendForm: (resetPasswordForm: boolean) => void;
}

export const LoginScreen = ({
  onSubmit,
  isSubmitting,
  onEmailSend,
  emailSendForm,
  setEmailSendForm,
}: Props): ReactElement => {
  const [login, setLogin] = useState<Login>({
    cpf: '',
    password: '',
  });
  const [employeeDocument, setEmployeeDocument] = useState<string>('');

  addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const button = document.getElementById('login_button');
      button?.click();
    }
  });

  function getButtonLabel(): string {
    return emailSendForm ? 'Redefinir Senha' : 'Entrar';
  }

  async function getSubmitFunction(): Promise<void> {
    emailSendForm ? await onEmailSend(employeeDocument) : await onSubmit(login);
  }

  return (
    <Wrapper>
      <LeftSize>
        <Logo src={ImageLogo} />
      </LeftSize>

      <RightSize>
        {emailSendForm ? (
          <EmailSendForm
            document={employeeDocument}
            setDocument={setEmployeeDocument}
            setEmailSendForm={setEmailSendForm}
          />
        ) : (
          <FormLogin
            login={login}
            setLogin={setLogin}
            setResetPasswordForm={setEmailSendForm}
          />
        )}

        <Button
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => {
            setEmployeeDocument('');
            await getSubmitFunction();
          }}
          isLoading={isSubmitting}
          text={getButtonLabel()}
          id="login_button"
        />
      </RightSize>
    </Wrapper>
  );
};
