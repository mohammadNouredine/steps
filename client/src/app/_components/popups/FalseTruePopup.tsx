import Modal from "@/components/common/Modal";
import { cn } from "@/utils/cn";

export default function FalseTruePopup({
  isOpenModal,
  setIsOpenModal,
  onClick,
  truthMessage = "Yes, I'm sure",
  falseMessage = "No, Cancel",
  title,
  subtitle,
  messageTone,
}: {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
  truthMessage?: string;
  falseMessage?: string;
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
    <Modal
      setIsOpen={setIsOpenModal}
      isOpen={isOpenModal}
      title={title}
      maxWidth="max-w-md"
      titleColor={titleColor}
      minHeight="min-h-[30%]"
    >
      <p className={cn("font-normal", subtitleColor)}>{subtitle}</p>
      <div className="grid grid-cols-2 gap-x-2 mt-5">
        <button
          className="border border-1 rounded-lg border-red-400 text-red-400 py-3"
          onClick={() => setIsOpenModal(false)}
        >
          {falseMessage}
        </button>
        <button
          onClick={() => onClick()}
          className=" bg-primary rounded-lg text-white"
        >
          {truthMessage}
        </button>
      </div>
    </Modal>
  );
}
