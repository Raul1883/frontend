import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { getAll, getById } from "../API/Fetcher";
import type { SessionGet } from "../types/Session";
import Header from "../components/Header";
import Modal from "../components/Modal";
import type { CharacterGet } from "../types/Character";
import { createApplications } from "../API/Applications";

export default () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const [selectedCharacterId, setSelectedCharacterId] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Загрузка данных сессии
  const {
    data: sessionData,
    error: sessionError,
    isLoading: isSessionLoading,
  } = useSWR<SessionGet>(id ? ["/sessions", id] : null, ([url, targetId]) =>
    getById<SessionGet>(url as string, Number(targetId)),
  );

  const { data: characterData, isLoading: isCharacterLoading } = useSWR<
    CharacterGet[]
  >("/characters", getAll);

  if (sessionError || isSessionLoading || !sessionData) {
    return <div>Загрузка или ошибка или хз попробуйте позже</div>;
  }

  const handleCommentText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCommentText(e.target.value);
  };

  const handleCharacterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCharacterId(Number(e.target.value));
  };

  const handleSubmit = async () => {
    if (!selectedCharacterId) {
      setError("Выберите персонажа");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const applicationData = {
        session_id: Number(id),
        character_id: selectedCharacterId,
        comment: commentText || "",
      };

      await createApplications(applicationData);

      // Успешная отправка
      setIsModalOpen(false);
      setCommentText("");
      setSelectedCharacterId(0);
      alert("Заявка успешно отправлена!");
    } catch (err) {
      setError("Ошибка при отправке заявки. Попробуйте позже.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="relative">
        <div className="p-4 absolute top-0 z-10">
          <Link
            to="/sessions"
            className="font-bold hover:underline inline-flex items-center gap-2"
          >
            ← Назад к списку сессий
          </Link>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          {/* Основная информация */}
          <div className="bg-white border border-gray-300 overflow-hidden">
            {/* Характеристики сессии */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border-b border-gray-300">
              <div>
                <p className="text-sm text-gray-500 mb-1">Система</p>
                <p className="text-lg font-semibold text-black">
                  {sessionData.system.text}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Жанр</p>
                <p className="text-sm text-black mt-1">
                  {sessionData.genre.text}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Дата и время</p>
                <p className="text-lg font-semibold text-black">
                  {sessionData.scheduled_at}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Мастер</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-black">
                    {sessionData.master.login}
                  </p>
                </div>
              </div>
              {sessionData.company && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Компания</p>
                  <p className="text-lg font-semibold text-black">
                    {sessionData.company.title}
                  </p>
                </div>
              )}
            </div>

            {/* Описание сессии */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-black mb-3">
                Описание сессии
              </h2>
              {sessionData.description ? (
                <div className="prose max-w-none">
                  <p className="text-black whitespace-pre-wrap">
                    {sessionData.description}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 italic">Описание отсутствует</p>
              )}
            </div>
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setError("");
              setSelectedCharacterId(0);
              setCommentText("");
            }}
          >
            <div className="space-y-4">
              <h2 className="text-lg font-bold mb-2 text-black">
                Подача заявки на сессию
              </h2>

              {/* Селект персонажа */}

              {characterData?.length == 0 ? (
                <div className="text-center">
                  <p>Упс... Кажется у вас ещё нет персонажей</p>
                </div>
              ) : (
                <div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Выберите персонажа *
                    </label>
                    <select
                      value={selectedCharacterId}
                      onChange={handleCharacterChange}
                      className="w-full px-3 py-2 border border-gray-400 rounded-none shadow-sm focus:outline-none"
                      disabled={isCharacterLoading}
                    >
                      <option value={0}>-- Выберите персонажа --</option>
                      {characterData?.map((character) => (
                        <option key={character.id} value={character.id}>
                          {character.name}
                        </option>
                      ))}
                    </select>
                    {isCharacterLoading && (
                      <p className="text-sm text-gray-500 mt-1">
                        Загрузка персонажей...
                      </p>
                    )}
                  </div>

                  {/* Комментарий */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Комментарий (необязательно)
                    </label>
                    <textarea
                      name="comment"
                      value={commentText}
                      onChange={handleCommentText}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-400 rounded-none shadow-sm focus:outline-none"
                      placeholder="Оставьте комментарий к заявке..."
                    />
                  </div>
                </div>
              )}

              {/* Ошибка */}
              {error && (
                <div className="text-black text-sm bg-gray-100 p-2 border border-gray-300">
                  {error}
                </div>
              )}

              {/* Кнопки */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setError("");
                    setSelectedCharacterId(0);
                    setCommentText("");
                  }}
                  className="px-4 py-2 border border-black text-black hover:bg-gray-100 transition-colors"
                >
                  Отмена
                </button>
                {characterData?.length == 0 ? (
                  <Link
                    to="/characters"
                    className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Создать нового
                  </Link>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !selectedCharacterId}
                    className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Отправка..." : "Отправить заявку"}
                  </button>
                )}
              </div>
            </div>
          </Modal>

          {/* Кнопка регистрации */}
          <div className="mt-6 flex justify-center">
            <button
              className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors font-semibold"
              onClick={() => setIsModalOpen(true)}
            >
              Записаться на сессию
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};