import {
  useFieldArray,
  type Control,
  type UseFormRegister,
} from "react-hook-form";

type BaseField = {
  key: string;
  label: string;
  ui?: "row" | "column" | "compact";
};

type HeaderField = BaseField & {
  type: "header";
};

type NumberField = BaseField & {
  type: "number";
  defaultValue?: number;
};

type MinMaxField = BaseField & {
  maxKey: string;
  type: "minmax";
  defaultValue?: number;
};

type TextField = BaseField & {
  type: "text";
  defaultValue?: string;
};

type TextareaField = BaseField & {
  type: "textarea";
  defaultValue?: string;
};

type SelectField = BaseField & {
  type: "select";
  options: string[];
  defaultValue?: string;
};

type CheckboxField = BaseField & {
  type: "checkbox";
  defaultValue?: boolean;
};

type ArrayField = BaseField & {
  type: "array";
  itemSchema: Field[];
  defaultValue?: any[]; // или unknown[], если хочешь строже
};

export type Field =
  | NumberField
  | TextField
  | TextareaField
  | SelectField
  | CheckboxField
  | ArrayField
  | MinMaxField
  | HeaderField;

export type Section = {
  title: string;
  fields: Field[];
  layout?: "unbound" | "compact" | "list";
  columns?: number;
};

export type CharacterSchema = {
  sections: Section[];
};

export function ArrayField({
  field,
  control,
  register,
}: {
  field: any;
  control: Control<any>;
  register: UseFormRegister<any>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: field.key,
  });

  return (
    <div className="space-y-3 text-amber-50">
      <h4>{field.label}</h4>

      {fields.map((item, index) => (
        <div key={item.id} className="rounded-xl border border-zinc-800 p-3">
          {field.itemSchema.map((subField: any) => {
            const fullKey = `${field.key}.${index}.${subField.key}`;

            return (
              <div
                key={fullKey}
                className="grid grid-cols-1 gap-3 md:grid-cols-2"
              >
                <label>{subField.label}</label>
                <input {...register(fullKey)} />
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => remove(index)}
            className="mt-2 text-xs text-red-400 hover:text-red-300"
          >
            Удалить
          </button>
        </div>
      ))}

      <button
        type="button"
        className="text-sm text-indigo-400 hover:text-indigo-300"
        onClick={() => append({})}
      >
        Добавить
      </button>
    </div>
  );
}
