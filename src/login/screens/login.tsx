import { useState, type ReactElement } from 'react';
import { Button, LeftSize, Logo, RightSize, Wrapper } from './login.styles';
import ImageLogo from '../../assets/images/logo.png';
import { FormInput } from '../../common/components/form-input/form-input';
import { type Login } from '../entities/login';

interface Props {
  onSubmit: (login: Login) => Promise<void>;
  isSubmitting: boolean;
}

export const LoginScreen = ({
  onSubmit,
  isSubmitting,
}: Props): ReactElement => {
  const [login, setLogin] = useState<Login>({
    cpf: '',
    password: '',
  });
  return (
    <Wrapper>
      <LeftSize>
        <Logo src={ImageLogo} />
      </LeftSize>

      <RightSize>
        <FormInput
          id="cpf"
          label="CPF"
          placeholder="CPF"
          type="text"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setLogin({
              ...login,
              cpf: target.value,
            });
          }}
        />

        <FormInput
          id="password"
          label="Senha"
          placeholder="Senha"
          type="password"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setLogin({
              ...login,
              password: target.value,
            });
          }}
        />

        <Button
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => {
            await onSubmit(login);
          }}
          isLoading={isSubmitting}
          text="Entrar"
        />
      </RightSize>
    </Wrapper>
  );
};
