import type {
  ArrayField,
  CharacterSchema,
  Field,
  Section,
} from "../types/CharacterSheet";

export default (schema: CharacterSchema | undefined) => {
  if (!schema) return;
  const arr: string[] = [];
  schema.sections.forEach((section: Section) => {
    arr.push(section.title);
    section.fields.forEach((field: Field) => {
      arr.push(field.key);
      if (field.type == "array") {
        (field as ArrayField).itemSchema.forEach((arrField: Field) => {
          arr.push(`${field.key}.${arrField.key}`);
        });
      }
    });
  });
  const duplicates = arr.filter((item, index) => arr.indexOf(item) !== index);
  const uniqueDuplicates = [...new Set(duplicates)];
  if (duplicates.length > 0)
    console.error("Дублированные ключи: ", uniqueDuplicates);
};

interface CharacterUpdate {
  id: number;
  name: string;
  schema: CharacterSchema;
}

function getDuplicateKeys(schema: CharacterSchema): string[] {
  const keys: string[] = [];
  schema.sections.forEach((section) => {
    keys.push(section.title); // заголовки секций тоже участвуют? в вашем коде да
    section.fields.forEach((field) => {
      keys.push(field.key);
      if (field.type === "array") {
        const arrField = field as ArrayField;
        arrField.itemSchema.forEach((subField) => {
          keys.push(`${field.key}.${subField.key}`);
        });
      }
    });
  });
  const duplicates = keys.filter((item, index) => keys.indexOf(item) !== index);
  return [...new Set(duplicates)]; // уникальные дубликаты
}

function isValidCharacterSchema(data: any): data is CharacterSchema {
  if (!data || typeof data !== "object") return false;
  if (!Array.isArray(data.sections)) return false;
  for (const section of data.sections) {
    if (typeof section.title !== "string") return false;
    if (!Array.isArray(section.fields)) return false;
    for (const field of section.fields) {
      if (typeof field.key !== "string") return false;
      if (typeof field.type !== "string") return false;
      if (field.type === "array") {
        const arrField = field as any;
        if (!Array.isArray(arrField.itemSchema)) return false;
        for (const sub of arrField.itemSchema) {
          if (typeof sub.key !== "string") return false;
          // при необходимости добавьте проверку типа sub
        }
      }
    }
  }
  return true;
}

export function validateCharacterUpdate(jsonString: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // 1. Парсинг JSON
  let parsed: any;
  try {
    parsed = JSON.parse(jsonString);
  } catch (e) {
    errors.push("Некорректный JSON");
    return { valid: false, errors };
  }

  // 2. Проверка наличия полей и их типов
  if (typeof parsed.id !== "number") errors.push("id должен быть числом");
  if (typeof parsed.name !== "string") errors.push("name должна быть строкой");
  if (!parsed.schema) errors.push("schema обязательна");

  if (errors.length > 0) return { valid: false, errors };

  // 3. Проверка schema на соответствие CharacterSchema
  if (!isValidCharacterSchema(parsed.schema)) {
    errors.push("schema не соответствует структуре CharacterSchema");
    return { valid: false, errors };
  }

  // 4. Проверка дубликатов ключей
  const duplicates = getDuplicateKeys(parsed.schema);
  if (duplicates.length > 0) {
    errors.push(`Обнаружены дублированные ключи: ${duplicates.join(", ")}`);
    return { valid: false, errors };
  }

  return { valid: true, errors };
}
