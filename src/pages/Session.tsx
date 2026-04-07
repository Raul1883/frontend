import React from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { getById } from "../API/Fetcher";
import type { SessionGet } from "../types/Session";
import Header from "../components/Header";

export default () => {
  const { id } = useParams<{ id: string }>();

  // Загрузка данных сессии
  const { data, error, isLoading } = useSWR<SessionGet>(
    id ? ["/sessions", id] : null,
    ([url, targetId]) => getById<SessionGet>(url as string, Number(targetId)),
  );

  if (error || isLoading || !data) {
    return <div>Загрузка или ошибка или хз попробуйте позже</div>;
  }

  const handleApplication = () => {
    console.log(1111);
  };

  return (
    <div>
      <Header></Header>
      <div className="relative">
        <div className="p-4 absolute top-0 z-10">
          <Link
            to="/sessions"
            className="font-bold hover:border-b-2 inline-flex items-center gap-2"
          >
            ← Назад к списку сессий
          </Link>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          {/* Основная информация */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Характеристики сессии */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-b bg-gray-50">
              <div>
                <p className="text-sm text-gray-500 mb-1">Система</p>
                <p className="text-lg font-semibold text-gray-900">
                  {data.system.text}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Жанр</p>
                <p className="text-sm text-gray-600 mt-1">{data.genre.text}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Дата и время</p>
                <p className="text-lg font-semibold text-gray-900">
                  {data.scheduled_at}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Мастер</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-gray-900">
                    {data.master.login}
                  </p>
                </div>
              </div>
              {data.company && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Компания</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.company.title}
                  </p>
                </div>
              )}
            </div>

            {/* Описание сессии */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Описание сессии
              </h2>
              {data.description ? (
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {data.description}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 italic">Описание отсутствует</p>
              )}
            </div>

            {/* Дополнительная информация */}
          </div>

          {/* Кнопка регистрации (если нужно) */}
          <div className="mt-6 flex justify-center">
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              onClick={() =>
                alert("Функция регистрации на сессию будет добавлена позже")
              }
            >
              Записаться на сессию
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
