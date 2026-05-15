import { witcherSchema } from "../schemas/Witcher";
import type { CharacterSchema } from "../types/CharacterSheet";

const schemas: Record<string, CharacterSchema> = {
  Witcher: witcherSchema,
};

export function getSchema(systemName?: string): CharacterSchema | null {
  if (!systemName) return null;

  return schemas[systemName] ?? null;
}
