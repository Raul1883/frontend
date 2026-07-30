import type {
  ListSchema,
  Section,
} from "../pages/characters/types/CharacterSheet";

export interface ListSchemaPreview {
  id: string;
  name: string;
}
export interface ListSchemaCreate {
  name: string;
  schema: ListSchema;
}

export interface ListShemaSections {
  sections: Section[];
}

export interface ListSchemaRead {
  id: string;
  name: string;
  schema: ListSchema;
}
