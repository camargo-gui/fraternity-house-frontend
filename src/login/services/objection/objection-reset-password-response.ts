import { toast } from 'react-toastify';
import { type HttpClient } from '../../../common/http-client/http-client';
import { type ResetPasswordService } from '../interfaces/reset-password-service';
import { type ResetPasswordType } from '../../components/reset-password-form/types';
import { formatSpecialCharacters } from '../../../utils/format-special-characters';

export class ObjectionResetPasswordResponse implements ResetPasswordService {
  private readonly apiUrl = '/reset-password';

  public async emailSend(
    httpClient: HttpClient,
    document: string,
  ): Promise<void> {
    try {
      await httpClient.request({
        path: `${this.apiUrl}/send`,
        method: 'post',
        data: { document: formatSpecialCharacters(document) },
      });

      toast.success(
        'Se o documento for válido, você receberá um link de redefinição em seu email.',
      );
    } catch (e) {
      toast.error(
        'Erro ao enviar email de redefinição de senha. Tente novamente.',
      );
    }
  }

  public async resetPassword(
    httpClient: HttpClient,
    credential: ResetPasswordType,
    token: string,
  ): Promise<void> {
    try {
      await httpClient.request({
        path: `${this.apiUrl}/reset`,
        method: 'post',
        data: {
          password: credential.newPassword,
          passwordConfirmation: credential.confirmNewPassword,
          token,
        },
      });

      toast.success('Senha redefinida com sucesso.');
    } catch (e) {
      toast.error('Erro ao redefinir senha. Tente novamente.');
    }
  }
}
