import useSWR from "swr";
import type {
  SystemSchemaPreview,
  SystemSchemaRead,
} from "../../../types/CharacterSchemasTypes";
import { witcherSchema } from "../schemas/Witcher";
import type { CharacterSchema } from "../types/CharacterSheet";
import { getById } from "../../../API/Fetcher";
import axiosInstance from "../../../API/AxiosInstance";

const schemas: Record<string, CharacterSchema> = {
  Witcher: witcherSchema,
};

export async function getSchema(
  systemName: string,
): Promise<CharacterSchema | null> {
  console.log(systemName);
  if (!systemName) return null;

  const res = await axiosInstance.get<SystemSchemaRead>(
    `systems-schemas/by_name/${systemName}`,
  );
  console.log(res.data.schema);
  return res.data.schema ?? null;
}
