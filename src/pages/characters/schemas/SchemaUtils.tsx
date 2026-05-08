import type { CharacterSchema } from "../systems/types/Form";

export const schema: CharacterSchema = {
  sections: [
    {
      title: "Основное",
      fields: [{ type: "text", key: "name", label: "Имя", defaultValue: "" }],
    },
    {
      title: "Характеристики",
      fields: [
        {
          type: "number",
          key: "hp.current",
          label: "Текущее здоровье",
          defaultValue: 30,
        },
        {
          type: "number",
          key: "hp.max",
          label: "Максимальное здоровье",
          defaultValue: 30,
        },
        { type: "textarea", key: "notes", label: "Заметки", defaultValue: "" },
        {
          type: "checkbox",
          key: "Inspiration",
          label: "Вдохновение",
          defaultValue: false,
        },
        {
          type: "array",
          key: "inventory",
          label: "Инвентарь",
          itemSchema: [
            { type: "text", key: "name", label: "Название", defaultValue: "" },
            {
              type: "number",
              key: "quantity",
              label: "Количество",
              defaultValue: 1,
            },
          ],
        },
      ],
    },
  ],
};

export const witcherSchema: CharacterSchema = {
  sections: [
    {
      title: "Главное",
      fields: [
        { type: "text", key: "name", label: "Имя", defaultValue: "" },
        { type: "text", key: "race", label: "Раса", defaultValue: "" },
        { type: "text", key: "gender", label: "Пол", defaultValue: "" },
        { type: "text", key: "age", label: "Возраст", defaultValue: "" },
        {
          type: "text",
          key: "profession",
          label: "Профессия",
          defaultValue: "",
        },
        { type: "text", key: "rep", label: "репутация", defaultValue: "" },
      ],
    },

    {
      title: "Характеристики",
      layout: "compact",
      fields: [
        { type: "number", key: "INT", label: "ИНТЕЛЛЕКТ" },
        { type: "number", key: "REA", label: "РЕФЛЕКСЫ" },
        { type: "number", key: "DEX", label: "ЛОВКОСТЬ" },
        { type: "number", key: "BODY", label: "ТЕЛО" },
        { type: "number", key: "SPD", label: "СКОРОСТЬ" },
        { type: "number", key: "EMP", label: "ЭМПАТИЯ" },
        { type: "number", key: "WILL", label: "РЕМЕСЛО" },
        { type: "number", key: "LUCK", label: "УДАЧА" },
      ],
    },
    {
      title: "Производные",
      layout: "compact",
      fields: [
        { type: "number", key: "STAB", label: "УСТОЙЧИВОСТЬ" },
        { type: "number", key: "RUN", label: "БЕГ" },
        { type: "number", key: "JUMP", label: "ПРЫЖОК" },
        {
          type: "minmax",
          key: "hp_current",
          maxKey: "hp_max",
          label: "ЗДОРОВЬЕ",
        },
        {
          type: "minmax",
          key: "end_current",
          maxKey: "end_max",
          label: "ВЫНОСЛИВОСТЬ",
        },
        { type: "number", key: "rest", label: "ОТДЫХ" },
      ],
    },
    {
      title: "Навыки",
      fields: [
        {
          type: "header",
          ui: "row",
          key: "int_skills",
          label: "НАВЫКИ ИНТЕЛЛЕКТА",
        },
        { type: "number", ui: "row", key: "int_1", label: "Внимание" },
        {
          type: "number",
          ui: "row",
          key: "int_2",
          label: "Выживание в дикой природе  ",
        },
        { type: "number", ui: "row", key: "int_3", label: "Дедукция" },
        { type: "number", ui: "row", key: "int_4", label: "Монстрология (2)" },
        { type: "number", ui: "row", key: "int_5", label: "Образование" },
        {
          type: "number",
          ui: "row",
          key: "int_6",
          label: "Ориентирование в городе",
        },
        { type: "number", ui: "row", key: "int_7", label: "Передача знаний" },
        { type: "number", ui: "row", key: "int_8", label: "Тактика (2)" },
        { type: "number", ui: "row", key: "int_9", label: "Торговля" },
        { type: "number", ui: "row", key: "int_10", label: "Этикет" },
        {
          type: "number",
          ui: "row",
          key: "int_11",
          label: "Язык: Всеобщий (2)",
        },
        {
          type: "number",
          ui: "row",
          key: "int_12",
          label: "Язык Старшая Речь (2)",
        },
        {
          type: "number",
          ui: "row",
          key: "int_13",
          label: "Язык: Краснолюбов (2)",
        },

        {
          type: "header",
          ui: "row",
          key: "emp_skills",
          label: "НАВЫКИ ЭМПАТИИ",
        },
        { type: "number", ui: "row", key: "emp_1", label: "Азартные игры" },
        { type: "number", ui: "row", key: "emp_2", label: "Внешний вид" },
        { type: "number", ui: "row", key: "emp_3", label: "Выступление" },
        { type: "number", ui: "row", key: "emp_4", label: "Искусство" },
        { type: "number", ui: "row", key: "emp_5", label: "Лидерство" },
        { type: "number", ui: "row", key: "emp_6", label: "Обман" },
        { type: "number", ui: "row", key: "emp_7", label: "Понимание людей" },
        { type: "number", ui: "row", key: "emp_8", label: "Соблазнение" },
        { type: "number", ui: "row", key: "emp_9", label: "Убеждение" },
        { type: "number", ui: "row", key: "emp_10", label: "Харизма" },

        {
          type: "header",
          ui: "row",
          key: "rea_skills",
          label: "НАВЫКИ РЕАКЦИИ",
        },
        { type: "number", ui: "row", key: "rea_1", label: "Ближний бой" },
        { type: "number", ui: "row", key: "rea_2", label: "Борьба" },
        { type: "number", ui: "row", key: "rea_3", label: "Верховная езда " },
        {
          type: "number",
          ui: "row",
          key: "rea_4",
          label: "Владение древковым оружием",
        },
        {
          type: "number",
          ui: "row",
          key: "rea_5",
          label: "Владение лёгкими клинками",
        },
        { type: "number", ui: "row", key: "rea_6", label: "Владение мечом" },
        { type: "number", ui: "row", key: "rea_7", label: "Мореходство" },
        {
          type: "number",
          ui: "row",
          key: "rea_8",
          label: "Уклонение / Изворотливость",
        },

        {
          type: "header",
          ui: "row",
          key: "dex_skills",
          label: "НАВЫКИ ЛОВКОСТИ  ",
        },
        { type: "number", ui: "row", key: "dex_1", label: "Атлетика" },
        { type: "number", ui: "row", key: "dex_2", label: "Ловкость рук" },
        { type: "number", ui: "row", key: "dex_3", label: "Скрытность " },
        {
          type: "number",
          ui: "row",
          key: "dex_4",
          label: "Стрельба из арбалета",
        },
        { type: "number", ui: "row", key: "dex_5", label: "Стрельба из лука" },

        {
          type: "header",
          ui: "row",
          key: "str_skills",
          label: "НАВЫКИ СИЛЫ",
        },
        { type: "number", ui: "row", key: "str_1", label: "Сила" },
        { type: "number", ui: "row", key: "str_2", label: "Стойкость" },

        {
          type: "header",
          ui: "row",
          key: "will_skills",
          label: "НАВЫКИ ВОЛИ",
        },
        { type: "number", ui: "row", key: "will_1", label: "Запугивание" },
        {
          type: "number",
          ui: "row",
          key: "will_2",
          label: "Наведение порчи (2)",
        },
        {
          type: "number",
          ui: "row",
          key: "will_3",
          label: "Проведение ритуалов (2)",
        },
        {
          type: "number",
          ui: "row",
          key: "will_4",
          label: "Сопротивление магии (2)",
        },
        {
          type: "number",
          ui: "row",
          key: "will_5",
          label: "Сопротивление убеждению",
        },
        {
          type: "number",
          ui: "row",
          key: "will_6",
          label: "Сотворение заклинаний (2)",
        },
        { type: "number", ui: "row", key: "will_7", label: "Храбрость" },
        {
          type: "header",
          ui: "row",
          key: "crf_skills",
          label: "НАВЫКИ РЕМЕСЛА",
        },
        { type: "number", ui: "row", key: "crf_1", label: "Алхимия (2)" },
        { type: "number", ui: "row", key: "crf_2", label: "Взлом замков" },
        {
          type: "number",
          ui: "row",
          key: "crf_3",
          label: "Знание Ловушек (2) ",
        },
        { type: "number", ui: "row", key: "crf_4", label: "Изготовление (2)" },
        { type: "number", ui: "row", key: "crf_5", label: "Маскировка" },
        { type: "number", ui: "row", key: "crf_6", label: "Первая помощь" },
        { type: "number", ui: "row", key: "crf_7", label: "Подделывание" },
      ],
    },
  ],
};

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

function setDeep(obj: any, path: string, value: any) {
  const keys = path.split(".");
  let cur = obj;

  keys.forEach((k, i) => {
    if (i === keys.length - 1) {
      cur[k] = value;
    } else {
      cur[k] = cur[k] ?? {};
      cur = cur[k];
    }
  });
}

export function buildDefaultValues(schema: CharacterSchema) {
  const result: any = {};
  schema.sections.forEach((section) => {
    section.fields.forEach((f) => {
      if ("defaultValue" in f && f.defaultValue !== undefined) {
        setDeep(result, f.key, f.defaultValue);
      }
    });
  });
  return result;
}
