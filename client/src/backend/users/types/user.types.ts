// User-related types and interfaces

export interface CreateUserDto {
  username: string;
  firstName?: string;
  lastName?: string;
  password: string;
  roles?: string[];
  permissions?: Record<string, Record<string, boolean>>;
}

export interface UpdateUserDto {
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  roles?: string[];
  permissions?: Record<string, Record<string, boolean>>;
}

export interface UpdateUserPermissionsDto {
  permissions: Record<string, Record<string, boolean>>;
}

export interface UserResponse {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  roles: string[];
  permissions: Record<string, Record<string, boolean>>;
}

// Permission-related types
export interface PermissionModule {
  id: number;
  name: string;
  actions: PermissionAction[];
}

export interface PermissionAction {
  id: number;
  name: string;
  moduleId: number;
}

export interface UserPermission {
  id: number;
  userId: number;
  actionId: number;
  allowed: boolean;
}
