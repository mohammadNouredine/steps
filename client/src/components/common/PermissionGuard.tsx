import React from "react";
import { usePermissions } from "@/hooks/usePermissions";

interface PermissionGuardProps {
  children: React.ReactNode;
  module: string;
  action: string;
  fallback?: React.ReactNode;
}

interface RoleGuardProps {
  children: React.ReactNode;
  roles: string[];
  fallback?: React.ReactNode;
}

interface FeatureGuardProps {
  children: React.ReactNode;
  feature: "loanBalance" | "totalLoans" | "loanFilter";
  fallback?: React.ReactNode;
}

export function PermissionGuard({
  children,
  module,
  action,
  fallback = null,
}: PermissionGuardProps) {
  const { hasPermission } = usePermissions();

  if (!hasPermission(module, action)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export function RoleGuard({
  children,
  roles,
  fallback = null,
}: RoleGuardProps) {
  const { hasAnyRole } = usePermissions();

  if (!hasAnyRole(roles)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export function FeatureGuard({
  children,
  feature,
  fallback = null,
}: FeatureGuardProps) {
  const { canSeeLoanBalance, canSeeTotalLoans, canSeeLoanFilter } =
    usePermissions();

  let hasAccess = false;

  switch (feature) {
    case "loanBalance":
      hasAccess = canSeeLoanBalance();
      break;
    case "totalLoans":
      hasAccess = canSeeTotalLoans();
      break;
    case "loanFilter":
      hasAccess = canSeeLoanFilter();
      break;
  }

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
