import React, { useEffect, useRef } from "react";
import CenteredModal from "@/app/_components/popups/CenteredModal";
import Image from "next/image";
import { useGetAllMedia } from "@/app/dashboard/api-hookts/media/useGetAllMedia";
import { DashboardMedia } from "@/app/dashboard/_common/types/media";
import { FaCheck } from "react-icons/fa6";
import { cn } from "@/utils/cn";
import { useInView } from "@/hooks/useInView";
import SearchInput from "@/components/fields/form/SearchInput";
import useDebounce from "@/hooks/useDebounce";

function ChooseMediaModal({
  isOpen,
  setIsOpen,
  onSubmit,
  alreadySelectedMedia,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (media: DashboardMedia[]) => void;
  alreadySelectedMedia: DashboardMedia[];
}) {
  //-------------------STATES -------------------------
  const [selectedMedia, setSelectedMedia] =
    React.useState<DashboardMedia[]>(alreadySelectedMedia);

  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  //------------------- READING INFINITE -------------------------
  const { media, loadMore, isFetching, isFetchingNextPage, hasNextPage } =
    useGetAllMedia({
      searchQuery: debouncedSearchQuery,
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

  //------------------- CONSTANTS -------------------------
  const flattenedSelectedMediaIds = selectedMedia?.map((media) => media.id);

  return (
    <CenteredModal
      maxWidth="max-w-3xl"
      title="Add Media"
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
    >
      <div>
        <SearchInput value={searchQuery} setValue={setSearchQuery} />
        <div className="grid grid-cols-4 gap-4 mt-4">
          {media?.map((media) => {
            const isSeleceted = !!flattenedSelectedMediaIds?.includes(media.id);
            return (
              <button
                type="button"
                onClick={() => {
                  setSelectedMedia(
                    isSeleceted
                      ? selectedMedia.filter((item) => item.id !== media.id)
                      : [...selectedMedia, media]
                  );
                }}
                key={media.id}
                className=""
              >
                <div
                  className={cn(
                    "relative size-full border-2 rounded-xl",
                    isSeleceted ? "border-green" : "border-transparent"
                  )}
                >
                  <Image
                    width={500}
                    height={500}
                    src={media.url}
                    alt={media.name}
                    className={cn(
                      "size-full object-cover rounded-xl shadow-[0_0_4px_0_rgba(0,0,0,.1)] "
                    )}
                  />
                  {isSeleceted && (
                    <div className="absolute top-2 right-2 text-white text-xl bg-green rounded-full p-0.5 ">
                      <FaCheck />
                    </div>
                  )}
                </div>
                <p>{media.name}</p>
              </button>
            );
          })}
        </div>
        {hasNextPage && (
          <button
            disabled={isFetchingNextPage}
            className="mt-8 text-primary border border-primary px-4 py-2 rounded-md w-full"
            type="button"
            onClick={() => {
              loadMore();
            }}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            if (selectedMedia) {
              onSubmit && onSubmit(selectedMedia);
            }
            setIsOpen(false);
          }}
          className="mt-8 bg-primary text-white px-4 py-2 rounded-md w-full"
        >
          Add
        </button>
      </div>
    </CenteredModal>
  );
}

export default ChooseMediaModal;
