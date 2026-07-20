import type { FormInstance } from "antd";
import type { Layout } from "react-grid-layout";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type BaseField = {
  key: string;
  label: string;
  ui?: "row" | "column" | "compact";
  array_col?: number; // Кол-во колонок, которое занимает элемент в массиве (12 - полная ширина)
};

type HeaderField = BaseField & {
  type: "header";
};

export type NumberField = BaseField & {
  type: "number";
  defaultValue?: number;
};

export type MinMaxField = BaseField & {
  type: "minmax";
  defaultValue?: number;
};

export type TextField = BaseField & {
  type: "text";
  defaultValue?: string;
};

export type TextareaField = BaseField & {
  type: "textarea";
  defaultValue?: string;
};

export type SelectField = BaseField & {
  type: "select";
  options: string[];
  defaultValue?: string;
};

export type CheckboxField = BaseField & {
  type: "checkbox";
  defaultValue?: boolean;
};

export type ArrayField = BaseField & {
  type: "array";
  itemSchema: Field[];
  defaultValue?: any[];
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
  layout?: Layout;
};

export interface SectionProps {
  section: Section;
  form: FormInstance<any>;
}
