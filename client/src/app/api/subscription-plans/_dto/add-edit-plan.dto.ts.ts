import * as yup from "yup";

export const addPlanSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().optional(),
  price: yup.number().required(),
  duration: yup.number().required(),
});

export const editPlanSchema = addPlanSchema;
