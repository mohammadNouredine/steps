import * as Yup from "yup";

export const registerWithUsernameValidation = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  username: Yup.string().required(),
  password: Yup.string().required().min(8),
});
export type RegisterWithUsernameBodyParams = Yup.InferType<
  typeof registerWithUsernameValidation
>;

export const loginWithUsernameValidation = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required().min(8),
});
export type LoginWithUsernameBodyParams = Yup.InferType<
  typeof loginWithUsernameValidation
>;
