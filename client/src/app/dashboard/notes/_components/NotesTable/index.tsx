import { useGetNotesInfinite } from "@/app/dashboard/api-hookts/notes/useGetNotes";
import React, { useEffect, useRef } from "react";
import AddEditNoteModal from "../AddEditNoteModal";
import SingleNoteCard from "./SingleNoteCard";
import { useInView } from "@/hooks/useInView";
import LoadingAndObservable from "@/components/common/LoadingAndObservable";
import LoadingCard from "./LoadingCard";

function NotesTable({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { notes, loadMore, hasNextPage, isFetchingNextPage, isFetching } =
    useGetNotesInfinite({
      params: {},
    });

  const bottomRef = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useInView(bottomRef, {
    threshold: 1,
    rootMargin: "150px",
  });
  useEffect(() => {
    if (isIntersecting && !isFetching) {
      loadMore();
    }
  }, [isIntersecting, loadMore, isFetching]);

  const { notes: todayNotes } = useGetNotesInfinite({
    params: {
      isToday: true,
      hideArchived: true,
    },
  });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {todayNotes?.map((note) => (
        <SingleNoteCard note={note} key={note.id} isToday={true} />
      ))}
      {notes?.map((note) => (
        <SingleNoteCard note={note} key={note.id} />
      ))}

      {isFetching &&
        Array(6)
          .fill(0)
          .map((_, index) => (
            <div key={index}>
              <LoadingCard />
            </div>
          ))}

      <LoadingAndObservable
        ref={bottomRef}
        noMoreText=""
        loadMoreText="Scroll to load more products"
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
      <AddEditNoteModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default NotesTable;
