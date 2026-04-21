import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import { getAll } from "../API/Fetcher";
import type { CharacterGet } from "../types/Character";

export default function CharacterList() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useSWR<CharacterGet[]>(
    "/characters",
    getAll,
  );

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-600">
        загрузка...
      </div>
    );

  if (error)
    return (
      <div className="w-full h-full flex items-center justify-center text-red-700">
        Ошибка загрузки
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 filter grayscale">
      <div className="container mx-auto px-4 py-8">
        {/* Кнопка создания */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => navigate("new")}
            className="px-5 py-2 bg-gray-800 text-white rounded-md shadow-sm 
                       hover:bg-gray-700 transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            + Создать персонажа
          </button>
        </div>

        {/* Состояние пустого списка */}
        {data?.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Пока нет ни одного персонажа
          </p>
        ) : (
          <div className="grid gap-6 ">
            {data?.map((character) => (
              <div
                key={character.id}
                className="bg-white border border-gray-300 rounded-lg p-5 
                           shadow-sm hover:shadow-md transition-all duration-200"
              >
                <h2 className="text-xl font-bold mb-2 text-gray-800">
                  {character.name}
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {character.description}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => navigate(`${character.id}`)}
                    className="px-4 py-1.5 bg-gray-600 text-white rounded-md 
                             hover:bg-gray-500 transition-colors duration-200 
                             focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Подробнее
                  </button>
                  <button
                    onClick={() => navigate(`${character.id}`)}
                    className="px-4 py-1.5 bg-gray-600 text-white rounded-md 
                             hover:bg-gray-500 transition-colors duration-200 
                             focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Редактировать
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
