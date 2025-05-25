import CardContainer from "@/app/dashboard/_common/components/CardContainer";
import { DashboardNote } from "@/app/dashboard/_common/types/Notes";
import IconButton from "@/components/common/ui/IconButton";
import dayjs from "dayjs";
import React from "react";
import { FaArchive, FaEdit } from "react-icons/fa";
import AddEditNoteModal from "../../AddEditNoteModal";
import { useEditNote } from "@/app/dashboard/api-hookts/notes/useEditNote";
import PulsingCircle from "@/components/common/ui/animation/PulsingCircle";
import { cn } from "@/utils/cn";

function SingleNoteCard({
  note,
  isToday,
}: {
  note: DashboardNote;
  isToday?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { mutate: editNote, isPending } = useEditNote({
    callBackOnSuccess: () => {
      setIsOpen(false);
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
        <p className="text-sm">
          {note.reminderDate
            ? dayjs(note.reminderDate).format("DD/MM/YYYY HH:mm:ss")
            : ""}
        </p>
        <AddEditNoteModal isOpen={isOpen} setIsOpen={setIsOpen} note={note} />
      </div>
    </CardContainer>
  );
}

export default SingleNoteCard;
