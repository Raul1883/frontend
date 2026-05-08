import type { CharacterSchema } from "../types/CharacterSheet";

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
