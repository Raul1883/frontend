import { useFormContext, Controller } from "react-hook-form";
import type { FieldValues, Path, RegisterOptions } from "react-hook-form";

export type SelectOption = {
  value: string | number;
  label: string;
};

type FormSelectProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  rules?: RegisterOptions<TFormValues>;
  className?: string;
  disabled?: boolean;
};

export const FormSelect = <TFormValues extends FieldValues>({
  name,
  label,
  options,
  placeholder,
  rules,
  className = "",
  disabled = false,
}: FormSelectProps<TFormValues>) => {
  const { control } = useFormContext<TFormValues>();

  return (
    <div className="flex gap-y-1">
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <div className="flex">
            <select
              id={name}
              {...field}
              value={field.value ?? ""}
              disabled={disabled}
              className={`pl-2 items-center bg-amber-100 ${className} `}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {error && <span style={{ color: "red" }}>{error.message}</span>}
          </div>
        )}
      />
    </div>
  );
};
