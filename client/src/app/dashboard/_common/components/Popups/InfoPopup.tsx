import { cn } from "@/utils/cn";
import CenteredModal from "../../../../_components/popups/CenteredModal";

export default function InfoPopup({
  isOpenModal,
  setIsOpenModal,
  onClick,
  message = "Yes, I'm sure",
  title,
  subtitle,
  messageTone,
}: {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: () => void;
  message?: string;
  title: string;
  subtitle?: string;
  messageTone?: "success" | "danger" | "info";
}) {
  const titleColor = messageTone
    ? messageTone === "success"
      ? "text-green-500"
      : messageTone === "danger"
      ? "text-red-500"
      : "text-blue-500"
    : "text-gray-900";

  const subtitleColor = messageTone
    ? messageTone === "success"
      ? "text-gray-500"
      : messageTone === "danger"
      ? "text-red-300"
      : "text-gray-500"
    : "text-gray-900";

  return (
    <CenteredModal
      setIsOpenModal={setIsOpenModal}
      isOpenModal={isOpenModal}
      title={title}
      maxWidth="max-w-md"
      titleColor={titleColor}
    >
      <p className={cn("font-normal", subtitleColor)}>{subtitle}</p>

      <button
        onClick={() => onClick && onClick()}
        className=" primary-btn mt-5"
      >
        {message}
      </button>
    </CenteredModal>
  );
}
