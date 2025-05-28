import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import {
  withBodyValidation,
  withQueryValidation,
} from "@/backend/helpers/withValidation";
import { getNotes } from "./_service/getNotes.service";
import { getNoteSchema } from "./_dto/gets-note.dto";
import { addNote } from "./_service/addNote.service";
import { addNoteSchema, editNoteSchema } from "./_dto/mutate-note.dto";
import { editNote } from "./_service/editNote.service";
import { withAuth } from "@/backend/helpers/withAuth";

export const GET = withErrorHandling(
  withAuth(withQueryValidation(getNotes, getNoteSchema))
);

export const POST = withErrorHandling(
  withAuth(withBodyValidation(addNote, addNoteSchema))
);

export const PATCH = withErrorHandling(
  withAuth(withBodyValidation(editNote, editNoteSchema))
);
