import React from "react";
import CenteredModal from "@/app/_components/popups/CenteredModal";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from "@/components/common/ui/Button";
import { User } from "@/types/user";
import { useUpdateUserPermissions } from "@/app/dashboard/api-hookts/users/useUpdateUserPermissions";
import {
  MODULE_ACTIONS,
  PermissionAction,
  PermissionModule,
  PermissionSchema,
  PERMISSION_ACTIONS,
  PERMISSION_MODULES,
} from "@/types/permissions";
import CheckboxField from "@/components/fields/form/CheckboxField";
import CheckboxControlled from "@/components/fields/controlled/CheckboxControlled";

// Define the permission schema using Yup
const permissionSchema = Yup.object().shape({});

interface EditUserPermissionsModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingUser?: User;
  setEditingUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export default function EditUserPermissionsModal({
  isOpen,
  setIsOpen,
  editingUser,
  setEditingUser,
}: EditUserPermissionsModalProps) {
  const { mutate: updatePermissions, isPending: isUpdating } =
    useUpdateUserPermissions({
      userId: editingUser?.id || 0,
      callBackOnSuccess: () => {
        setIsOpen(false);
        setEditingUser(undefined);
      },
    });

  // Initialize permissions object with all modules and actions set to false
  const initializePermissions = (): PermissionSchema => {
    const permissions: PermissionSchema = {};

    PERMISSION_MODULES.forEach((module) => {
      permissions[module] = {};
      MODULE_ACTIONS[module].forEach((action: PermissionAction) => {
        permissions[module][action] = false;
      });
    });

    // Merge with existing user permissions if editing
    if (editingUser?.permissions) {
      Object.entries(editingUser.permissions).forEach(([module, actions]) => {
        if (permissions[module]) {
          Object.entries(actions as Record<string, boolean>).forEach(
            ([action, allowed]) => {
              if (permissions[module][action] !== undefined) {
                permissions[module][action] = allowed;
              }
            }
          );
        }
      });
    }

    return permissions;
  };

  const initialValues: PermissionSchema = initializePermissions();

  const handleSubmit = (
    values: PermissionSchema,
    { setSubmitting }: FormikHelpers<PermissionSchema>
  ) => {
    updatePermissions({ permissions: values });
    setSubmitting(false);
  };

  return (
    <CenteredModal
      onClose={() => {
        setEditingUser(undefined);
      }}
      title="Edit User Permissions"
      isOpenModal={isOpen}
      maxWidth="max-w-4xl"
      setIsOpenModal={setIsOpen}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={permissionSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }) => {
          // Handle select all for a module
          const handleSelectAll = (
            module: PermissionModule,
            checked: boolean
          ) => {
            MODULE_ACTIONS[module].forEach((action: PermissionAction) => {
              setFieldValue(`${module}.${action}`, checked);
            });
          };

          // Check if all permissions are selected for a module
          const isAllSelected = (module: PermissionModule) => {
            return MODULE_ACTIONS[module].every(
              (action: PermissionAction) => values[module]?.[action]
            );
          };

          return (
            <Form>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Module
                      </th>
                      {PERMISSION_ACTIONS.map((action: PermissionAction) => (
                        <th
                          key={action}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {action}
                        </th>
                      ))}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Select All
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {PERMISSION_MODULES.map((module: PermissionModule) => (
                      <tr key={module}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {module}
                        </td>
                        {PERMISSION_ACTIONS.map((action: PermissionAction) => (
                          <td
                            key={action}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            {MODULE_ACTIONS[module].includes(action) ? (
                              <CheckboxField
                                name={`${module}.${action}`}
                                title=""
                              />
                            ) : (
                              <div className="h-4 w-4" /> // Empty space for unavailable actions
                            )}
                          </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <CheckboxControlled
                            title=""
                            checked={isAllSelected(module)}
                            onChange={(checked: boolean) =>
                              handleSelectAll(module, checked)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  buttonType="submit"
                  type="button"
                  text="Save Permissions"
                  isLoading={isUpdating}
                  loadingText="Saving..."
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </CenteredModal>
  );
}
