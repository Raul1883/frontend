import type { Control, UseFormRegister } from "react-hook-form";
import { type Field } from "../types/CharacterSheet";

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
          <p>NOT IMPLEMENTED</p>
          {/* <ArrayField field={field} control={control} register={register} /> */}
        </div>
      );

    default:
      return null;
  }
}

// export function ArrayField({
//   field,
//   control,
//   register,
// }: {
//   field: any;
//   control: Control<any>;
//   register: UseFormRegister<any>;
// }) {
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: field.key,
//   });

//   return (
//     <div className="space-y-3 text-amber-50">
//       <h4>{field.label}</h4>

//       {fields.map((item, index) => (
//         <div key={item.id} className="rounded-xl border border-zinc-800 p-3">
//           {field.itemSchema.map((subField: any) => {
//             const fullKey = `${field.key}.${index}.${subField.key}`;

//             return (
//               <div
//                 key={fullKey}
//                 className="grid grid-cols-1 gap-3 md:grid-cols-2"
//               >
//                 <label>{subField.label}</label>
//                 <input {...register(fullKey)} />
//               </div>
//             );
//           })}

//           <button
//             type="button"
//             onClick={() => remove(index)}
//             className="mt-2 text-xs text-red-400 hover:text-red-300"
//           >
//             Удалить
//           </button>
//         </div>
//       ))}

//       <button
//         type="button"
//         className="text-sm text-indigo-400 hover:text-indigo-300"
//         onClick={() => append({})}
//       >
//         Добавить
//       </button>
//     </div>
//   );
// }
