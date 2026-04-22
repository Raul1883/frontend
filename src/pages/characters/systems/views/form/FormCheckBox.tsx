import { useFormContext, Controller } from 'react-hook-form';
import type { FieldValues, Path, RegisterOptions } from 'react-hook-form';

type FormCheckboxProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  label?: string;
  rules?: RegisterOptions<TFormValues>;
  disabled?: boolean;
};

export const FormCheckbox = <TFormValues extends FieldValues>({
  name,
  label,
  rules,
  disabled = false,
}: FormCheckboxProps<TFormValues>) => {
  const { control } = useFormContext<TFormValues>();

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState: { error } }) => (
            <div className="bg-green-200">
              <input
                type="checkbox"
                id={name}
                checked={field.value ?? false}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                ref={field.ref}
                disabled={disabled}
              />
              {label && <span>{label}</span>}
              {error && <span style={{ color: 'red', marginLeft: '0.5rem' }}>{error.message}</span>}
            </div>
          )}
        />
      </label>
    </div>
  );
};