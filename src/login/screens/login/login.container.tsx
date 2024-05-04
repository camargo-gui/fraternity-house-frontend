import { useContext, type ReactElement, useState } from 'react';
import { LoginScreen } from './login';
import { type Login } from '../../entities/login';
import { ObjectionLoginService } from '../../services/objection/objection-login-response';
import { ApplicationContext } from '../../../application-context';
import { useNavigate } from 'react-router-dom';
import { ObjectionResetPasswordResponse } from '../../services/objection/objection-reset-password-response';

export const LoginContainer = (): ReactElement => {
  const { httpClient } = useContext(ApplicationContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailSendForm, setEmailSendForm] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async (data: Login): Promise<void> => {
    setIsLoading(true);
    const service = new ObjectionLoginService();
    const response = await service.login(httpClient, data);
    if (response !== undefined) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('name', response.name);
      localStorage.setItem('role', response.role);
      httpClient.setAuthorization(response.token);
      navigate('/fichas');
    }
    setIsLoading(false);
  };

  const onEmailSend = async (document: string): Promise<void> => {
    setIsLoading(true);
    const service = new ObjectionResetPasswordResponse();
    await service.emailSend(httpClient, document);
    setEmailSendForm(false);
    setIsLoading(false);
  };

  return (
    <LoginScreen
      isSubmitting={isLoading}
      onSubmit={onSubmit}
      onEmailSend={onEmailSend}
      emailSendForm={emailSendForm}
      setEmailSendForm={setEmailSendForm}
    />
  );
};
