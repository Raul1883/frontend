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
  const [userRole, setUserRole] = useState<string | null>(null);
  
  const isAuthenticated = !!user;
  //const userRole = user?.role || null;
  

  
useEffect(() => {
  const initAuth = async () => {
    let token = getAccessToken();

    if (!token) {
      try {
        await authAPI.refresh(); 
        token = getAccessToken();
      } catch (refreshError) {
        setIsLoading(false);
        return;
      }
    }

    if (token) {
      try {
        const profile = await authAPI.getProfile();
        setUser(profile);
        setUserRole(profile.role)
      } catch (error) {
        clearAccessToken();
        setUserRole(null)
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
    setUserRole(response.user.role);
  };
  
  const logout = async () => {
    await authAPI.logout();
    setUser(null);
    setUserRole(null);
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