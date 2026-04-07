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
  
  // Проверка аутентификации при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();
      
      if (!token) {
        setIsLoading(false);
        return;
      }
      
      try {
        // Пытаемся получить профиль с текущим токеном
        const profile = await authAPI.getProfile();
        setUser(profile);
      } catch (error) {
        // Токен невалидный
        clearAccessToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
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