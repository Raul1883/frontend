import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { SectionProps } from "../../../types/CharacterSheet";

export default (props: SectionProps) => {
  const { getValues, setValue } = props.methods;
  let values = getValues();

  return (
    <div>
      <div className="flex">
        <p>Здоровье: </p>
        <p>{values.hp_current ?? 0}</p>
      </div>
      <button
        className="hover:text-red-700"
        type="button"
        onClick={() => {
          setValue("hp_current", values.hp_current - 1);
          values = getValues();
        }}
      >
        Понизить здоровье
      </button>
    </div>
  );
};
