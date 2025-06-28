import useIsAuthenticated from "@/api/api-hooks/auth/useIsAuthenticated";

export function usePermissions() {
  const { user } = useIsAuthenticated();

  const hasPermission = (module: string, action: string): boolean => {
    if (!user?.permissions) return false;
    return user.permissions[module]?.[action] || false;
  };

  const hasAnyPermission = (module: string, actions: string[]): boolean => {
    return actions.some((action) => hasPermission(module, action));
  };

  const hasRole = (roleName: string): boolean => {
    if (!user?.roles) return false;
    return user.roles.some((role) => role.role.name === roleName);
  };

  const hasAnyRole = (roleNames: string[]): boolean => {
    return roleNames.some((role) => hasRole(role));
  };

  const hasAdminRole = (): boolean => {
    return hasAnyRole(["admin", "super_admin"]);
  };

  // Navigation visibility helpers
  const canSeeKids = (): boolean => {
    return (
      hasAnyPermission("Kids", ["read", "write", "delete"]) || hasAdminRole()
    );
  };

  const canSeeAttendance = (): boolean => {
    return (
      hasAnyPermission("Attendance", ["read", "write", "delete"]) ||
      hasAdminRole()
    );
  };

  const canSeePayments = (): boolean => {
    return (
      hasAnyPermission("Payments", ["read", "write", "delete"]) ||
      hasAdminRole()
    );
  };

  const canSeeSubscriptions = (): boolean => {
    return (
      hasAnyPermission("Subscriptions", ["read", "write", "delete"]) ||
      hasAdminRole()
    );
  };

  const canSeeExpenses = (): boolean => {
    return (
      hasAnyPermission("Expenses", ["read", "write", "delete"]) ||
      hasAdminRole()
    );
  };

  const canSeeUsers = (): boolean => {
    return hasAdminRole();
  };

  const canSeeContactMessages = (): boolean => {
    return hasAdminRole();
  };

  const canSeeReports = (): boolean => {
    return hasAnyPermission("Reports", ["read", "export"]) || hasAdminRole();
  };

  const canSeeAccounting = (): boolean => {
    return (
      hasAnyPermission("Accounting", ["read", "write", "delete"]) ||
      hasAdminRole()
    );
  };

  const canSeePurchases = (): boolean => {
    return (
      hasAnyPermission("Purchases", ["read", "write", "delete"]) ||
      hasAdminRole()
    );
  };

  const canSeeNotes = (): boolean => {
    return (
      hasAnyPermission("Notes", ["read", "write", "delete"]) || hasAdminRole()
    );
  };

  // Feature visibility helpers
  const canSeeLoanBalance = (): boolean => {
    return (
      hasAnyPermission("Accounting", ["read", "write", "delete"]) ||
      hasAdminRole()
    );
  };

  const canSeeTotalLoans = (): boolean => {
    return (
      hasAnyPermission("Accounting", ["read", "write", "delete"]) ||
      hasAdminRole()
    );
  };

  const canSeeLoanFilter = (): boolean => {
    return (
      hasAnyPermission("Accounting", ["read", "write", "delete"]) ||
      hasAdminRole()
    );
  };

  const canAddPayment = (): boolean => {
    return hasAnyPermission("Payments", ["write"]) || hasAdminRole();
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasRole,
    hasAnyRole,
    // Navigation helpers
    canSeeKids,
    canSeeAttendance,
    canSeePayments,
    canSeeSubscriptions,
    canSeeExpenses,
    canSeeUsers,
    canSeeContactMessages,
    canSeeReports,
    canSeeAccounting,
    canSeePurchases,
    canSeeNotes,
    // Feature helpers
    canSeeLoanBalance,
    canSeeTotalLoans,
    canSeeLoanFilter,
    canAddPayment,
    // Current user
    user,
  };
}
