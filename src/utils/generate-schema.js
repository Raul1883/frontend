import { createGenerator } from "ts-json-schema-generator";
import fs from "fs";

const config = {
  path: "src/types/CharacterSchemasTypes.ts",
  tsconfig: "tsconfig.app.json",
  type: "SystemSchemaRead",
};

const schema = createGenerator(config).createSchema(config.type);

fs.writeFileSync(
  "src/pages/characters/schemas/system-schema.json",
  JSON.stringify(schema, null, 2),
);
