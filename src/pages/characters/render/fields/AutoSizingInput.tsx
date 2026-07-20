import { Form, Input, type FormInstance } from "antd";

// Внутри FieldRenderer или отдельного компонента:
export function AutoSizingInput({
  itemKey,
  form,
}: {
  itemKey: string;
  form: FormInstance<any>;
}) {
  const inputValue = Form.useWatch(itemKey, form) || "";

  // логика расчета ширины остается прежней
  const getInputWidth = () => {
    const minChars = 2;
    const maxChars = 7;
    const charCount = Math.max(minChars, Math.min(inputValue.length, maxChars));
    return `${charCount + 1}ch`;
  };

  return (
    <div>
      <Form.Item name={itemKey} noStyle>
        <Input
          maxLength={7}
          style={{
            width: getInputWidth(),
            transition: "width 0.2s ease",
          }}
          type="number"
        />
      </Form.Item>
    </div>
  );
}
