import { z } from 'zod';

export const addProductSchema = z.object({
  title: z.string().min(1, 'Введите наименование'),
  price: z
    .string()
    .min(1, 'Введите цену')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Цена должна быть положительным числом'),
  brand: z.string().min(1, 'Введите вендора'),
  sku: z.string().min(1, 'Введите артикул'),
});

export type AddProductFormData = z.infer<typeof addProductSchema>;

export type AddProductFormErrors = Partial<Record<keyof AddProductFormData, string>>;

export function validateAddProductForm(data: AddProductFormData): AddProductFormErrors | null {
  const result = addProductSchema.safeParse(data);

  if (result.success) return null;

  const errors: AddProductFormErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof AddProductFormData;
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  }
  return errors;
}
