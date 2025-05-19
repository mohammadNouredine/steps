import * as yup from "yup";

export const addPlanSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be >= 0"),
  duration: yup
    .number()
    .required("Duration is required")
    .min(1, "Duration must be at least 1"),
});
export type AddPlanDto = yup.InferType<typeof addPlanSchema>;

export const editPlanSchema = addPlanSchema;
export type EditPlanDto = yup.InferType<typeof editPlanSchema>;
