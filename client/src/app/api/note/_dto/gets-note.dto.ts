import * as yup from "yup";

export const getNoteSchema = yup.object().shape({
  lastId: yup.number().optional(),
  search: yup.string().optional(),
  reminder_date: yup.string().optional(),
  isArchived: yup.boolean().optional(),
  isToday: yup.boolean().optional(),
  hideArchived: yup.boolean().optional(),
});

export type GetNoteSchemaType = yup.InferType<typeof getNoteSchema>;
