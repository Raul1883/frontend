import { Navigate } from "react-router-dom";
import type { ProtectedNode } from "../types/ProtectedNode";
import type { Role } from "../types/Role";

function isAuth(allowedRoles: Role): boolean {
    console.log(allowedRoles);
  return true;
}

function ProtectedRoute({ children, allowedRoles }: ProtectedNode) {
  if (!isAuth(allowedRoles)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
export default ProtectedRoute;
