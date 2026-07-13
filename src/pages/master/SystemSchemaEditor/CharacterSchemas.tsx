import useSWR from "swr";
import { create, deleteById, getAll } from "../../../API/Fetcher";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type {
  SystemSchemaCreate,
  SystemSchemaPreview,
  SystemSchemaRead,
} from "../../../types/CharacterSchemasTypes";
import type { CharacterSchema } from "../../characters/types/CharacterSheet";
import MainLayout from "../../../components/MainLayout";
import {
  Button,
  Card,
  Divider,
  Empty,
  Flex,
  Input,
  Modal,
  Popconfirm,
  Space,
  Spin,
  Typography,
} from "antd";

const EmptySchema: CharacterSchema = {
  sections: [
    {
      title: "Главное",
      fields: [
        { type: "text", key: "name", label: "Имя", defaultValue: "" },
        { type: "text", key: "race", label: "Раса", defaultValue: "" },
        { type: "text", key: "gender", label: "Пол", defaultValue: "" },
        { type: "text", key: "age", label: "Возраст", defaultValue: "" },
      ],
    },
  ],
};

export default () => {
  const [newName, setNewName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data, isLoading, error, mutate } = useSWR<SystemSchemaPreview[]>(
    "systems-schemas",
    getAll,
  );

  if (isLoading) {
    return (
      <MainLayout>
        <Divider>
          <Typography.Title>Схемы</Typography.Title>
        </Divider>
        <Spin size="large" />
      </MainLayout>
    );
  }
  if (error || !data) {
    return (
      <MainLayout>
        <Divider>
          <Typography.Title>Схемы</Typography.Title>
        </Divider>
        <Empty description="Ошибка загрузки схем" />
      </MainLayout>
    );
  }

  const handleDelete = async (id: number) => {
    await deleteById("systems-schemas", id);
    mutate();
  };

  const handleCreate = async () => {
    const newSchema: SystemSchemaCreate = {
      name: newName,
      schema: EmptySchema,
    };
    setIsModalOpen(false);
    await create<SystemSchemaCreate, SystemSchemaRead>(
      "systems-schemas",
      newSchema,
    );
    mutate();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewName(e.target.value);
  };

  return (
    <MainLayout>
      <Divider>
        <Typography.Title>Схемы</Typography.Title>
      </Divider>
      <div className="flex items-center justify-center">
        <Flex style={{ width: "60%" }} vertical gap="medium">
          {data?.map((schema: SystemSchemaPreview) => (
            <Card
              title={schema.name}
              key={schema.id}
              extra={
                <Space>
                  <Button onClick={() => navigate(schema.id.toString())}>
                    Редактировать
                  </Button>
                  <Popconfirm
                    title="Точно?"
                    onConfirm={() => {
                      handleDelete(schema.id);
                    }}
                  >
                    <Button danger>Удалить</Button>
                  </Popconfirm>
                </Space>
              }
              color="ant-layout-body-bg"
            />
          ))}

          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Создать
          </Button>
        </Flex>
      </div>

      <Modal
        title="Новая схема"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        onOk={handleCreate}
      >
        <Input value={newName} onChange={handleChange} />
      </Modal>
    </MainLayout>
  );
};
