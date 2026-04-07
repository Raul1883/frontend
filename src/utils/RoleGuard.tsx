import { useAuth } from "../hooks/useAuth";

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

  console.log("RoleGuard render:", { userRole, isAuthenticated, isLoading });

  if (!isAuthenticated) return <>{fallback}</>;
  if (!userRole) return <>{fallback}</>;
  if (!allowedRoles.includes(userRole)) return <>{fallback}</>;

  return <>{children}</>;
};
