import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { authAPI, type User } from '../API/auth';
import { getAccessToken, clearAccessToken, getUserRoleFromToken } from '../utils/token';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userRole: string | null;
  login: (login: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const isAuthenticated = !!user;
  const userRole = user?.role || null;
  
useEffect(() => {
  const initAuth = async () => {
    let token = getAccessToken();

    // Если токена нет — пробуем обновить через refresh
    if (!token) {
      try {
        await authAPI.refresh(); // внутри setAccessToken(новый_токен)
        token = getAccessToken();
      } catch (refreshError) {
        // Не удалось обновить — пользователь не авторизован
        setIsLoading(false);
        return;
      }
    }

    // Если токен есть (новый или старый) — получаем профиль
    if (token) {
      try {
        const profile = await authAPI.getProfile();
        setUser(profile);
      } catch (error) {
        clearAccessToken();
        setUser(null);
      }
    }

    setIsLoading(false);
  };

  initAuth();
}, []);
  
  const login = async (login: string, password: string) => {
    const response = await authAPI.login({ login, password });
    setUser(response.user);
  };
  
  const logout = async () => {
    await authAPI.logout();
    setUser(null);
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        userRole,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};