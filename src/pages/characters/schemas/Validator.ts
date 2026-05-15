import type {
  ArrayField,
  CharacterSchema,
  Field,
  Section,
} from "../types/CharacterSheet";

export default (schema: CharacterSchema | undefined) => {
  if (!schema) return 
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
  if (duplicates.length > 0) console.error("Дублированные ключи: ", uniqueDuplicates)
};
