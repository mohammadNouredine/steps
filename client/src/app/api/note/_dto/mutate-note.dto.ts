import * as yup from "yup";

export const addNoteSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().optional(),
  reminder_date: yup.date().optional(),
  isArchived: yup.boolean().optional(),
});

export type AddNoteSchemaType = yup.InferType<typeof addNoteSchema>;

export const editNoteSchema = addNoteSchema.concat(
  yup.object().shape({
    id: yup.number().required(),
  })
);

export type EditNoteSchemaType = yup.InferType<typeof editNoteSchema>;
