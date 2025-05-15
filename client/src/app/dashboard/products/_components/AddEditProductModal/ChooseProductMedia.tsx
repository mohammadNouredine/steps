import { DashboardMedia } from "@/app/dashboard/_common/types/media";
import ChooseMediaModal from "@/app/dashboard/media/_components/ChooseMediaModal";
import { useFormikContext } from "formik";
import Image from "next/image";
import React from "react";

function ChooseProductMedia() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { values, setFieldValue } = useFormikContext<{
    media: DashboardMedia[];
  }>();
  return (
    <div>
      <div className="grid grid-cols-8 gap-4 ">
        {values.media?.map((media) => (
          <div key={media.id} className="">
            <Image
              width={500}
              height={500}
              src={media.url}
              alt={media.name}
              className="size-full object-cover rounded-xl shadow-[0_0_4px_0_rgba(0,0,0,.1)]"
            />
            <p>{media.name}</p>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
        className="border border-red-500 px-2 py-2 rounded-lg text-red-500 mt-8"
      >
        Edit Media
      </button>

      <ChooseMediaModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={(media) => {
          setFieldValue("media", media);
        }}
        alreadySelectedMedia={values.media}
      />
    </div>
  );
}

export default ChooseProductMedia;
