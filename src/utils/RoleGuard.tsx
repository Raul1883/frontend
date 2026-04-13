import { useAuth } from "../hooks/useAuth";
import UnauthorizedPage from "../pages/UnauthorizedPage";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  fallback = null,
}) => {
  const { userRole, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <></>;
  if (!isAuthenticated) return <>{fallback}</>;
  if (!userRole) return <>{fallback}</>;
  if (!allowedRoles.includes(userRole)) return <>{fallback}</>;

  return <>{children}</>;
};
