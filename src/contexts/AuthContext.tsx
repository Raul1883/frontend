import React, { createContext, useContext, useEffect, useState } from "react";
import { pb } from "../API/PocketBase";
import type { RecordModel } from "pocketbase";

interface AuthContextType {
  user: RecordModel | null;
  role: string | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<RecordModel | null>(pb.authStore.model);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. При монтировании обновляем токен на сервере (если есть)
    async function initAuth() {
      if (pb.authStore.isValid) {
        try {
          // Обновит данные пользователя, если они изменились на сервере
          await pb.collection("users").authRefresh();
        } catch {
          pb.authStore.clear();
        }
      }
      setIsLoading(false);
    }

    initAuth();

    // 2. Подписываемся на изменения AuthStore (login/logout в любом месте)
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setUser(model);
    });

    return () => {
      unsubscribe(); // Отписка при размонтировании
    };
  }, []);

  const logout = () => pb.authStore.clear();

  // Допустим, роль хранится в поле 'role' коллекции users (например, "admin" | "user")
  const role = user?.role || null;

  return (
    <AuthContext.Provider value={{ user, role, isLoading, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
