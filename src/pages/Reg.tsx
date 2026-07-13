import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Alert,
  Space,
  Layout,
  Flex,
  Popover,
  Tag,
  Modal,
} from "antd";
import axiosInstance from "../API/AxiosInstance";
import { useNavigate } from "react-router-dom";

interface RegistrationData {
  login: string;
  password: string;
  contact_info: string;
  secret_key: string;
}

interface RegistrationResponse {
  message?: string;
  user?: {
    id: number;
    login: string;
    contact_info: string | null;
    role: string;
  };
}

export default () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();

  const onFinish = async (values: RegistrationData) => {
    setLoading(true);
    setError(null);

    if (!values.secret_key) values.secret_key = "";

    try {
      await axiosInstance.post<RegistrationResponse>("/auth/register", values);
      form.resetFields();

      modal.success({
        title: "Успешно!",
        content: `Регистрация успешно завершена`,
        onOk: () => {
          navigate("/login");
        },
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Registration failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Flex justify="center" align="center">
        <Card
          title="Новый аккаунт"
          style={{ width: "40%", marginTop: "50px" }}
          extra={
            <Popover
              content={
                <Space vertical>
                  <Tag>Двухфакторки нет делайте сложный пароль</Tag>
                  <Tag>За восстановлением пароля к одному из админов</Tag>
                </Space>
              }
            >
              Подробнее
            </Popover>
          }
        >
          <Form
            form={form}
            name="registration"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
            size="medium"
          >
            <Form.Item
              label="Логин"
              name="login"
              rules={[{ required: true, message: "Введите логин" }]}
            >
              <Input placeholder="Логин" autoComplete="username" />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: "Введите пароль" }]}
            >
              <Input.Password
                placeholder="Пароль"
                autoComplete="new-password"
              />
            </Form.Item>

            <Form.Item
              label="Контактная информация"
              name="contact_info"
              rules={[{ required: true, message: "Введите контактные данные" }]}
            >
              <Input placeholder="ник в дс, телег, etc" />
            </Form.Item>

            <Form.Item
              label="Мистическая строка"
              name="secret_key"
              tooltip="Если вы не знаете что с ней делать - не трогайте"
            >
              <Input placeholder="Если вы не знаете что с ней делать - не трогайте" />
            </Form.Item>

            {error && (
              <Form.Item>
                <Alert
                  title="Ошибка!"
                  description={error}
                  type="error"
                  showIcon
                />
              </Form.Item>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                {loading ? "Делается..." : "Сделать"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
      {contextHolder}
    </Layout>
  );
};
