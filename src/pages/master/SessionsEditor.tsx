import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { getById, updateByPath, create } from "../../API/Fetcher";
import type { SessionGet, SessionPost } from "../../types/Session";
import AttributeEditor from "../../components/AttributeEditor";
import MainLayout from "../../components/MainLayout";
import { App, Button, Card, Form, Input } from "antd";
import NavButton from "../../components/NavButton";

interface SessionFormProps {
  mode: "create" | "edit";
}

export default ({ mode }: SessionFormProps) => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = mode === "edit";
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const { data, error, isLoading, mutate } = useSWR<SessionGet>(
    isEditMode && id ? ["/sessions", id] : null,
    ([url, targetId]) => getById<SessionGet>(url as string, Number(targetId)),
  );

  useEffect(() => {
    if (isEditMode && data) {
      form.setFieldsValue({
        title: data.title,
        description: data.description,
        system_id: data.system.id,
        genre_id: data.genre.id,
        company_id: data.company?.id,
        scheduled_at: data.scheduled_at,
      });
    }
  }, [isEditMode, data, form]);

  // Хэндлер срабатывает ТОЛЬКО если форма прошла всю встроенную валидацию rules={...}
  const onFinish = async (values: SessionPost) => {
    try {
      if (isEditMode && id) {
        const response = await updateByPath<SessionPost, SessionGet>(
          "/sessions",
          Number(id),
          values,
        );
        mutate(response);

        message.success("Успешно!");
      } else {
        await create<SessionPost, SessionGet>("/sessions", values);
        message.success("Успешно!");
      }
      navigate("/manage/sessions");
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      message.error("Ошибка при сохранении данных");
    }
  };

  if (isEditMode) {
    if (error)
      return <div className="p-4 text-red-500">Ошибка загрузки сессии</div>;
    if (isLoading) return <div className="p-4">Загрузка...</div>;
    if (!data) return <div className="p-4">Сессия не найдена</div>;
  }

  return (
    <MainLayout>
      {/* Привязываем инстанс формы и вешаем onFinish */}
      <Form
        form={form}
        name="session"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ system_id: undefined, genre_id: undefined }}
      >
        <Card
          title={isEditMode ? `Редактор сессии #${id}` : "Создание сессии"}
          actions={[
            // htmlType="submit" заставит форму валидироваться и триггернуть onFinish
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>,
            <NavButton type="dashed" to={-1}>
              Отмена
            </NavButton>,
          ]}
        >
          <Form.Item<SessionPost>
            label="Название"
            name="title"
            rules={[{ required: true, message: "Название обязательно" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<SessionPost> label="Описание" name="description">
            <Input.TextArea autoSize />
          </Form.Item>

          <Form.Item<SessionPost>
            label="Время"
            name="scheduled_at"
            rules={[{ required: true, message: "Дата обязательна" }]}
          >
            <Input.TextArea autoSize />
          </Form.Item>

          {/* Теперь Form.Item сам передаст value и onChange внутрь AttributeEditor */}
          <Form.Item<SessionPost>
            label="Жанр"
            name="genre_id"
            rules={[{ required: true, message: "Выберите жанр" }]}
          >
            <AttributeEditor type="genre" />
          </Form.Item>

          <Form.Item<SessionPost>
            label="Система"
            name="system_id"
            rules={[{ required: true, message: "Выберите систему" }]}
          >
            <AttributeEditor type="system" />
          </Form.Item>
        </Card>
      </Form>
    </MainLayout>
  );
};
