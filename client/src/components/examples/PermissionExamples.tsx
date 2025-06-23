import React from "react";
import { usePermissions } from "@/hooks/usePermissions";
import {
  PermissionGuard,
  RoleGuard,
  FeatureGuard,
} from "@/components/common/PermissionGuard";

// Example 1: Navigation item visibility (already handled in useGetNavItems)
export function NavigationExample() {
  const { canSeeKids, canSeeUsers } = usePermissions();

  return (
    <div>
      {canSeeKids() && <a href="/dashboard/kids">Kids Management</a>}

      {canSeeUsers() && <a href="/dashboard/users">User Management</a>}
    </div>
  );
}

// Example 2: Feature-level protection using PermissionGuard
export function KidsTableExample() {
  return (
    <div>
      <h2>Kids List</h2>

      {/* Only show add button if user has write permission */}
      <PermissionGuard module="Kids" action="write">
        <button>Add New Kid</button>
      </PermissionGuard>

      {/* Only show delete button if user has delete permission */}
      <PermissionGuard module="Kids" action="delete">
        <button>Delete Selected</button>
      </PermissionGuard>

      {/* Show table for read permission */}
      <PermissionGuard module="Kids" action="read">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <FeatureGuard feature="loanBalance">
                <th>Loan Balance</th>
              </FeatureGuard>
            </tr>
          </thead>
          <tbody>{/* Table content */}</tbody>
        </table>
      </PermissionGuard>
    </div>
  );
}

// Example 3: Role-based protection
export function AdminOnlyExample() {
  return (
    <RoleGuard roles={["admin", "super_admin"]}>
      <div>
        <h2>Admin Panel</h2>
        <p>This content is only visible to admins and super admins.</p>
      </div>
    </RoleGuard>
  );
}

// Example 4: Accounting features
export function AccountingFeaturesExample() {
  return (
    <div>
      <h2>Financial Summary</h2>

      {/* Show total loans only if user has accounting permission */}
      <FeatureGuard feature="totalLoans">
        <div className="total-loans">
          <h3>Total Loans: $15,000</h3>
        </div>
      </FeatureGuard>

      {/* Show loan filter only if user has accounting permission */}
      <FeatureGuard feature="loanFilter">
        <div className="loan-filter">
          <label>
            <input type="checkbox" /> Show only kids with loans
          </label>
        </div>
      </FeatureGuard>

      {/* Show loan balance in kid details */}
      <div className="kid-details">
        <h3>Kid Details</h3>
        <p>Name: John Doe</p>
        <p>Age: 8</p>
        <FeatureGuard feature="loanBalance">
          <p>Loan Balance: $500</p>
        </FeatureGuard>
      </div>
    </div>
  );
}

// Example 5: Conditional rendering with fallbacks
export function ConditionalRenderingExample() {
  return (
    <div>
      <PermissionGuard
        module="Reports"
        action="export"
        fallback={<p>You don&apos;t have permission to export reports.</p>}
      >
        <button>Export Report</button>
      </PermissionGuard>

      <RoleGuard
        roles={["admin"]}
        fallback={<p>Contact an admin to access this feature.</p>}
      >
        <div>Admin-only content here</div>
      </RoleGuard>
    </div>
  );
}
