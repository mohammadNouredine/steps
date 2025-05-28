import CardContainer from "@/app/dashboard/_common/components/CardContainer";
import { DashboardNote } from "@/app/dashboard/_common/types/Notes";
import IconButton from "@/components/common/ui/IconButton";
import React from "react";
import { FaArchive, FaEdit } from "react-icons/fa";
import AddEditNoteModal from "../../AddEditNoteModal";
import { useEditNote } from "@/app/dashboard/api-hookts/notes/useEditNote";
import PulsingCircle from "@/components/common/ui/animation/PulsingCircle";
import { cn } from "@/utils/cn";

import { formatDateTime } from "@/helpers/formatDate";
import { FaTrash } from "react-icons/fa6";
import FalseTruePopup from "@/app/dashboard/_common/components/Popups/FalseTruePopup";
import { useDeleteNote } from "@/app/dashboard/api-hookts/notes/useDeleteNote";

function SingleNoteCard({
  note,
  isToday,
}: {
  note: DashboardNote;
  isToday?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenDelete, setIsOpenDelete] = React.useState(false);
  const { mutate: editNote, isPending } = useEditNote({
    callBackOnSuccess: () => {
      setIsOpen(false);
    },
  });
  const { mutate: deleteNote } = useDeleteNote({
    id: note.id,
    callBackOnSuccess: () => {
      setIsOpenDelete(false);
    },
  });
  return (
    <CardContainer className={cn(isToday ? "border-primary" : "", "relative")}>
      <div>
        {isToday && (
          <div className=" absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2">
            <PulsingCircle />
          </div>
        )}
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">{note.title}</h3>
          <div className="flex gap-2">
            <IconButton
              Icon={FaTrash}
              style={"red"}
              onClick={() => setIsOpenDelete(true)}
            />

            <IconButton
              Icon={FaEdit}
              style={"green"}
              onClick={() => setIsOpen(true)}
            />
            <IconButton
              Icon={FaArchive}
              disabled={isPending}
              style={note.isArchived ? "yellow" : "lightGray"}
              onClick={() => {
                editNote({
                  ...note,
                  description: note.description || "",
                  isArchived: !note.isArchived,
                });
              }}
            />
          </div>
        </div>
        <p className="text-sm text-gray-500">{note.description}</p>
        {note.reminderDate && (
          <p className="text-sm">{formatDateTime(note.reminderDate)}</p>
        )}
        {note.reminderDate && (
          <p className="text-sm">
            {new Date(note.reminderDate).toLocaleTimeString()}
            <br></br>
            {String(note.reminderDate)}
          </p>
        )}

        <AddEditNoteModal isOpen={isOpen} setIsOpen={setIsOpen} note={note} />
        <FalseTruePopup
          onClick={() => {
            deleteNote({});
          }}
          isOpenModal={isOpenDelete}
          setIsOpenModal={setIsOpenDelete}
          title="Delete Note"
          subtitle="Are you sure you want to delete this note?"
          truthMessage="Delete"
        />
      </div>
    </CardContainer>
  );
}

export default SingleNoteCard;
