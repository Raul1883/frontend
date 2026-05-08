type BaseField = {
  key: string;
  label: string;
  ui?: "row" | "column" | "compact";
};

type HeaderField = BaseField & {
  type: "header";
};

type NumberField = BaseField & {
  type: "number";
  defaultValue?: number;
};

type MinMaxField = BaseField & {
  maxKey: string;
  type: "minmax";
  defaultValue?: number;
};

type TextField = BaseField & {
  type: "text";
  defaultValue?: string;
};

type TextareaField = BaseField & {
  type: "textarea";
  defaultValue?: string;
};

type SelectField = BaseField & {
  type: "select";
  options: string[];
  defaultValue?: string;
};

type CheckboxField = BaseField & {
  type: "checkbox";
  defaultValue?: boolean;
};

type ArrayField = BaseField & {
  type: "array";
  itemSchema: Field[];
  defaultValue?: any[]; // или unknown[], если хочешь строже
};

export type Field =
  | NumberField
  | TextField
  | TextareaField
  | SelectField
  | CheckboxField
  | ArrayField
  | MinMaxField
  | HeaderField;

export type Section = {
  title: string;
  fields: Field[];
  layout?: "unbound" | "compact" | "list";
  columns?: number;
};

export type CharacterSchema = {
  sections: Section[];
};

