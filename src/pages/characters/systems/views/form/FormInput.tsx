// FormInput.tsx
import { useFormContext, Controller } from "react-hook-form";
import type { FieldValues, Path, RegisterOptions } from "react-hook-form";

type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  rules?: RegisterOptions<TFormValues>;
  className?: string;
  label?: string;
};

export default <TFormValues extends FieldValues>({
  name,
  type = "text",
  placeholder,
  rules,
  className = "",
  label = "",
}: FormInputProps<TFormValues>) => {
  const { control } = useFormContext<TFormValues>();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <div className="flex">
            {label != "" ? <p>{`${label}:`}</p> : <div />}

            <input
              id={name}
              type={type}
              placeholder={placeholder}
              {...field}
              value={field.value ?? ""}
              className={`pl-2 items-center bg-amber-100 ${className}  ${type == "number" ? "w-10" : ""}`}
            />
            {error && <span style={{ color: "red" }}>{error.message}</span>}
          </div>
        )}
      />
    </div>
  );
};
