import * as z from 'zod';

export const PASSWORD_MIN_LENGTH = 8;

export const ResetPasswordData = z.object({
  newPassword: z
    .string()
    .min(PASSWORD_MIN_LENGTH, {
      message: 'A senha deve ter no mínimo 8 caracteres.',
    })
    .regex(/[A-Z]/, {
      message: 'A senha deve conter pelo menos 1 letra maiúscula.',
    })
    .regex(/[a-z]/, {
      message: 'A senha deve conter pelo menos 1 letra minúscula.',
    })
    .regex(/[0-9]/, { message: 'A senha deve conter pelo menos 1 número.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'A senha deve conter pelo menos 1 caractere especial.',
    }),
  confirmNewPassword: z
    .string()
    .refine((password) => password !== '', { message: 'emptyPassword' }),
});

export interface ResetPasswordFormProps {
  onSubmit: (credential: ResetPasswordType) => Promise<void>;
}

export type ResetPasswordType = z.infer<typeof ResetPasswordData>;

export enum ResetPasswordFields {
  newPassword = 'newPassword',
  confirmNewPassword = 'confirmNewPassword',
}
