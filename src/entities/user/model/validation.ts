import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Введите логин'),
  password: z
    .string()
    .min(1, 'Введите пароль'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export type LoginFormErrors = Partial<Record<keyof LoginFormData, string>>;

export function validateLoginForm(data: LoginFormData): LoginFormErrors | null {
  const result = loginSchema.safeParse(data);

  if (result.success) return null;

  const errors: LoginFormErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof LoginFormData;
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  }
  return errors;
}
