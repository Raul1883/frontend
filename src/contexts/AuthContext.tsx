import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { authAPI, type User } from "../API/auth";
import { pb } from "../API/PocketBase";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userRole: string | null;
  login: (login: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const initAuth = async () => {
      if (pb.authStore.isValid) {
        try {
          const response = await authAPI.refresh();
          setUser(response.user);
          setUserRole(response.user.role);
        } catch (error) {
          pb.authStore.clear();
          setUser(null);
          setUserRole(null);
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (login: string, password: string) => {
    const response = await authAPI.login(login, password);
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
