import { getCurrentRole } from "@/services/profiles.service";
import { UserRole } from "@/types/enums";
import React from "react";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * RoleGuard - Server Component to protect UI segments based on user role.
 * Enforces Rule #7: Security-first RBAC.
 */
export async function RoleGuard({
  allowedRoles,
  children,
  fallback = null,
}: RoleGuardProps) {
  const role = await getCurrentRole();

  if (!role || !allowedRoles.includes(role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
