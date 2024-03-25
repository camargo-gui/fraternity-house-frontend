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
    const token = await service.login(httpClient, data);
    if (token !== undefined) {
      localStorage.setItem('token', token);
      httpClient.setAuthorization(token);
      navigate('/fichas');
    }
    setIsLoading(false);
  };
  return <LoginScreen isSubmitting={isLoading} onSubmit={onSubmit} />;
};
