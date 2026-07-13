import { Button, Form, Input, Modal, Popconfirm, Select, Space } from "antd";
import type { UserRead } from "./Users";
import { useState } from "react";
import axiosInstance from "../../API/AxiosInstance";
import useApp from "antd/es/app/useApp";
import { updateByBody } from "../../API/Fetcher";

interface UserEditProps {
  data: UserRead;
  mutate: any;
}

interface FormData {
  login: string;
  contact_info: string;
  role: "player" | "master";
  password?: string;
}

export default (props: UserEditProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { message } = useApp();

  const onFinish = (values: FormData): void => {
    if (values.password) {
      setNewPassword(values.password);
    }

    updateUser(values);

    setIsOpen(false);
  };

  const updateUser = async (values: FormData) => {
    try {
      await updateByBody("/users/user/role", {
        id: props.data.id,
        role: values.role,
      });
      await updateByBody("/users/user", {
        id: props.data.id,
        login: values.login,
        contact_info: values.contact_info,
      });
      props.mutate();
      message.success(`Сохранены поля для пользователя ${props.data.login}:`);
    } catch (err) {
      console.error("Ошибка при обновлении:", err);
      message.error("Не удалось обновить пользователя . Попробуйте снова.");
    }
  };

  const setNewPassword = (password: string) => {
    axiosInstance.patch("users/user/pwd", {
      id: props.data.id,
      new_pwd: password,
    });
    message.success(`Сохранен пароль для пользователя ${props.data.login}:`);
  };

  const handleDelete = (userId: number) => {
    axiosInstance.delete(`users/user/${userId}`);
    props.mutate();
  };

  return (
    <Space size="medium">
      <Button onClick={() => setIsOpen(true)}>Редактировать</Button>
      <Popconfirm
        title="Точно?"
        description={`Это действие удалит ${props.data.login} навсегда!`}
        onConfirm={() => {
          handleDelete(props.data.id);
        }}
      >
        <Button type="dashed" danger>
          Удалить
        </Button>
      </Popconfirm>
      <Form
        onFinish={onFinish}
        autoComplete="off"
        initialValues={props.data}
        form={form}
      >
        <Modal
          open={isOpen}
          onCancel={() => {
            setIsOpen(false);
          }}
          onOk={form.submit}
          title={`Редактировать ${props.data.login}`}
        >
          <Form.Item label="Логин" name="login" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Контакты"
            name="contact_info"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Роль" name="role" rules={[{ required: true }]}>
            <Select
              options={[
                { value: "player", label: "player" },
                { value: "master", label: "master" },
              ]}
            />
          </Form.Item>
          <Form.Item label="Пароль" name="password">
            <Input placeholder="Новый пароль" />
          </Form.Item>
        </Modal>
      </Form>
    </Space>
  );
};
