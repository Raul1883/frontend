import React from "react";
import type { Abilities, Skills } from "../../types/TypesDND5";
import FormInput from "../form/FormInput";

export default () => {
  const abilityList: (keyof Abilities)[] = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",
  ];

  const skillList: (keyof Skills)[] = [
    "acrobatics",
    "animalHandling",
    "arcana",
    "athletics",
    "deception",
    "history",
    "insight",
    "intimidation",
    "investigation",
    "medicine",
    "nature",
    "perception",
    "performance",
    "persuasion",
    "religion",
    "sleightOfHand",
    "stealth",
    "survival",
  ];

  const formatLabel = (key: string): string => {
    const replacements: Record<string, string> = {
      strength: "Сила",
      dexterity: "Ловкость",
      constitution: "Телосложение",
      intelligence: "Интеллект",
      wisdom: "Мудрость",
      charisma: "Харизма",
      acrobatics: "Акробатика",
      animalHandling: "Обращение с животными",
      arcana: "Магия",
      athletics: "Атлетика",
      deception: "Обман",
      history: "История",
      insight: "Проницательность",
      intimidation: "Запугивание",
      investigation: "Расследование",
      medicine: "Медицина",
      nature: "Природа",
      perception: "Восприятие",
      performance: "Выступление",
      persuasion: "Убеждение",
      religion: "Религия",
      sleightOfHand: "Ловкость рук",
      stealth: "Скрытность",
      survival: "Выживание",
    };
    if (replacements[key]) return replacements[key];
    return key;
  };

  return (
    <div className="border-2 p-4 gap-y-4 flex flex-col">
      <div>
        <h3 className="text-lg font-bold mb-2">Характеристики</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {abilityList.map((ability) => (
            <FormInput
              key={ability}
              name={`abilities.${ability}`}
              label={formatLabel(ability)}
              type="number"
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-2">Спасброски</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {abilityList.map((ability) => (
            <FormInput
              key={ability}
              name={`savingThrows.${ability}`}
              label={formatLabel(ability)}
              type="number"
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-2">Навыки</h3>
        <div className="grid grid-cols-2 gap-2">
          {skillList.map((skill) => (
            <FormInput
              key={skill}
              name={`skills.${skill}`}
              label={formatLabel(skill)}
              type="number"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
