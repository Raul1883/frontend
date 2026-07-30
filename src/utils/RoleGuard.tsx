import { useAuth } from "../contexts/AuthContext";

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
  const { role: userRole, isLoading } = useAuth();

  if (isLoading) return <></>;
  if (!userRole) return <>{fallback}</>;
  if (!allowedRoles.includes(userRole)) return <>{fallback}</>;

  return <>{children}</>;
};
