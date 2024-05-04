import { type HttpClient } from '../../../common/http-client/http-client';
import { type ResetPasswordType } from '../../components/reset-password-form/types';

export interface ResetPasswordService {
  emailSend: (httpClient: HttpClient, document: string) => Promise<void>;
  resetPassword: (
    HttpClient: HttpClient,
    credential: ResetPasswordType,
    token: string,
  ) => Promise<void>;
}
