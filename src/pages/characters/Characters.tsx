import useSWR from "swr";
import { deleteById } from "../../API/Fetcher";
import { useState } from "react";
import type { ListSchemaPreview } from "../../types/ListSchemasTypes";
import {
  Button,
  Card,
  Empty,
  Flex,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";
import CharacterImport from "./CharacterImport";
import MainLayout from "../../components/MainLayout";
import { pb } from "../../API/PocketBase";
import { useForm } from "antd/es/form/Form";
import type { Character } from "../../types/Character";
import NavButton from "../../components/NavButton";
import { useAuth } from "../../contexts/AuthContext";

export default function CharacterList() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = useForm();
  const { user } = useAuth();
  const {
    data: characterData,
    isLoading: chrIsLoading,
    error: chrError,
    mutate,
  } = useSWR<Character[]>(["characters"], ([url]) =>
    pb.collection(url).getFullList({
      fields: "id,name",
    }),
  );

  const {
    data: schemaData,
    isLoading: schemaIsLoading,
    error: schemaError,
  } = useSWR<ListSchemaPreview[]>(["list_schemas"], ([url]) =>
    pb.collection(url).getFullList({ fields: "id,name" }),
  );

  if (chrIsLoading || schemaIsLoading)
    return (
      <MainLayout>
        <Spin />
      </MainLayout>
    );

  if (chrError || schemaError)
    return (
      <MainLayout>
        <Empty>Ошибка загрузки</Empty>
      </MainLayout>
    );

  if (!Array.isArray(characterData)) {
    return (
      <MainLayout>
        <Empty description="Ошибка: сервер вернул данные в неверном формате. Перезагрузите страницу" />
      </MainLayout>
    );
  }

  const deleteChar = async (id: string) => {
    await deleteById(`characters`, id);
    await mutate();
  };

  const onFinish = async (
    values: Omit<Character, "id" | "owner" | "data_fiels">,
  ) => {
    setIsModalOpen(false);
    form.resetFields();

    const body = {
      owner: user?.id,
      data_fiels: { name: values.name },
      ...values,
    };

    await pb.collection("characters").create(body);
    mutate();
  };

  return (
    <MainLayout>
      <div>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between mb-8 gap-2">
            <Typography.Title>Персонажи</Typography.Title>
            <Space>
              <CharacterImport mutate={mutate} />
              <Button
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                + Создать персонажа
              </Button>
            </Space>
          </div>

          {!Array.isArray(characterData) ? (
            <div>Ошибка формата данных</div>
          ) : (
            <div />
          )}

          {characterData?.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              Пока нет ни одного персонажа
            </p>
          ) : (
            <Flex gap="medium" justify="">
              {characterData?.map((character) => (
                <Card
                  key={character.id}
                  title={character.name}
                  style={{ width: 300 }}
                  actions={[
                    <NavButton to={`${character.id}`} >
                      Подробнее
                    </NavButton>,

                    <Popconfirm
                      title="Точно?"
                      onConfirm={() => deleteChar(character.id)}
                      okText="Да"
                      cancelText="Нет"
                      okButtonProps={{ danger: true }} // Делаем кнопку подтверждения красной
                    >
                      <Button danger>Удалить</Button>
                    </Popconfirm>,
                  ]}
                ></Card>
              ))}
            </Flex>
          )}
        </div>

        <Modal
          title="Выберите систему"
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
          }}
          onOk={form.submit}
        >
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              label="Имя персонажа"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="система"
              name="list_schema"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                options={schemaData?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </MainLayout>
  );
}
