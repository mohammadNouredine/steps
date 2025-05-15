"use client";
import React, { useEffect, useRef } from "react";
import AddMediaModal from "./AddMediaModal";
import { useGetAllMedia } from "@/app/dashboard/api-hookts/media/useGetAllMedia";
import Image from "next/image";
import DeleteMedia from "./DeleteMedia";
import { useInView } from "@/hooks/useInView";
import LoadingAndObservable from "@/components/common/LoadingAndObservable";

function MediaComponent() {
  const { media, loadMore, isFetching, isFetchingNextPage, hasNextPage } =
    useGetAllMedia();
  const [isOpen, setIsOpen] = React.useState(false);

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

  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="border border-red-500 px-2 py-2 rounded-lg text-red-500"
      >
        add media
      </button>
      <AddMediaModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="rounded-lg  border border-gray-400 w-full p-10 grid grid-cols-4 gap-4 mt-4">
        {media?.map((media) => (
          <div key={media.id} className=" flex flex-col">
            <div className="relative flex-grow">
              <Image
                width={500}
                height={500}
                src={media.url}
                alt={media.name}
                className="size-full object-cover rounded-xl shadow-[0_0_4px_0_rgba(0,0,0,.1)] "
              />
              <DeleteMedia media={media} />
            </div>
            <p>{media.name}</p>
          </div>
        ))}
      </div>
      <LoadingAndObservable
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        ref={bottomRef}
        noMoreText="No more media."
      />
    </div>
  );
}

export default MediaComponent;
