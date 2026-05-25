export interface SystemSchemaPreview {
  id: number;
  name: string;
}
export interface SystemSchemaCreate {
  name: string;
  schema: any;
}

export interface SystemSchemaRead {
  id: number;
  name: string;
  schema: any;
}
