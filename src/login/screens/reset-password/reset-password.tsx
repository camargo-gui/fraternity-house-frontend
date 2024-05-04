import { type ReactElement } from 'react';
import ImageLogo from '../../../assets/images/logo.png';
import { ResetPasswordForm } from '../../components/reset-password-form/reset-password-form';
import { LeftSize, Logo, ResetRightSize, Wrapper } from '../login/login.styles';
import { type ResetPasswordType } from '../../components/reset-password-form/types';

export const ResetPasswordScreen = ({
  onSubmit,
}: {
  onSubmit: (credential: ResetPasswordType) => Promise<void>;
}): ReactElement => {
  addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const button = document.getElementById('submit-reset-button');
      button?.click();
    }
  });

  return (
    <Wrapper>
      <LeftSize>
        <Logo src={ImageLogo} />
      </LeftSize>

      <ResetRightSize>
        <ResetPasswordForm onSubmit={onSubmit} />
      </ResetRightSize>
    </Wrapper>
  );
};
