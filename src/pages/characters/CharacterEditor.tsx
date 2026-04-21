import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import type { CharacterGet, CharacterPost } from "../../types/Character";
import { create, getById, updateByPath } from "../../API/Fetcher";

// Предполагаемый путь к настроенному экземпляру axios

export default () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id != "new";
  console.log(isEdit);

  // Состояния формы
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dataFieldsJson, setDataFieldsJson] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Загрузка данных персонажа при редактировании
  const {
    data: character,
    error: fetchError,
    isLoading: isFetching,
  } = useSWR<CharacterGet>(
    isEdit ? ["character", id] : null,
    () => getById<CharacterGet>("/characters", Number(id)),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  // Заполнение формы при получении данных персонажа
  useEffect(() => {
    if (character) {
      setName(character.name);
      setDescription(character.description);
      // Форматируем data_fields в читаемый JSON с отступами
      setDataFieldsJson(JSON.stringify(character.data_fields, null, 2));
      setJsonError(null);
    }
  }, [character]);

  // Валидация JSON строки и парсинг в объект
  const parseDataFields = (): Record<string, any> | null => {
    if (!dataFieldsJson.trim()) {
      setJsonError("Поле data_fields не может быть пустым");
      return null;
    }
    try {
      const parsed = JSON.parse(dataFieldsJson);
      if (
        typeof parsed !== "object" ||
        parsed === null ||
        Array.isArray(parsed)
      ) {
        setJsonError("data_fields должен быть объектом (не массивом)");
        return null;
      }
      setJsonError(null);
      return parsed;
    } catch (e) {
      setJsonError("Невалидный JSON формат");
      return null;
    }
  };

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Базовая валидация
    if (!name.trim()) {
      setSubmitError("Имя персонажа обязательно");
      return;
    }

    const dataFieldsObject = parseDataFields();
    if (!dataFieldsObject) {
      setSubmitError("Исправьте ошибки в поле data_fields");
      return;
    }

    const payload: CharacterPost = {
      name: name.trim(),
      description: description.trim(),
      data_fields: dataFieldsObject,
    };

    setIsSubmitting(true);
    try {
      if (isEdit && id) {
        // Редактирование
        await updateByPath<CharacterPost, CharacterGet>(
          "/characters",
          Number(id),
          payload,
        );
      } else {
        // Создание
        await create<CharacterPost, CharacterGet>("/characters", payload);
      }
      // Перенаправление на список персонажей (или другой роут)
      navigate("/characters");
    } catch (err: any) {
      setSubmitError(
        err?.response?.data?.message ||
          err?.message ||
          "Ошибка при сохранении персонажа",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Отображение загрузки при редактировании
  if (isEdit && isFetching) {
    return <div>Загрузка данных персонажа...</div>;
  }

  // Отображение ошибки загрузки
  if (isEdit && fetchError) {
    return <div>Ошибка загрузки: {fetchError.message}</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "600px", margin: "0 auto" }}
    >
      <h2>{isEdit ? "Редактирование персонажа" : "Создание персонажа"}</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="name">Имя *</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="data_fields">data_fields (JSON объект) *</label>
        <textarea
          id="data_fields"
          value={dataFieldsJson}
          onChange={(e) => setDataFieldsJson(e.target.value)}
          rows={10}
          style={{ width: "100%", padding: "0.5rem", fontFamily: "monospace" }}
          placeholder='{"key": "value"}'
        />
        {jsonError && (
          <div style={{ color: "red", fontSize: "0.875rem" }}>{jsonError}</div>
        )}
        <small style={{ display: "block", marginTop: "0.25rem" }}>
          Введите валидный JSON объект (например, {'{ "уровень": 5 }'})
        </small>
      </div>

      {submitError && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{submitError}</div>
      )}

      <div style={{ display: "flex", gap: "1rem" }}>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Сохранение..." : isEdit ? "Обновить" : "Создать"}
        </button>
        <button type="button" onClick={() => navigate("/characters")}>
          Отмена
        </button>
      </div>
    </form>
  );
};
