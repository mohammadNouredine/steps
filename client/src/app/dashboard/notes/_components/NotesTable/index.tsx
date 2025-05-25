import { useGetNotesInfinite } from "@/app/dashboard/api-hookts/notes/useGetNotes";
import React from "react";
import AddEditNoteModal from "../AddEditNoteModal";
import SingleNoteCard from "./SingleNoteCard";

function NotesTable({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    notes,
    totalNotes,
    loadMore,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isPending,
  } = useGetNotesInfinite({
    params: {},
  });

  const { notes: todayNotes } = useGetNotesInfinite({
    params: {
      isToday: true,
      hideArchived: true,
    },
  });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {todayNotes.map((note) => (
        <SingleNoteCard note={note} key={note.id} isToday={true} />
      ))}
      {notes.map((note) => (
        <SingleNoteCard note={note} key={note.id} />
      ))}

      <AddEditNoteModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default NotesTable;
