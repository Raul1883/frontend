import { Form, Input, Select, Space, Typography } from "antd";
import type { Field } from "../types/CharacterSheet";
import Checkbox from "antd/es/checkbox/Checkbox";
import { InventoryTableField } from "./fields/ArrayField";

export default ({ field, prefix }: { field: Field; prefix: string }) => {
  const fullName = `${prefix}.${field.label}`;

  switch (field.type) {
    case "number": {
      return (
        <Form.Item name={fullName} label={field.label}>
          <Input
            maxLength={3}
            style={{
              padding: 0,
              paddingLeft: 1,
              width: "2em",
              minWidth: "2em",
              textAlign: "center",
            }}
          />
        </Form.Item>
      );
    }

    case "minmax":
      return (
        <Form.Item label={field.label} style={{ marginBottom: 0 }}>
          <Space.Compact style={{ width: "100%" }}>
            <Form.Item name={`${fullName}.min`} noStyle>
              <Input
                maxLength={3}
                style={{
                  padding: 0,
                  paddingLeft: 1,
                  width: "2em",
                  minWidth: "2em",
                  textAlign: "center",
                }}
              />
            </Form.Item>
            <Form.Item name={`${fullName}.max`} noStyle>
              <Input
                maxLength={3}
                style={{
                  padding: 0,
                  paddingLeft: 1,
                  width: "2em",
                  minWidth: "2em",
                  textAlign: "center",
                }}
              />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
      );

    case "header":
      return (
        <Typography.Title level={3} style={{ margin: "10px 0 0 0" }}>
          {field.label}
        </Typography.Title>
      );

    case "text":
      return (
        <div>
          <Form.Item name={fullName} label={field.label}>
            <Input />
          </Form.Item>
        </div>
      );

    case "textarea":
      return (
        <Form.Item name={fullName} label={field.label}>
          <Input.TextArea autoSize />
        </Form.Item>
      );

    case "select":
      return (
        <Form.Item name={fullName} label={field.label}>
          <Select
            options={field.options.map((x) => ({
              value: `${fullName}-${x}`,
              label: x,
            }))}
          />
        </Form.Item>
      );

    case "checkbox":
      return (
        <Form.Item name={fullName} label={field.label} valuePropName="checked">
          <Checkbox />
        </Form.Item>
      );

    case "array":
      return <InventoryTableField field={field} fullName={fullName} />;

    default:
      return null;
  }
};
