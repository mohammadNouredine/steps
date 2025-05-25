import CenteredModal from "@/app/_components/popups/CenteredModal";
import { DashboardNote } from "@/app/dashboard/_common/types/Notes";
import { useAddNote } from "@/app/dashboard/api-hookts/notes/useAddNote";
import { useEditNote } from "@/app/dashboard/api-hookts/notes/useEditNote";
import Button from "@/components/common/ui/Button";
import DateField from "@/components/fields/form/DateField";
import InputField from "@/components/fields/form/InputField";
import { Form, Formik } from "formik";
import React from "react";

function AddEditNoteModal({
  isOpen,
  setIsOpen,
  note,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  note?: DashboardNote;
}) {
  const { mutate: addNote, isPending: isAdding } = useAddNote({
    callBackOnSuccess: () => {
      setIsOpen(false);
    },
  });
  const { mutate: editNote, isPending: isEditing } = useEditNote({
    callBackOnSuccess: () => {
      setIsOpen(false);
    },
  });
  return (
    <CenteredModal
      title={note ? "Edit Note" : "Add Note"}
      isOpenModal={isOpen}
      maxWidth="max-w-2xl"
      setIsOpenModal={setIsOpen}
    >
      <div>
        <Formik
          initialValues={{
            title: note?.title || "",
            description: note?.description || "",
            reminder_date: note?.reminderDate || undefined,
          }}
          onSubmit={(values) => {
            if (note) {
              editNote({
                id: note.id,
                ...values,
              });
            } else {
              addNote(values);
            }
          }}
        >
          <Form>
            <div className="flex flex-col gap-4">
              <InputField label="Title" name="title" />
              <InputField label="Description" name="description" />
              <DateField showTime label="Reminder Date" name="reminder_date" />
            </div>

            <Button
              loadingText={isAdding || isEditing ? "Saving..." : "Save"}
              isLoading={isAdding || isEditing}
              disabled={isAdding || isEditing}
              buttonType="submit"
              type="button"
              text="Submit"
              className="mt-4"
            />
          </Form>
        </Formik>
      </div>
    </CenteredModal>
  );
}

export default AddEditNoteModal;
