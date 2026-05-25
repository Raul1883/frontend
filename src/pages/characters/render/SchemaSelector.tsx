import type { SystemSchemaRead } from "../../../types/CharacterSchemasTypes";
import type { CharacterSchema } from "../types/CharacterSheet";
import axiosInstance from "../../../API/AxiosInstance";

export async function getSchema(
  systemName: string,
): Promise<CharacterSchema | null> {
  if (!systemName) return null;

  const res = await axiosInstance.get<SystemSchemaRead>(
    `systems-schemas/by_name/${systemName}`,
  );
  return res.data.schema ?? null;
}
