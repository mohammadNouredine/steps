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
  | "Reports";

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
};

// Permission schema type
export interface PermissionSchema {
  [module: string]: {
    [action: string]: boolean;
  };
}
