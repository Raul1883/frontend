import { useFieldArray, type UseFormRegister } from "react-hook-form";
import type { ArrayField, Field, SelectField } from "../types/CharacterSheet";

export type ArrayFieldProps = {
  field: ArrayField;
  control: any;
  register: any;
};

export function InventoryTableField({
  field,
  control,
  register,
}: ArrayFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: field.key,
  });
  const colsCount = 24;

  return (
    <div className="overflow-hidden">
      <h3 className="text-center pl-4 border border-b-0 ">{field.label}</h3>

      <table className="border w-full text-sm table-fixed">
        <thead className="border-b whitespace-normal break-words">
          <tr>
            {field.itemSchema.map((column: any) => {
              const colSpan = column.array_col ?? 1;

              return (
                <th
                  key={column.key}
                  className=""
                  style={{
                    width: `${(colSpan / colsCount) * 100}%`,
                  }}
                >
                  <span className="text-wrap">{column.label}</span>
                </th>
              );
            })}

            <th className="w-8" />
          </tr>
        </thead>

        <tbody>
          {fields.map((item, index) => (
            <tr key={item.id} className="border-b">
              {field.itemSchema.map((column: any) => {
                const fieldName = `${field.key}.${index}.${column.key
                  .split(".")
                  .pop()}`;

                const colSpan = column.array_col ?? 1;

                return (
                  <td
                    key={column.key}
                    className="border"
                    style={{
                      width: `${(colSpan / colsCount) * 100}%`,
                    }}
                  >
                    {getFieldByType(column.type, column, fieldName, register)}
                  </td>
                );
              })}

              <td className="h-full ">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="
                  flex items-center justify-center h-full w-full
                rounded-md 
                text-red-400 hover:text-red-800
              "
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() =>
            append({
              name: "",
            })
          }
          className=" px-4 border border-t-0 rounded-b-md hover:bg-gray-100 "
        >
          Добавить строку
        </button>
      </div>
    </div>
  );
}

const getFieldByType = (
  type: string,
  field: Field,
  fieldName: string,
  register: UseFormRegister<any>,
) => {
  if (type === "select") {
    const select: SelectField = field as SelectField;
    return (
      <select
        className="outline-none w-full text-center"
        {...register(field.key)}
      >
        {select.options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }

  return (
    <textarea
      rows={1}
      onInput={(e) => {
        e.currentTarget.style.height = "auto";
        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
      }}
      {...register(fieldName)}
      className="block text-center w-full py-1 outline-none focus:ring-1 resize-none overflow-hidden "
    />
  );
};
