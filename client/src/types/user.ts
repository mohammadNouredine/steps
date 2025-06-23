export interface User {
  id: number;
  documentId: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  resetPasswordToken?: string;
  registrationToken?: string;
  isActive: boolean;
  roles: Role[];
  permissions?: Record<string, Record<string, boolean>>;
  blocked: boolean;
  preferedLanguage: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: User;
  updatedBy: User;
  locale: string;
}

// Role assigned to a user
export interface Role {
  id: number;
  documentId: string;
  name: string;
  code: string;
  description: string;
  users: UserSummary[];
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: User;
  updatedBy: User;
  locale: string;
}

// Permission linked to roles
export interface Permission {
  id: number;
  documentId: string;
  action: string;
  actionParameters: string;
  subject: string;
  properties: string;
  conditions: string;
  role: RoleSummary;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: User;
  updatedBy: User;
  locale: string;
}

// Summary for roles and permissions
export interface RoleSummary {
  id: number;
  documentId: string;
}

// User summary for nested structures
export interface UserSummary {
  id: number;
  documentId: string;
}
