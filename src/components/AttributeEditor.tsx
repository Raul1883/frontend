import useSWR from "swr";
import { create, deleteById, getAll } from "../API/Fetcher";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import type { EntityCreate } from "../types/Entity";

type attributeType = "genre" | "system";

type Entity = {
  id: number;
  text: string;
};

export default ({
  type,
  setState,
  defaultId = null,
}: {
  type: attributeType;
  setState: (name: string, value: number) => void;
  defaultId?: number | null;
}) => {
  const { data, isLoading, error, mutate } = useSWR<Entity[]>(
    `/${type}`,
    getAll,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTextState, setNewTextState] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (defaultId !== null && defaultId !== selectedId) {
      setSelectedId(defaultId);
    }
  }, [defaultId]);

  useEffect(() => {
    if (data && data.length > 0 && selectedId === null) {
      const initialId = defaultId !== null ? defaultId : data[0]?.id;
      if (initialId !== undefined) {
        setSelectedId(initialId);
        if (defaultId === null) {
          setState(`${type}_id`, initialId);
        }
      }
    }
  }, [data, selectedId, defaultId, setState, type]);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const handleChangeSelectedItem = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newId = parseInt(event.target.value, 10);
    if (!isNaN(newId)) {
      setSelectedId(newId);
      setState(`${type}_id`, newId);
    }
  };

  const handleChangeModalInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewTextState(e.target.value);
  };

  const handleCreateNewEntity = async () => {
    if (newTextState.trim() === "") {
      alert("Имя не может быть пустым!");
      return;
    }

    const newEntity: EntityCreate = { text: newTextState };

    try {
      const createdEntity = await create<EntityCreate, Entity>(
        `/${type}`,
        newEntity,
      );
      await mutate();
      setSelectedId(createdEntity.id);
      setState(`${type}_id`, createdEntity.id);
      closeModal();
      setNewTextState("");
    } catch (error) {
      console.error("Ошибка при создании:", error);
      alert("Не удалось создать элемент");
    }
  };

  const handleDelete = async () => {
    if (!selectedId) {
      alert("Нет выбранного элемента для удаления");
      return;
    }

    // Подтверждение удаления
    const confirmDelete = window.confirm(
      `Точно?`,
    );
    if (!confirmDelete) return;

    try {
      // Выполняем DELETE запрос
      await deleteById(`/${type}`, selectedId);
      // Обновляем данные из сервера
      await mutate();

      // После обновления данных нужно выбрать новый элемент
      if (data && data.length > 0) {
        const remainingItems = data.filter((item) => item.id !== selectedId);
        const newSelectedId =
          remainingItems.length > 0 ? remainingItems[0]?.id : null;
        setSelectedId(newSelectedId);
        if (newSelectedId !== null) {
          setState(`${type}_id`, newSelectedId);
        } else {
          // Если элементов не осталось, сбрасываем значение в родителе (например, 0)
          setState(`${type}_id`, 0);
        }
      } else {
        setSelectedId(null);
        setState(`${type}_id`, 0);
      }
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      alert("Не удалось удалить элемент");
    }
  };

  if (isLoading || error || !data) {
    return <div></div>;
  }

  return (
    <div className="flex flex-row items-center h-10 border-2 rounded-lg">
      <select
        className="py-2 w-full indent-2 border-r-2  focus:outline-none "
        value={selectedId ?? ""}
        onChange={handleChangeSelectedItem}
      >
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.text}
          </option>
        ))}
      </select>
      <div className="flex flex-row p-0 h-full font-bold ">
        <button onClick={openModal} className="w-8 p-0 border-r-2">
          +
        </button>
        <button onClick={handleDelete} className="w-8 p-0">
          -
        </button>
      </div>
      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <h1>Добавить</h1>
        <div className="flex flex-row">
          <input
            name="text"
            onChange={handleChangeModalInput}
            value={newTextState}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={handleCreateNewEntity}
            className="mx-4 px-2 border-2 rounded"
          >
            Сохранить
          </button>
        </div>
      </Modal>
    </div>
  );
};
