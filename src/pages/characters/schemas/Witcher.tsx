import type { CharacterSchema } from "../types/CharacterSheet";

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
        { type: "minmax", key: "INT", label: "ИНТЕЛЛЕКТ" },
        { type: "minmax", key: "REA", label: "РЕФЛЕКСЫ" },
        { type: "minmax", key: "DEX", label: "ЛОВКОСТЬ" },
        { type: "minmax", key: "BODY", label: "ТЕЛО" },
        { type: "minmax", key: "SPD", label: "СКОРОСТЬ" },
        { type: "minmax", key: "EMP", label: "ЭМПАТИЯ" },
        { type: "minmax", key: "WILL", label: "ВОЛЯ" },
        { type: "minmax", key: "CRAFT", label: "РЕМЕСЛО" },
        { type: "minmax", key: "LUCK", label: "УДАЧА" },
      ],
    },
    {
      title: "Производные",
      layout: "compact",
      fields: [
        { type: "minmax", key: "STAB", label: "УСТОЙЧИВОСТЬ" },
        { type: "minmax", key: "RUN", label: "БЕГ" },
        { type: "minmax", key: "JUMP", label: "ПРЫЖОК" },
        {
          type: "minmax",
          key: "hp_current",
          label: "ЗДОРОВЬЕ",
        },
        {
          type: "minmax",
          key: "end_current",
          label: "ВЫНОСЛИВОСТЬ",
        },
        { type: "minmax", key: "rest", label: "ОТДЫХ" },
      ],
    },
    {
      title: "Навыки",
      columns: 4,
      fields: [
        {
          type: "header",
          ui: "row",
          key: "int_skills",
          label: "НАВЫКИ ИНТЕЛЛЕКТА",
        },
        { type: "minmax", ui: "row", key: "int_1", label: "Внимание" },
        {
          type: "minmax",
          ui: "row",
          key: "int_2",
          label: "Выживание в дикой природе  ",
        },
        { type: "minmax", ui: "row", key: "int_3", label: "Дедукция" },
        { type: "minmax", ui: "row", key: "int_4", label: "Монстрология (2)" },
        { type: "minmax", ui: "row", key: "int_5", label: "Образование" },
        {
          type: "minmax",
          ui: "row",
          key: "int_6",
          label: "Ориентирование в городе",
        },
        { type: "minmax", ui: "row", key: "int_7", label: "Передача знаний" },
        { type: "minmax", ui: "row", key: "int_8", label: "Тактика (2)" },
        { type: "minmax", ui: "row", key: "int_9", label: "Торговля" },
        { type: "minmax", ui: "row", key: "int_10", label: "Этикет" },
        {
          type: "minmax",
          ui: "row",
          key: "int_11",
          label: "Язык: Всеобщий (2)",
        },
        {
          type: "minmax",
          ui: "row",
          key: "int_12",
          label: "Язык Старшая Речь (2)",
        },
        {
          type: "minmax",
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
        { type: "minmax", ui: "row", key: "emp_1", label: "Азартные игры" },
        { type: "minmax", ui: "row", key: "emp_2", label: "Внешний вид" },
        { type: "minmax", ui: "row", key: "emp_3", label: "Выступление" },
        { type: "minmax", ui: "row", key: "emp_4", label: "Искусство" },
        { type: "minmax", ui: "row", key: "emp_5", label: "Лидерство" },
        { type: "minmax", ui: "row", key: "emp_6", label: "Обман" },
        { type: "minmax", ui: "row", key: "emp_7", label: "Понимание людей" },
        { type: "minmax", ui: "row", key: "emp_8", label: "Соблазнение" },
        { type: "minmax", ui: "row", key: "emp_9", label: "Убеждение" },
        { type: "minmax", ui: "row", key: "emp_10", label: "Харизма" },

        {
          type: "header",
          ui: "row",
          key: "rea_skills",
          label: "НАВЫКИ РЕАКЦИИ",
        },
        { type: "minmax", ui: "row", key: "rea_1", label: "Ближний бой" },
        { type: "minmax", ui: "row", key: "rea_2", label: "Борьба" },
        { type: "minmax", ui: "row", key: "rea_3", label: "Верховная езда " },
        {
          type: "minmax",
          ui: "row",
          key: "rea_4",
          label: "Владение древковым оружием",
        },
        {
          type: "minmax",
          ui: "row",
          key: "rea_5",
          label: "Владение лёгкими клинками",
        },
        { type: "minmax", ui: "row", key: "rea_6", label: "Владение мечом" },
        { type: "minmax", ui: "row", key: "rea_7", label: "Мореходство" },
        {
          type: "minmax",
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
        { type: "minmax", ui: "row", key: "dex_1", label: "Атлетика" },
        { type: "minmax", ui: "row", key: "dex_2", label: "Ловкость рук" },
        { type: "minmax", ui: "row", key: "dex_3", label: "Скрытность " },
        {
          type: "minmax",
          ui: "row",
          key: "dex_4",
          label: "Стрельба из арбалета",
        },
        { type: "minmax", ui: "row", key: "dex_5", label: "Стрельба из лука" },

        {
          type: "header",
          ui: "row",
          key: "str_skills",
          label: "НАВЫКИ СИЛЫ",
        },
        { type: "minmax", ui: "row", key: "str_1", label: "Сила" },
        { type: "minmax", ui: "row", key: "str_2", label: "Стойкость" },

        {
          type: "header",
          ui: "row",
          key: "will_skills",
          label: "НАВЫКИ ВОЛИ",
        },
        { type: "minmax", ui: "row", key: "will_1", label: "Запугивание" },
        {
          type: "minmax",
          ui: "row",
          key: "will_2",
          label: "Наведение порчи (2)",
        },
        {
          type: "minmax",
          ui: "row",
          key: "will_3",
          label: "Проведение ритуалов (2)",
        },
        {
          type: "minmax",
          ui: "row",
          key: "will_4",
          label: "Сопротивление магии (2)",
        },
        {
          type: "minmax",
          ui: "row",
          key: "will_5",
          label: "Сопротивление убеждению",
        },
        {
          type: "minmax",
          ui: "row",
          key: "will_6",
          label: "Сотворение заклинаний (2)",
        },
        { type: "minmax", ui: "row", key: "will_7", label: "Храбрость" },
        {
          type: "header",
          ui: "row",
          key: "crf_skills",
          label: "НАВЫКИ РЕМЕСЛА",
        },
        { type: "minmax", ui: "row", key: "crf_1", label: "Алхимия (2)" },
        { type: "minmax", ui: "row", key: "crf_2", label: "Взлом замков" },
        {
          type: "minmax",
          ui: "row",
          key: "crf_3",
          label: "Знание Ловушек (2) ",
        },
        { type: "minmax", ui: "row", key: "crf_4", label: "Изготовление (2)" },
        { type: "minmax", ui: "row", key: "crf_5", label: "Маскировка" },
        { type: "minmax", ui: "row", key: "crf_6", label: "Первая помощь" },
        { type: "minmax", ui: "row", key: "crf_7", label: "Подделывание" },
      ],
    },
    {
      title: "ЧЕРТЫ, БОНУСЫ И ШТРАФЫ",
      fields: [{ type: "textarea", key: "bonus", label: "" }],
    },
    {
      title: "Снаряжение",
      fields: [
        {
          type: "array",
          key: "inventory",
          label: "",
          itemSchema: [
            { array_col: 8, type: "text", key: "name", label: "Название" },
            { array_col: 2, type: "number", key: "count", label: "кол-во" },
            { array_col: 2, type: "number", key: "weight", label: "вес" },
            { array_col: 12, type: "text", key: "notes", label: "примечание" },
          ],
        },
      ],
    },
    {
      title: "Оружие",
      fields: [
        {
          type: "array",
          key: "weapon",
          label: "",
          itemSchema: [
            { array_col: 5, type: "text", key: "name", label: "Название" },
            { array_col: 1, type: "number", key: "count", label: "Т" },
            { array_col: 3, type: "text", key: "weight", label: "Урон и тип" },
            { array_col: 1, type: "number", key: "notes", label: "Н" },
            { array_col: 2, type: "text", key: "range", label: "Дистанция" },
            { array_col: 2, type: "text", key: "hands", label: "Хват" },
            { array_col: 5, type: "text", key: "effect", label: "Эффект" },
            { array_col: 4, type: "text", key: "stealth", label: "Скрытность" },
            { array_col: 1, type: "text", key: "buffs", label: "Усиление" },
          ],
        },
      ],
    },
    {
      title: "Щит",
      fields: [
        {
          type: "array",
          key: "shield",
          label: "",
          itemSchema: [
            { array_col: 12, type: "text", key: "name", label: "Название" },
            { array_col: 3, type: "number", key: "durability", label: "Н" },
            { array_col: 9, type: "text", key: "damage", label: "Урон" },
          ],
        },
      ],
    },
    {
      title: "Монеты",
      fields: [
        {
          type: "number",
          key: "croni",
          label: "Кроны",
        },
        { type: "number", key: "oreni", label: "Орены" },
        { type: "number", key: "floreni", label: "Флорены" },
        { type: "number", key: "dukati", label: "Дукаты" },
        { type: "number", key: "bizanti", label: "Бизанты" },
        { type: "number", key: "lintari", label: "Линтары" },
        {
          type: "array",
          key: "zennoe",
          label: "Ценности",
          itemSchema: [
            { array_col: 14, type: "text", key: "name", label: "Название" },
            { array_col: 4, type: "number", key: "count", label: "Цена" },
            {
              array_col: 6,
              type: "select",
              key: "selectValute",
              label: "Валюта",
              options: ["Орены", "Флорены", "Дукаты", "Бизанты", "Линтары"],
            },
          ],
        },
      ],
    },
    {
      title: "Жизненный путь",
      fields: [
        {
          type: "array",
          key: "lifepath",
          label: "",
          itemSchema: [
            { array_col: 4, type: "number", key: "year", label: "x10 лет" },
            { array_col: 20, type: "text", key: "event", label: "Событие" },
          ],
        },
      ],
    },
    {
      title: "Доспехи",
      fields: [
        {
          type: "array",
          key: "armor",
          label: "",
          itemSchema: [
            { array_col: 10, type: "text", key: "area", label: "Область" },
            { array_col: 4, type: "number", key: "protection", label: "ПБ" },
            { array_col: 6, type: "text", key: "effect", label: "Эффект" },
            { array_col: 4, type: "text", key: "sd", label: "СД" },
          ],
        },
      ],
    },

    {
      title: "Личный стиль",
      fields: [
        { type: "text", label: "Одежда", key: "personality_core_1" },
        { type: "text", label: "Характер вид", key: "personality_core_2" },
        { type: "text", label: "Причёска", key: "personality_core_3" },
        { type: "text", label: "Украшения", key: "personality_core_4" },
        { type: "text", label: "Кого ценит", key: "personality_core_5" },
        { type: "text", label: "Что ценит", key: "personality_core_6" },
        {
          type: "text",
          label: "Отношение к окружающим",
          key: "personality_core_7",
        },
      ],
    },
    {
      title: "Детство",
      fields: [{ type: "textarea", label: "", key: "childhood" }],
    },
    {
      title: "Заметки",
      fields: [{ type: "textarea", label: "", key: "notes" }],
    },
    {
      title: "Репутация и слава",
      fields: [{ type: "textarea", label: "", key: "reputations" }],
    },
  ],
};
