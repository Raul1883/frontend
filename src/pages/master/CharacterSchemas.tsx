import useSWR from "swr";
import { create, deleteById, getAll } from "../../API/Fetcher";
import { useState } from "react";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";
import ManageHeader from "./ManageHeader";
import type {
  SystemSchemaCreate,
  SystemSchemaPreview,
  SystemSchemaRead,
} from "../../types/CharacterSchemasTypes";

const EmptySchema = {
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

  const { data, isLoading, error, mutate } = useSWR<SystemSchemaPreview[]>(
    "systems-schemas",
    getAll,
  );

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  if (error) {
    return <div>Ошибка загрузки схем</div>;
  }

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(`Точно?`);
    if (!confirmDelete) return;

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
    <div>
      <ManageHeader title="Редактор схем" />
      <div>
        <div className="flex flex-col mt-4 mx-auto  items-center w-200 min-h-100 border">
          <div className="w-[90%] flex justify-between items-center mx-4 mt-2 ">
            <h3 className="text-xl px-10 border-b text-center">Схемы</h3>
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="flex items-center justify-center border rounded h-8 px-2 py-1"
            >
              <span>Создать схему</span>
            </button>
          </div>
          {data?.map((schema: SystemSchemaPreview) => (
            <div key={schema.id} className="w-full p-4 py-2 mb-2 ">
              <div className=" border rounded h-full items-center px-2">
                <p className="font-bold text-xl">{schema.name}</p>
                <div className="flex items-center justify-between  mb-2 mt-2">
                  <Link
                    to={schema.id.toString()}
                    className="p-2 border rounded "
                  >
                    редактировать
                  </Link>
                  <button
                    onClick={() => {
                      handleDelete(schema.id);
                    }}
                    className="p-2 border rounded "
                  >
                    удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        className="w-120 flex flex-col gap-2"
      >
        <input value={newName} onChange={handleChange} className="px-3 py-2" />
        <button onClick={handleCreate}>Сохранить</button>
      </Modal>
    </div>
  );
};
