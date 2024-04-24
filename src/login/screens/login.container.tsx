import { useContext, type ReactElement, useState } from 'react';
import { LoginScreen } from './login';
import { type Login } from '../entities/login';
import { ObjectionLoginService } from '../services/objection/objection-login-response';
import { ApplicationContext } from '../../application-context';
import { useNavigate } from 'react-router-dom';

export const LoginContainer = (): ReactElement => {
  const { httpClient } = useContext(ApplicationContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async (data: Login): Promise<void> => {
    setIsLoading(true);
    const service = new ObjectionLoginService();
    const response = await service.login(httpClient, data);
    if (response !== undefined) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('name', response.name);
      httpClient.setAuthorization(response.token);
      navigate('/fichas');
    }
    setIsLoading(false);
  };
  return <LoginScreen isSubmitting={isLoading} onSubmit={onSubmit} />;
};
