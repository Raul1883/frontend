import {
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  type FormInstance,
} from "antd";
import { type Field } from "../../types/CharacterSheet";
import { AutoSizingInput } from "./AutoSizingInput";

export function FieldRenderer({
  field,
  form,
}: {
  field: Field;
  form: FormInstance<any>;
}) {
  switch (field.type) {
    case "number": {
      return (
        <Form.Item label={field.label} name={field.key}>
          <AutoSizingInput itemKey={field.key} form={form} />
        </Form.Item>
      );
    }

    case "minmax":
      return (
        <Form.Item label={field.label} className="mb-0">
          <div className="flex">
            <AutoSizingInput itemKey={`${field.label}_min`} form={form} />
            <AutoSizingInput itemKey={`${field.label}_max`} form={form} />
          </div>
        </Form.Item>
      );

    case "header":
      return <h3 className="font-bold">{field.label}</h3>;

    case "text":
      return (
        <Form.Item label={field.label} name={field.key} className="w-full mb-0">
          <Input className={` w-full`} />
        </Form.Item>
      );

    case "textarea":
      return (
        <Form.Item
          label={field.label}
          name={field.key}
          className="w-full mb-0"
          layout="vertical"
        >
          <Input.TextArea className={` w-full border p-2`} />
        </Form.Item>
      );

    case "select":
      return (
        <Form.Item label={field.label} name={field.key} className="w-full mb-0">
          <Select>
            {field.options?.map((o) => (
              <Select.Option key={o} value={o}>
                {o}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      );

    case "checkbox":
      return (
        <Form.Item name={field.key} valuePropName="checked">
          <Checkbox>{field.label}</Checkbox>
        </Form.Item>
      );

    case "array":
      return <p>array</p>;

    default:
      return null;
  }
}
