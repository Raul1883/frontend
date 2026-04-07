import type { ReactNode } from "react";
import type { Role } from "./Role";

export type ProtectedNode = {
  children: ReactNode;
  allowedRoles: Role;
};
