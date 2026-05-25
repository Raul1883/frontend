import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { getById, updateByPath, create } from "../../API/Fetcher";
import type { SessionGet, SessionPost } from "../../types/Session";
import AttributeEditor from "../../components/AttributeEditor";
import ManageHeader from "./ManageHeader";

interface SessionFormProps {
  mode: "create" | "edit";
}

export default ({ mode }: SessionFormProps) => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = mode === "edit";

  // Загрузка данных только в режиме редактирования
  const { data, error, isLoading, mutate } = useSWR<SessionGet>(
    isEditMode && id ? ["/sessions", id] : null,
    ([url, targetId]) => getById<SessionGet>(url as string, Number(targetId)),
  );

  // Начальное состояние формы
  const getInitialFormData = (): SessionPost => ({
    title: "",
    description: "",
    system_id: 0,
    genre_id: 0,
    company_id: undefined,
    scheduled_at: "",
  });

  const [formData, setFormData] = useState<SessionPost>(getInitialFormData());
  const [errors, setErrors] = useState<
    Partial<Record<keyof SessionPost, string>>
  >({});

  // Заполнение формы данными при редактировании
  useEffect(() => {
    if (isEditMode && data) {
      setFormData({
        title: data.title,
        description: data.description,
        system_id: data.system.id,
        genre_id: data.genre.id,
        company_id: data.company?.id,
        scheduled_at: data.scheduled_at,
      });
    }
  }, [isEditMode, data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Очищаем ошибку для этого поля при изменении
    if (errors[name as keyof SessionPost]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const setFormPair = (name: string, value: number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof SessionPost]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SessionPost, string>> = {};

    if (!formData.title?.trim()) {
      newErrors.title = "Название обязательно";
    }
    if (!formData.scheduled_at) {
      newErrors.scheduled_at = "Дата обязательна";
    }
    if (!formData.system_id) {
      newErrors.system_id = "Выберите систему";
    }
    if (!formData.genre_id) {
      newErrors.genre_id = "Выберите жанр";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const move = useNavigate();
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    console.log("Отправка на сервер:", formData);

    try {
      if (isEditMode && id) {
        const response = await updateByPath<SessionPost, SessionGet>(
          "/sessions",
          Number(id),
          formData,
        );
        mutate(response);
        alert("Сохранено!");
        move("/manage/sessions");
      } else {
        await create<SessionPost, SessionGet>("/sessions", formData);
        alert("Создано!");
        move("/manage/sessions");
      }
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      // Здесь можно добавить обработку ошибок
    }
  };

  // Отображение загрузки и ошибок только в режиме редактирования
  if (isEditMode) {
    if (error)
      return <div className="p-4 text-red-500">Ошибка загрузки сессии</div>;
    if (isLoading) return <div className="p-4">Загрузка...</div>;
    if (!data) return <div className="p-4">Сессия не найдена</div>;
  }

  const getFieldClassName = (fieldName: keyof SessionPost) => {
    return `w-full border p-2 rounded ${
      errors[fieldName] ? "border-red-500" : ""
    }`;
  };

  return (
    <div>
      <ManageHeader title={isEditMode ? `Редактирование сессии #${id}` : "Создание новой сессии"} />
      <div className="mx-auto p-6 bg-white max-w-[60%]">
        <h1 className="text-2xl font-bold mb-6">
          {isEditMode ? `Редактор сессии #${id}` : "Создание сессии"}
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Название{!isEditMode && "*"}
              {errors.title && (
                <span className="text-red-500 ml-2">{errors.title}</span>
              )}
            </label>
            <input
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              className={getFieldClassName("title")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Описание сессии</label>
            <textarea
              name="description"
              rows={8}
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Опишите сюжет, требования к игрокам..."
              className="w-full border p-2 rounded font-sans"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm p-4 rounded">
            <div>
              <p className="text-gray-500">
                Система:
                {errors.system_id && (
                  <span className="text-red-500 ml-2">{errors.system_id}</span>
                )}
              </p>
              <AttributeEditor
                type="system"
                setState={setFormPair}
                defaultId={isEditMode ? data?.system.id : undefined}
              />
            </div>
            <div>
              <p className="text-gray-500">
                Жанр:
                {errors.genre_id && (
                  <span className="text-red-500 ml-2">{errors.genre_id}</span>
                )}
              </p>
              <AttributeEditor
                type="genre"
                setState={setFormPair}
                defaultId={isEditMode ? data?.genre.id : undefined}
              />
            </div>

            <div>
              <p className="text-gray-500">
                Дата{!isEditMode && "*"}:
                {errors.scheduled_at && (
                  <span className="text-red-500 ml-2">
                    {errors.scheduled_at}
                  </span>
                )}
              </p>
              <input
                name="scheduled_at"
                value={formData.scheduled_at || ""}
                onChange={handleChange}
                className={getFieldClassName("scheduled_at")}
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full border py-2 rounded hover:bg-gray-100 transition"
          >
            {isEditMode ? "Сохранить изменения" : "Создать сессию"}
          </button>
        </div>
      </div>
    </div>
  );
};
