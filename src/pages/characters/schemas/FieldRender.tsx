import type { Control, UseFormRegister } from "react-hook-form";
import { ArrayField, type Field } from "../systems/types/Form";

export function FieldRenderer({
  field,
  register,
  control,
}: {
  field: Field;
  register: UseFormRegister<any>;
  control: Control<any, any, any>;
}) {
  const baseInput = "border-b"; //"border px-2 p-1 outline-none focus:ring-1 ";

  const labelClass = ""; //"block text-xs font-medium text-zinc-400 w-max ";

  const wrapper = "flex gap-2 items-start px-2"; //"flex flex-col gap-1 mb-3";

  switch (field.type) {
    case "number":
      let numberWrapper = "";
      if (field.ui == "row") {
        numberWrapper = " flex-row justify-between";
      }

      return (
        <div className={`${wrapper}  ${numberWrapper}  `}>
          <label className={labelClass}>{field.label}</label>
          <input
            type="number"
            className={`${baseInput} w-8`}
            {...register(field.key, {
              valueAsNumber: true,
            })}
          />
        </div>
      );

    case "minmax":
      return (
        <div className={`${wrapper} `}>
          <label className={labelClass}>{field.label}</label>
          <div>
            <input
              type="number"
              className={`${baseInput} w-8 border`}
              {...register(field.key, { valueAsNumber: true })}
            />
            <input
              type="number"
              className={`${baseInput} w-8 border border-l-0`}
              {...register(field.maxKey, { valueAsNumber: true })}
            />
          </div>
        </div>
      );

    case "header":
      return (
        <div className={wrapper}>
          <h3>{field.label}</h3>
        </div>
      );

    case "text":
      return (
        <div className={wrapper}>
          <label className={labelClass}>{field.label}</label>
          <input type="text" className={baseInput} {...register(field.key)} />
        </div>
      );

    case "textarea":
      return (
        <div className={wrapper}>
          <label className={labelClass}>{field.label}</label>
          <textarea className={`${baseInput}`} {...register(field.key)} />
        </div>
      );

    case "select":
      return (
        <div className={wrapper}>
          <label className={labelClass}>{field.label}</label>
          <select className={baseInput} {...register(field.key)}>
            {field.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      );

    case "checkbox":
      return (
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" className="h-4 w-4" {...register(field.key)} />
          {field.label}
        </label>
      );

    case "array":
      return (
        <div className="col-span-full">
          <ArrayField field={field} control={control} register={register} />
        </div>
      );

    default:
      return null;
  }
}
