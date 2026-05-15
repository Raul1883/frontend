import {
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import {
  type Field,
} from "../types/CharacterSheet";
import { InventoryTableField } from "./ArrayField";

export function FieldRenderer({
  field,
  register,
  control,
}: {
  field: Field;
  register: UseFormRegister<any>;
  control: Control<any, any, any>;
}) {
  const baseInput = "border-b";

  const labelClass = "";

  const wrapper = "flex gap-2 items-start px-2 ";

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
            className={`${baseInput} w-8 `}
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
          <div className="flex">
            <input
              type="number"
              className={`${baseInput} w-8 border text-center`}
              {...register(field.key, { valueAsNumber: true })}
            />

            <input
              type="number"
              className={`${baseInput} w-8 border border-l-0 text-center`}
              {...register(`${field.key}_max`, { valueAsNumber: true })}
            />
          </div>
        </div>
      );

    case "header":
      return (
        <div className={wrapper}>
          <h3 className="font-bold">{field.label}</h3>
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
        <div className={`${wrapper} flex flex-col`}>
          <label className={labelClass}>{field.label}</label>
          <textarea
            className={`${baseInput} w-full border p-2`}
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
            {...register(field.key)}
          />
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
          <InventoryTableField
            field={field}
            control={control}
            register={register}
          />
        </div>
      );

    default:
      return null;
  }
}
