import { withAuth } from "./withAuth";
import { withErrorHandling } from "./withErrorHandling";
import { withPermission } from "./withPermission";
import { withRole } from "./withRole";
import { withPermissionAndRole } from "./withPermissionAndRole";
import {
  PermissionModuleEnum,
  PermissionActionEnum,
  RoleEnum,
} from "@/types/permissions";

// Re-export all middleware functions
export {
  withAuth,
  withErrorHandling,
  withPermission,
  withRole,
  withPermissionAndRole,
};

// Re-export enums for convenience
export { PermissionModuleEnum, PermissionActionEnum, RoleEnum };

// Utility function to compose multiple middleware functions
export function compose<T extends any[]>(
  ...middlewares: Array<
    (handler: (...args: T) => Promise<any>) => (...args: T) => Promise<any>
  >
) {
  return function <R>(handler: (...args: T) => Promise<R>) {
    return middlewares.reduceRight(
      (acc, middleware) => middleware(acc),
      handler
    );
  };
}

// Pre-composed middleware for common use cases
export const withAuthAndPermission = (config: {
  module: PermissionModuleEnum;
  action: PermissionActionEnum;
}) => compose(withAuth, withPermission(config));

export const withAuthAndRole = (config: { roles: RoleEnum[] }) =>
  compose(withAuth, withRole(config));

export const withAuthAndPermissionAndRole = (config: {
  module: PermissionModuleEnum;
  action: PermissionActionEnum;
  roles: RoleEnum[];
}) => compose(withAuth, withPermissionAndRole(config));
