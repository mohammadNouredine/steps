import FalseTruePopup from "@/app/dashboard/_common/components/Popups/FalseTruePopup";
import { DashboardMedia } from "@/app/dashboard/_common/types/media";
import { useDeleteMedia } from "@/app/dashboard/api-hookts/media/useDeleteMedia";
import React from "react";
import { BiTrash } from "react-icons/bi";

function DeleteMedia({ media }: { media: DashboardMedia }) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);
  const { mutate: deleteMedia } = useDeleteMedia();

  return (
    <div>
      <button
        onClick={() => {
          setIsOpenDeleteModal(true);
        }}
        className="absolute top-2 right-2 bg-white px-2 py-2 rounded-lg text-red-500"
      >
        <BiTrash />
      </button>
      <FalseTruePopup
        isOpenModal={isOpenDeleteModal}
        setIsOpenModal={setIsOpenDeleteModal}
        title="Delete Media"
        onClick={() => {
          deleteMedia({
            additionalEndpoint: `${media.id}`,
          });
        }}
      />
    </div>
  );
}

export default DeleteMedia;
