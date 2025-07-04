// Permission action types
export type PermissionAction = "read" | "write" | "delete" | "export";

// Permission module types
export type PermissionModule =
  | "Kids"
  | "Attendance"
  | "Payments"
  | "Subscriptions"
  | "Expenses"
  | "Users"
  | "Reports"
  | "Accounting"
  | "Purchases"
  | "Notes";

// Enums for better type safety
export enum PermissionActionEnum {
  READ = "read",
  WRITE = "write",
  DELETE = "delete",
  EXPORT = "export",
}

export enum PermissionModuleEnum {
  KIDS = "Kids",
  ATTENDANCE = "Attendance",
  PAYMENTS = "Payments",
  SUBSCRIPTIONS = "Subscriptions",
  EXPENSES = "Expenses",
  USERS = "Users",
  REPORTS = "Reports",
  ACCOUNTING = "Accounting",
  PURCHASES = "Purchases",
  NOTES = "Notes",
}

export enum RoleEnum {
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
  USER = "user",
}

// Arrays of permission values for iteration
export const PERMISSION_ACTIONS: PermissionAction[] = [
  "read",
  "write",
  "delete",
  "export",
];
export const PERMISSION_MODULES: PermissionModule[] = [
  "Kids",
  "Attendance",
  "Payments",
  "Subscriptions",
  "Expenses",
  "Users",
  "Reports",
  "Accounting",
  "Purchases",
  "Notes",
];

// Define which actions are available for each module
export const MODULE_ACTIONS: Record<PermissionModule, PermissionAction[]> = {
  Kids: ["read", "write", "delete"],
  Attendance: ["read", "write", "delete"],
  Payments: ["read", "write", "delete"],
  Subscriptions: ["read", "write", "delete"],
  Expenses: ["read", "write", "delete"],
  Users: ["read", "write", "delete"],
  Reports: ["read", "export"],
  Accounting: ["read", "write", "delete"],
  Purchases: ["read", "write", "delete"],
  Notes: ["read", "write", "delete"],
};

// Permission schema type
export interface PermissionSchema {
  [module: string]: {
    [action: string]: boolean;
  };
}

// Middleware types
export type WithPermissionConfig = {
  module: PermissionModuleEnum;
  action: PermissionActionEnum;
};

export type WithRoleConfig = {
  roles: RoleEnum[];
};
