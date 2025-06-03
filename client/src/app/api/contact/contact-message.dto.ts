import * as yup from "yup";

export const addContactMessageSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup.string().required("Phone is required"),
  childName: yup.string().required("Child name is required"),
  childAge: yup.number().required("Child age is required"),
  message: yup.string().required("Message is required"),
});

export type AddContactMessageSchemaType = yup.InferType<
  typeof addContactMessageSchema
>;

export const getContactMessageSchema = yup.object().shape({
  search: yup.string().optional(),
  pageIndex: yup.number().required("Page index is required"),
  pageSize: yup.number().required("Page size is required"),
});

export type GetContactMessageSchemaType = yup.InferType<
  typeof getContactMessageSchema
>;
