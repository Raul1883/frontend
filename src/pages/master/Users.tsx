import { useState } from "react";
import useSWR, { mutate } from "swr";
import { getAll, updateByBody } from "../../API/Fetcher";
import { Link } from "react-router-dom";
import ManageHeader from "./ManageHeader";

// Типы согласно заданию
interface UserRead {
  id: number;
  login: string;
  contact_info?: string | null;
  role: string;
}

// Компонент управления пользователями
export default () => {
  // Состояние для отслеживания процесса обновления роли (id пользователя -> загрузка)
  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);

  // Получение списка пользователей через SWR
  const {
    data: users,
    error,
    isLoading,
  } = useSWR<UserRead[]>("/users", getAll, {
    revalidateOnFocus: false,
  });

  // Функция обновления роли
  const updateUserRole = async (id: number, newRole: "master" | "player") => {
    setUpdatingUserId(id);
    try {
      // Отправляем PATCH запрос на /users/user
      await updateByBody("/users/user", { id, role: newRole });
      // После успешного обновления — перезапрашиваем список пользователей
      mutate("/users");
    } catch (err) {
      console.error("Ошибка при обновлении роли:", err);
      alert("Не удалось изменить роль. Попробуйте снова.");
    } finally {
      setUpdatingUserId(null);
    }
  };

  // Обработка состояний загрузки и ошибки
  if (isLoading) {
    return (
      <div className="flex justify-center p-8 text-gray-600">
        Загрузка пользователей...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        Ошибка загрузки: {error.message}
      </div>
    );
  }

  if (!users || users.length === 0) {
    return <div className="p-4 text-gray-500">Пользователи не найдены.</div>;
  }

  return (
    <div className="">
      <ManageHeader title="Управление пользователями" />
      <div className="h-8"></div>
      {/* Таблица с ч/б стилизацией */}
      <div className="overflow-x-auto mx-8">
        <table className="min-w-full border border-gray-400 divide-y divide-gray-400">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-black border-r border-gray-300">
                ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-black border-r border-gray-300">
                Логин
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-black border-r border-gray-300">
                Контактная информация
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-black border-r border-gray-300">
                Текущая роль
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-black">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-black border-r border-gray-300">
                  {user.id}
                </td>
                <td className="px-4 py-2 text-sm text-black border-r border-gray-300">
                  {user.login}
                </td>
                <td className="px-4 py-2 text-sm text-black border-r border-gray-300">
                  {user.contact_info || "—"}
                </td>
                <td className="px-4 py-2 text-sm text-black border-r border-gray-300">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-medium rounded-sm ${
                      user.role === "master"
                        ? "bg-black text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateUserRole(user.id, "master")}
                      disabled={
                        updatingUserId === user.id || user.role === "master"
                      }
                      className={`px-3 py-1 text-xs font-medium border border-black rounded-sm transition-colors
                        ${
                          user.role === "master"
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white text-black hover:bg-black hover:text-white"
                        }
                        ${updatingUserId === user.id ? "opacity-50 cursor-wait" : ""}
                      `}
                    >
                      {updatingUserId === user.id ? "..." : "Назначить master"}
                    </button>
                    <button
                      onClick={() => updateUserRole(user.id, "player")}
                      disabled={
                        updatingUserId === user.id || user.role === "player"
                      }
                      className={`px-3 py-1 text-xs font-medium border border-black rounded-sm transition-colors
                        ${
                          user.role === "player"
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white text-black hover:bg-black hover:text-white"
                        }
                        ${updatingUserId === user.id ? "opacity-50 cursor-wait" : ""}
                      `}
                    >
                      {updatingUserId === user.id ? "..." : "Назначить player"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
