import { useContext, type ReactElement } from 'react';
import { ApplicationContext } from '../../../application-context';
import { type ResetPasswordType } from '../../components/reset-password-form/types';
import { ObjectionResetPasswordResponse } from '../../services/objection/objection-reset-password-response';
import { ResetPasswordScreen } from './reset-password';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/slices/loadingSlice';

export const ResetPasswordContainer = (): ReactElement => {
  const { httpClient } = useContext(ApplicationContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = new URLSearchParams(window.location.search).get('token');

  async function onSubmit(credential: ResetPasswordType): Promise<void> {
    try {
      const service = new ObjectionResetPasswordResponse();
      dispatch(setLoading(true));
      await service.resetPassword(httpClient, credential, token ?? '');
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setLoading(false));
      navigate('/login');
    }
  }

  return <ResetPasswordScreen onSubmit={onSubmit} />;
};
