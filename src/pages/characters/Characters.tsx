import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import { deleteById, getAll } from "../../API/Fetcher";
import type { CharacterGet } from "../../types/Character";
import { useState } from "react";
import type { SystemSchemaPreview } from "../../types/CharacterSchemasTypes";
import {
  Button,
  Card,
  Divider,
  Empty,
  Flex,
  Modal,
  Popconfirm,
  Space,
  Spin,
  Typography,
} from "antd";
import CharacterImport from "./CharacterImport";
import MainLayout from "../../components/MainLayout";

export default function CharacterList() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {
    data: characterData,
    isLoading: chrIsLoading,
    error: chrError,
    mutate,
  } = useSWR<CharacterGet[]>("/characters", getAll);

  const {
    data: schemaData,
    isLoading: schemaIsLoading,
    error: schemaError,
  } = useSWR<SystemSchemaPreview[]>("systems-schemas", getAll);

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

  const schemaNames: string[] = schemaData?.map((x) => x.name) || [];

  const deleteChar = async (id: number) => {
    await deleteById(`/characters`, id);
    await mutate();
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
                    <Button onClick={() => navigate(`${character.id}`)}>
                      Подробнее
                    </Button>,

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
                >
                  {!character.description ? null : (
                    <p>{character.description}</p>
                  )}
                </Card>
              ))}
            </Flex>
          )}
        </div>

        <Modal
          title="Выберите систему"
          open={isModalOpen}
          footer={null}
          onCancel={() => {
            setIsModalOpen(false);
          }}
        >
          <Flex gap="medium">
            {schemaNames.map((name) => (
              <Button key={name} onClick={() => navigate(name)}>
                {name}
              </Button>
            ))}
          </Flex>
        </Modal>
      </div>
    </MainLayout>
  );
}
