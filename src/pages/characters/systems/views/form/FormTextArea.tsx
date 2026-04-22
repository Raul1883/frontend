import { useFormContext, Controller } from "react-hook-form";
import type { FieldValues, Path, RegisterOptions } from "react-hook-form";

type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions<TFormValues>;
};

export default <TFormValues extends FieldValues>({
  name,
  placeholder,
  rules,
  label,
}: FormInputProps<TFormValues>) => {
  const { control } = useFormContext<TFormValues>();

  return (
    <div className="w-full">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-1">
            {label && (
              <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
              </label>
            )}
            <textarea
              id={name}
              placeholder={placeholder}
              {...field}
              value={field.value ?? ""}
              className={`
                w-full h-32 p-2 border rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                resize-y 
                ${error ? "border-red-500" : "border-gray-300"}
              `}
            />
            {error && <span className="text-red-500 text-sm">{error.message}</span>}
          </div>
        )}
      />
    </div>
  );
};