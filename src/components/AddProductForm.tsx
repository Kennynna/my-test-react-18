import { useRef, useState } from 'react';
import { Button } from '../ui/index.ts';
import { validateAddProductForm, type AddProductFormErrors } from '../entities/product/index.ts';

interface AddProductFormProps {
  onSuccess: () => void;
}

export const AddProductForm = ({ onSuccess }: AddProductFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const brandRef = useRef<HTMLInputElement>(null);
  const skuRef = useRef<HTMLInputElement>(null);

  const [fieldErrors, setFieldErrors] = useState<AddProductFormErrors>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      title: titleRef.current?.value.trim() ?? '',
      price: priceRef.current?.value.trim() ?? '',
      brand: brandRef.current?.value.trim() ?? '',
      sku: skuRef.current?.value.trim() ?? '',
    };

    const errors = validateAddProductForm(data);
    setFieldErrors(errors ?? {});
    if (errors) return;

    onSuccess();
  }

  const fields = [
    { ref: titleRef, name: 'title', label: 'Наименование', placeholder: 'Название товара' },
    { ref: priceRef, name: 'price', label: 'Цена', placeholder: '0.00', type: 'text' },
    { ref: brandRef, name: 'brand', label: 'Вендор', placeholder: 'Бренд' },
    { ref: skuRef, name: 'sku', label: 'Артикул', placeholder: 'SKU-000' },
  ] as const;

  return (
    <form className="add-product-form" onSubmit={handleSubmit} noValidate>
      {fields.map((field) => (
        <div className="form-field" key={field.name}>
          <label className="form-block__label" htmlFor={`add-${field.name}`}>
            {field.label}
          </label>
          <input
            ref={field.ref}
            id={`add-${field.name}`}
            className={`add-product-input${fieldErrors[field.name] ? ' add-product-input--error' : ''}`}
            type={field.name === 'price' ? 'number' : 'text'}
            placeholder={field.placeholder}
            
          />
          {fieldErrors[field.name] && (
            <p className="field-error">{fieldErrors[field.name]}</p>
          )}
        </div>
      ))}
      <Button type="submit" fullWidth style={{ backgroundColor: '#242EDB', marginTop: 8 }} size="lg">
        Добавить товар
      </Button>
    </form>
  );
};
