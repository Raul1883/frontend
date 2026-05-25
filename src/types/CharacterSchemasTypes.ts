import type { CharacterSchema } from "../pages/characters/types/CharacterSheet";

export interface SystemSchemaPreview {
  id: number;
  name: string;
}
export interface SystemSchemaCreate {
  name: string;
  schema: CharacterSchema;
}

export interface SystemSchemaRead {
  id: number;
  name: string;
  schema: CharacterSchema;
}
