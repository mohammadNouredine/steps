import * as yup from "yup";
import { validateDateAndTransformToUTC } from "../../_common/validation/date-validations";

export const addNoteSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().optional(),
  reminder_date: validateDateAndTransformToUTC.optional(),
  isArchived: yup.boolean().optional(),
});

export type AddNoteSchemaType = yup.InferType<typeof addNoteSchema>;

export const editNoteSchema = addNoteSchema.concat(
  yup.object().shape({
    id: yup.number().required(),
  })
);

export type EditNoteSchemaType = yup.InferType<typeof editNoteSchema>;
