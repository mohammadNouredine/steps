import React from "react";

/**
 * Examples of how to use the new permission and role middleware functions
 *
 * This file demonstrates the different ways to protect API routes using:
 * - withPermission: Check specific module permissions (e.g., Kids.read, Payments.write)
 * - withRole: Check user roles (e.g., admin, superadmin)
 * - withPermissionAndRole: Check both permissions and roles
 */

// Example 1: Permission-based protection for Kids module
export const KidsRouteExample = `
// src/app/api/kids/route.ts
import { withErrorHandling, withAuthAndPermission, PermissionModuleEnum, PermissionActionEnum } from "@/backend/helpers/middleware";

// GET - requires Kids.read permission
export async function GET(req: NextRequest) {
  return withErrorHandling(
    withAuthAndPermission({ 
      module: PermissionModuleEnum.KIDS, 
      action: PermissionActionEnum.READ 
    })(async () => getAllKids())
  )(req);
}

// POST - requires Kids.write permission
export async function POST(req: NextRequest) {
  return withErrorHandling(
    withAuthAndPermission({ 
      module: PermissionModuleEnum.KIDS, 
      action: PermissionActionEnum.WRITE 
    })(async () => addKid({ req }))
  )(req);
}
`;

// Example 2: Role-based protection for Users module
export const UsersRouteExample = `
// src/app/api/users/route.ts
import { withErrorHandling, withAuthAndRole, RoleEnum } from "@/backend/helpers/middleware";

// GET - requires admin or superadmin role
export async function GET(req: NextRequest) {
  return withErrorHandling(
    withAuthAndRole({ 
      roles: [RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN] 
    })(async () => getAllUsers())
  )(req);
}

// POST - requires admin or superadmin role
export async function POST(req: NextRequest) {
  return withErrorHandling(
    withAuthAndRole({ 
      roles: [RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN] 
    })(async () => addUser({ req }))
  )(req);
}
`;

// Example 3: Combined permission and role protection
export const CombinedRouteExample = `
// src/app/api/sensitive-data/route.ts
import { withErrorHandling, withAuthAndPermissionAndRole, PermissionModuleEnum, PermissionActionEnum, RoleEnum } from "@/backend/helpers/middleware";

// GET - requires both Reports.read permission AND admin/superadmin role
export async function GET(req: NextRequest) {
  return withErrorHandling(
    withAuthAndPermissionAndRole({ 
      module: PermissionModuleEnum.REPORTS, 
      action: PermissionActionEnum.READ,
      roles: [RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN]
    })(async () => getSensitiveReports())
  )(req);
}
`;

// Example 4: Different permissions for different actions
export const DifferentPermissionsExample = `
// src/app/api/kids/[id]/route.ts
import { withErrorHandling, withAuthAndPermission, PermissionModuleEnum, PermissionActionEnum } from "@/backend/helpers/middleware";

// PATCH - requires Kids.write permission (to edit)
export async function PATCH(req: NextRequest, { params }: { params: { id?: string } }) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: "Missing path parameter \`id\`" }, { status: 400 });
  }
  
  return withErrorHandling(
    withAuthAndPermission({ 
      module: PermissionModuleEnum.KIDS, 
      action: PermissionActionEnum.WRITE 
    })(async () => editKid({ req, id: parseInt(id) }))
  )(req);
}

// DELETE - requires Kids.delete permission (to delete)
export async function DELETE(req: NextRequest, { params }: { params: { id?: string } }) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: "Missing path parameter \`id\`" }, { status: 400 });
  }
  
  return withErrorHandling(
    withAuthAndPermission({ 
      module: PermissionModuleEnum.KIDS, 
      action: PermissionActionEnum.DELETE 
    })(async () => deleteKid({ id: parseInt(id) }))
  )(req);
}
`;

// Example 5: Public routes with role-based access
export const PublicRouteExample = `
// src/app/api/contact/route.ts
import { withErrorHandling, withAuthAndRole, RoleEnum } from "@/backend/helpers/middleware";

// POST - public route (no authentication required for contact form)
export const POST = withErrorHandling(
  withBodyValidation(addContactMessage, addContactMessageSchema)
);

// GET - requires admin or superadmin role to view contact messages
export const GET = withErrorHandling(
  withAuthAndRole({ 
    roles: [RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN] 
  })(withQueryValidation(getContactMessages, getContactMessageSchema))
);
`;

export default function MiddlewareExamples() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Middleware Examples</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">
            1. Permission-based Protection (Kids Module)
          </h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            <code>{KidsRouteExample}</code>
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            2. Role-based Protection (Users Module)
          </h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            <code>{UsersRouteExample}</code>
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            3. Combined Permission and Role Protection
          </h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            <code>{CombinedRouteExample}</code>
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            4. Different Permissions for Different Actions
          </h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            <code>{DifferentPermissionsExample}</code>
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            5. Public Routes with Role-based Access
          </h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            <code>{PublicRouteExample}</code>
          </pre>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded">
        <h3 className="font-semibold text-blue-800">Available Enums:</h3>
        <ul className="text-sm text-blue-700 mt-2 space-y-1">
          <li>
            <strong>PermissionModuleEnum:</strong> KIDS, ATTENDANCE, PAYMENTS,
            SUBSCRIPTIONS, EXPENSES, USERS, REPORTS, ACCOUNTING, PURCHASES,
            NOTES
          </li>
          <li>
            <strong>PermissionActionEnum:</strong> READ, WRITE, DELETE, EXPORT
          </li>
          <li>
            <strong>RoleEnum:</strong> ADMIN, SUPER_ADMIN, USER
          </li>
        </ul>
      </div>
    </div>
  );
}
