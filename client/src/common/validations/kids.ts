import { Gender } from "@prisma/client";
import * as Yup from "yup";
export const KidValidationSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  phoneNumber: Yup.string().trim().nullable().default(null),
  dateOfBirth: Yup.date()
    .nullable()
    .default(undefined)
    .typeError("Date of birth must be a valid date"),
  gender: Yup.mixed<Gender>()
    .oneOf(Object.values(Gender) as Gender[], "Invalid gender")
    .nullable()
    .default(null),
  loanBalance: Yup.number()
    .nullable()
    .default(null)
    .typeError("Loan balance must be a number"),
  notes: Yup.string().trim().nullable().default(null),
});

export const AddKidValidationSchema = Yup.object().shape({
  ...KidValidationSchema.fields,
  image: Yup.mixed<File>()
    .nullable()
    .default(null)
    .test(
      "is-file-or-null",
      "Image must be a File",
      (v) => v === null || v instanceof File
    )
    .test(
      "file-not-empty",
      "Image file is empty",
      (v) => v === null || (v instanceof File && v.size > 0)
    ),
});

export const EditKidValidationSchema = Yup.object().shape({
  ...KidValidationSchema.fields,
  //here image might be either null (when there is no photo), or text (when there was photo and it was kept as is ) , or a binary (when there was or was not photo and it was added)
  image: Yup.mixed<File | string>()
    .nullable()
    .default(null)
    .test(
      "is-file-or-null",
      "Image must be a File or a string",
      (v) => v === null || v instanceof File || typeof v === "string"
    ),
});

export type KidValidationSchema = Yup.InferType<typeof KidValidationSchema>;
