import React from "react";
import { Form, Modal, Select, Input, Alert, App } from "antd";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import { getAll } from "../../API/Fetcher";
import { createApplications } from "../../API/Applications";
import type { CharacterGet } from "../../types/Character";

interface ApplySessionModalProps {
  open: boolean;
  sessionId: number;
  onClose: () => void;
  onSuccess?: () => void;
}

interface FormValues {
  characterId: number;
  comment?: string;
}

export const ApplySessionModal: React.FC<ApplySessionModalProps> = ({
  open,
  sessionId,
  onClose,
  onSuccess,
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm<FormValues>();
  const { message } = App.useApp();

  const {
    data: characterData,
    isLoading: isCharacterLoading,
    error,
  } = useSWR<CharacterGet[]>(open ? "/characters" : null, getAll);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (characterData?.length === 0) {
        navigate("/characters");
        return;
      }

      await createApplications({
        session_id: sessionId,
        character_id: values.characterId,
        comment: values.comment || "",
      });

      message.success("Заявка успешно создана");
      form.resetFields();
      onSuccess?.();
      onClose();
    } catch (err) {
      if (!(err as any).errorFields) {
        message.error("Ошибка при отправке заявки. Попробуйте позже.");
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  if (error && open) {
    return (
      <Alert
        type="error"
        title="Ошибка"
        description="Ошибка загрузки данных. Попробуйте позже."
        showIcon
      />
    );
  }

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      onOk={handleSubmit}
      closeIcon={false}
      title="Новая заявка"
    >
      {characterData?.length === 0 ? (
        <Alert
          type="info"
          title="Упс!"
          description="Кажется, у вас нет ни одного персонажа! Создайте нового и снова возвращайтесь сюда!"
        />
      ) : (
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item<FormValues>
            label="Выберите персонажа"
            name="characterId"
            rules={[{ required: true, message: "Выберите персонажа" }]}
          >
            <Select
              allowClear
              disabled={isCharacterLoading}
              loading={isCharacterLoading}
              placeholder="Персонаж"
              options={characterData?.map((char) => ({
                value: char.id,
                label: char.name,
              }))}
            />
          </Form.Item>

          <Form.Item<FormValues>
            label="Комментарий (необязательно)"
            name="comment"
          >
            <Input.TextArea autoSize allowClear placeholder="Есть идеи?" />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
