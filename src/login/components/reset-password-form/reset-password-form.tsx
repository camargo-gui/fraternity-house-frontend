import { isEmpty } from 'lodash';
import { useState, type ReactElement } from 'react';

import { FormInput } from '../../../common/components/form-input/form-input';
import { Button } from '../../screens/login/login.styles';
import { RequirementBoxContent } from './components/requirement-box-content/requirement-box-content';
import { FormDescriptionText, Wrapper } from './reset-password-form.styles';
import {
  PASSWORD_MIN_LENGTH,
  type ResetPasswordFormProps,
  type ResetPasswordType,
} from './types';
import { useSelector } from 'react-redux';
import { type RootState } from '../../../redux/store/store';

// eslint-disable-next-line max-lines-per-function
export const ResetPasswordForm = ({
  onSubmit,
}: ResetPasswordFormProps): ReactElement => {
  const [values, setValues] = useState<ResetPasswordType>({
    newPassword: '',
    confirmNewPassword: '',
  });
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  const [requirements, setRequirements] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    minLength: false,
  });

  const isValid =
    requirements.uppercase &&
    requirements.lowercase &&
    requirements.number &&
    requirements.specialChar &&
    requirements.minLength &&
    values.newPassword === values.confirmNewPassword;

  function checkRequirements(value: string): void {
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasMinLength = value.length >= PASSWORD_MIN_LENGTH;

    setRequirements({
      uppercase: hasUppercase,
      lowercase: hasLowercase,
      number: hasNumber,
      specialChar: hasSpecialChar,
      minLength: hasMinLength,
    });
  }

  const showError = (): string => {
    if (
      !isEmpty(values.confirmNewPassword) &&
      values.newPassword !== values.confirmNewPassword
    ) {
      return 'As senhas não coincidem.';
    }

    return '';
  };

  return (
    <>
      <FormInput
        id="new-password-input"
        value={values.newPassword}
        onChange={(value) => {
          const target = value.target as HTMLInputElement;
          setValues({ ...values, newPassword: target.value });
          checkRequirements(target.value);
        }}
        type="password"
        placeholder={'Crie sua nova senha'}
      />

      <FormInput
        id="confirm-new-password-input"
        value={values.confirmNewPassword}
        onChange={(value) => {
          const target = value.target as HTMLInputElement;
          setValues({ ...values, confirmNewPassword: target.value });
        }}
        placeholder={'Confirme sua nova senha'}
        type="password"
        errorMessage={showError()}
      />

      <Wrapper>
        <FormDescriptionText>
          Por medidas de segurança, sua senha precisa atender os seguintes
          requisitos abaixo:
        </FormDescriptionText>
      </Wrapper>
      <RequirementBoxContent requirements={requirements} />
      <Button
        text="Redefinir"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async () => {
          await onSubmit(values);
        }}
        isDisabled={!isValid}
        id="submit-reset-button"
        isLoading={isLoading}
      />
    </>
  );
};
