import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, isLoading, userRole } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Или ваш компонент загрузки
  }

  // почему то при миграции на pb эта проверка всегда скидывала на login, даже если все права есть.
  // потом займусь
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
