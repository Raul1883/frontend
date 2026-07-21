import { pb } from "./PocketBase";

export interface User {
  id: string;
  login: string;
  contact_info: string;
  role: string;
}

export const authAPI = {
  login: async (login: string, password: string) => {
    const authData = await pb
      .collection("users")
      .authWithPassword(login, password);
    const user: User = {
      id: authData.record.id,
      login: authData.record.username,
      contact_info: authData.record.contact_info || "",
      role: authData.record.role || "player",
    };

    return { user, token: authData.token };
  },

  // Проверка сессии при перезагрузке страницы
  refresh: async () => {
    // Запрашиваем новый токен и актуальные данные профиля
    const authData = await pb.collection("users").authRefresh();

    const user: User = {
      id: authData.record.id,
      login: authData.record.username,
      contact_info: authData.record.contact_info || "",
      role: authData.record.role || "player",
    };

    return { user, token: authData.token };
  },

  // Выход
  logout: async () => {
    // В PocketBase достаточно очистить локальное хранилище токена
    pb.authStore.clear();
  },
};
