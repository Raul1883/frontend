import type { CharacterSchema } from "../types/CharacterSheet";

export const dndSchema: CharacterSchema = {
  sections: [
    {
      title: "Основное",
      fields: [
        { type: "text", key: "name", label: "Имя персонажа" },
        { type: "text", key: "class", label: "Класс" },
        {
          type: "number",
          key: "level",
          label: "Уровень",
          defaultValue: 1,
        },
        {
          type: "number",
          key: "proficiencyBonus",
          label: "Бонус мастерства",
          defaultValue: 2,
        },
        { type: "text", key: "background", label: "Предыстория" },
      ],
    },

    {
      title: "Характеристики",
      layout: "compact",
      fields: [
        {
          type: "number",
          key: "abilities.str",
          label: "Сила",
          defaultValue: 10,
        },
        {
          type: "number",
          key: "abilities.dex",
          label: "Ловкость",
          defaultValue: 10,
        },
        {
          type: "number",
          key: "abilities.con",
          label: "Телосложение",
          defaultValue: 10,
        },
        {
          type: "number",
          key: "abilities.int",
          label: "Интеллект",
          defaultValue: 10,
        },
        {
          type: "number",
          key: "abilities.wis",
          label: "Мудрость",
          defaultValue: 10,
        },
        {
          type: "number",
          key: "abilities.cha",
          label: "Харизма",
          defaultValue: 10,
        },
      ],
    },

    {
      title: "Спасброски",
      fields: [
        { type: "checkbox", key: "saves.str", label: "Сила" },
        { type: "checkbox", key: "saves.dex", label: "Ловкость" },
        { type: "checkbox", key: "saves.con", label: "Телосложение" },
        { type: "checkbox", key: "saves.int", label: "Интеллект" },
        { type: "checkbox", key: "saves.wis", label: "Мудрость" },
        { type: "checkbox", key: "saves.cha", label: "Харизма" },
      ],
    },

    {
      title: "Навыки (упрощённо)",
      fields: [
        { type: "checkbox", key: "skills.acrobatics", label: "Акробатика" },
        { type: "checkbox", key: "skills.arcana", label: "Магия" },
        { type: "checkbox", key: "skills.athletics", label: "Атлетика" },
        { type: "checkbox", key: "skills.history", label: "История" },
        { type: "checkbox", key: "skills.perception", label: "Восприятие" },
        { type: "checkbox", key: "skills.stealth", label: "Скрытность" },
      ],
    },

    {
      title: "Бой",
      fields: [
        {
          type: "number",
          key: "combat.ac",
          label: "КД (Armor Class)",
          defaultValue: 10,
        },
        {
          type: "number",
          key: "combat.initiative",
          label: "Инициатива",
          defaultValue: 0,
        },
        {
          type: "number",
          key: "combat.speed",
          label: "Скорость",
          defaultValue: 30,
        },

        {
          type: "number",
          key: "hp.current",
          label: "HP текущее",
          defaultValue: 10,
        },
        {
          type: "number",
          key: "hp.max",
          label: "HP максимум",
          defaultValue: 10,
        },
        {
          type: "number",
          key: "hp.temp",
          label: "Временные HP",
          defaultValue: 0,
        },

        {
          type: "textarea",
          key: "combat.attacks",
          label: "Атаки и заклинания",
        },
      ],
    },

    {
      title: "Прочее",
      fields: [
        { type: "textarea", key: "features", label: "Особенности и умения" },
        { type: "textarea", key: "equipment", label: "Снаряжение (описание)" },
      ],
    },

    {
      title: "Инвентарь",
      fields: [
        {
          type: "array",
          key: "inventory",
          label: "Предметы",
          itemSchema: [
            { type: "text", key: "name", label: "Название" },
            { type: "number", key: "qty", label: "Кол-во" },
            { type: "number", key: "weight", label: "Вес" },
          ],
        },
      ],
    },
  ],
};
