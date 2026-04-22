import { useFormContext } from "react-hook-form";
import { diceOptions } from "../../types/Dice";
import { FormCheckbox } from "../form/FormCheckBox";
import FormInput from "../form/FormInput";
import { FormSelect } from "../form/FormSelect";

const getPB = (level: number) => {
  if (level <= 4) return 2;
  if (level <= 8) return 3;
  if (level <= 12) return 4;
  if (level <= 16) return 5;
  return 6;
};

export default () => {
  const { watch } = useFormContext();
  const currentLevel = watch("class.level");


  return (
    <div className="border-2 p-2 gap-y-2 h-fit">
      <div className="flex">
        <FormInput name="armorClass" label="Класс доспеха" type="number" />
        <FormInput name="initiative" label="Инициатива" type="number" />
        <FormInput name="speed" label="Скорость" type="number" />
      </div>
      <div className="flex mt-2">
        <FormInput name="hitPoints.maximum" label="Текущие ПЗ" type="number" />
        <FormInput name="hitPoints.current" label="Макс. ПЗ" type="number" />
        <FormInput
          name="hitPoints.temporary"
          label="Временные ПЗ"
          type="number"
        />
      </div>

      <div className="flex mt-2">
        <FormInput name="hitDice.current" label="Текущие" type="number" />
        <FormInput name="hitDice.total" label="Макс" type="number" />

        <FormSelect
          name="hitDice.diceType"
          label="Кость ПЗ"
          options={diceOptions}
          className="w-10"
        />
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="mt-2">Спасброски от смерти</p>
          <FormInput
            name="deathSaves.successes"
            label="Успешные"
            type="number"
          />
          <FormInput
            name="deathSaves.failures"
            label="Проваленные"
            type="number"
          />
        </div>
        <div className="">
          <p>Бонус мастерства: +{getPB(currentLevel)}</p>
          <FormCheckbox name="inspiration" label="Вдохновение" />
        </div>
      </div>
    </div>
  );
};
