import React, { useEffect } from "react";
import CenteredModal from "@/app/_components/popups/CenteredModal";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import NumberField from "@/components/fields/form/NumberField";
import InputField from "@/components/fields/form/InputField";
import PasswordField from "@/components/fields/form/PasswordField";
import Button from "@/components/common/ui/Button";
import { User } from "@/types/user";
import SelectField from "@/components/fields/form/SelectField";
import { useAddUser } from "@/app/dashboard/api-hookts/users/useAddUser";
import { useUpdateUser } from "@/app/dashboard/api-hookts/users/useUpdateUser";
import { useGetUserRoles } from "@/app/dashboard/api-hookts/users/useGetUserRoles";
import { CreateUserDto, UpdateUserDto } from "@/backend/users/types/user.types";

// Validation schemas
const addUserSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email format").nullable(),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  salary: Yup.number().nullable(),
  role: Yup.string().required("Role is required"),
});

const editUserSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email format").nullable(),
  password: Yup.string().nullable(),
  salary: Yup.number().nullable(),
  role: Yup.string().required("Role is required"),
});

interface UserModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingUser?: User;
  setEditingUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

interface FormValues {
  username: string;
  password: string;
  salary: number | null;
  role: string;
}

export default function AddEditUserModal({
  isOpen,
  setIsOpen,
  editingUser,
  setEditingUser,
}: UserModalProps) {
  const userRoles = useGetUserRoles();
  const { mutate: addUser, isPending: isAdding } = useAddUser({
    callBackOnSuccess: () => {
      setIsOpen(false);
    },
  });

  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser({
    userId: editingUser?.id || -1,
    callBackOnSuccess: () => {
      setIsOpen(false);
    },
  });

  const initialValues: FormValues = editingUser
    ? {
        username: editingUser.username,
        password: "",
        salary: null,
        role: editingUser.roles?.[0]?.name || "user",
      }
    : {
        username: "",
        password: "",
        salary: null,
        role: "user",
      };

  const validationSchema = editingUser ? editUserSchema : addUserSchema;

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    const submitData = {
      username: values.username,
      password: values.password,
      roles: [values.role],
    };

    if (editingUser) {
      updateUser(submitData as UpdateUserDto);
    } else {
      addUser(submitData as CreateUserDto);
    }

    setSubmitting(false);
  };

  return (
    <CenteredModal
      onClose={() => {
        setEditingUser(undefined);
      }}
      title={editingUser ? "Edit User" : "Add User"}
      isOpenModal={isOpen}
      maxWidth="max-w-4xl"
      setIsOpenModal={setIsOpen}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form>
          <div className="md:grid md:grid-cols-2 gap-x-2">
            <InputField name="username" label="Username" />
            <PasswordField name="password" label="Password" />
            <NumberField name="salary" label="Salary" />
            <SelectField
              name="role"
              label="Role"
              data={
                userRoles.data?.data?.map((role) => ({
                  value: role.name,
                  label: role.name,
                })) || [
                  { value: "user", label: "User" },
                  { value: "admin", label: "Admin" },
                  { value: "super-admin", label: "Super Admin" },
                ]
              }
              isLoading={userRoles.isLoading}
            />
          </div>

          <Button
            className="mt-4"
            buttonType="submit"
            type="button"
            text="Submit"
            isLoading={isAdding || isUpdating}
            loadingText="Submitting..."
          />
        </Form>
      </Formik>
    </CenteredModal>
  );
}
