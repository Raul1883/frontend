import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import { deleteById, getAll } from "../../API/Fetcher";
import type { CharacterGet } from "../../types/Character";
import Header from "../../components/Header";
import { useState } from "react";
import type { SystemSchemaPreview } from "../../types/CharacterSchemasTypes";
import { Button, Card, Flex, Modal } from "antd";
import CharacterImport from "./CharacterImport";


export default function CharacterList() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<boolean>(false);
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
      <div className="w-full h-full flex items-center justify-center text-gray-600">
        загрузка...
      </div>
    );

  if (chrError || schemaError)
    return (
      <div className="w-full h-full flex items-center justify-center text-red-700">
        Ошибка загрузки
      </div>
    );

  if (!Array.isArray(characterData)) {
    return (
      <div>
        Ошибка: сервер вернул данные в неверном формате. Перезагрузите страницу
      </div>
    );
  }

  const schemaNames: string[] = schemaData?.map((x) => x.name) || [];

  const deleteChar = async (id: number) => {
    const confirmDelete = window.confirm(`Точно?`);
    if (!confirmDelete) return;

    await deleteById(`/characters`, id);
    await mutate();
  };

  return (
    <div className="min-h-screen  text-gray-900 ">
      <Header />

      <div>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-end mb-8 gap-2">
            <CharacterImport mutate={mutate} />
            <Button
              onClick={() => {
                setModal(true);
              }}
            >
              + Создать персонажа
            </Button>
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
                    <Button
                      type="primary"
                      onClick={() => navigate(`${character.id}`)}
                    >
                      Подробнее
                    </Button>,
                    <Button
                      type="dashed"
                      onClick={() => deleteChar(character.id)}
                    >
                      Удалить
                    </Button>,
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
          open={modal}
          footer={null}
          onCancel={() => {
            setModal(false);
          }}
        >
          <Flex gap="medium">
            {schemaNames.map((name) => (
              <Button onClick={() => navigate(name)}>{name}</Button>
            ))}
          </Flex>
        </Modal>
      </div>
    </div>
  );
}

{
  /* <Modal
  isOpen={modal}
  className="w-[40%]"
  onClose={() => {
    setModal(false);
  }}
>
  <h1 className="text-center text-2xl p-3">Выберите систему</h1>
  <div className="flex gap-2">

  </div>
</Modal> */
}
