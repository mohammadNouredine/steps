import { cn } from "@/utils/cn";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { motion } from "framer-motion";
import React, { Fragment } from "react";

function CenteredModal({
  children,
  isOpenModal,
  setIsOpenModal,
  title,
  maxWidth = "max-w-xl",
  minHeight = "min-h-0",
  titleCenter = false,
  onClose,
  titleColor = "text-gray-900",
}: {
  children: React.ReactNode;
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  maxWidth?: string;
  minHeight?: string;
  titleCenter?: boolean;
  onClose?: () => void;
  titleColor?: string;
}) {
  return (
    <Transition appear show={isOpenModal} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => {
          setIsOpenModal(false);
          onClose && onClose();
        }}
        className="relative z-50"
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center w-full">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-100 -translate-y-4"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-100 translate-y-4"
            >
              <DialogPanel
                className={cn(
                  "w-full flex flex-col max-h-[90vh] overflow-y-auto custom-scrollbar-container  transform  rounded-lg  bg-white  text-left align-middle shadow-xl transition-all ease-in-out duration-300",
                  maxWidth,
                  minHeight
                )}
              >
                {title && (
                  <DialogTitle
                    as="h3"
                    className={cn(
                      "text-base text-gray-800 font-medium leading-6  mb-4 bg-gray-100 px-6 py-4 border-b border-gray-200",
                      titleCenter && "text-center",
                      titleColor
                    )}
                  >
                    {title}
                  </DialogTitle>
                )}
                <motion.div
                  layout="position"
                  className="flex-grow flex flex-col justify-between pb-6 px-6 pt-3"
                >
                  {children}
                </motion.div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

const ModalHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-4 ">{children}</div>;
};

const ModalBody = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-4 flex-grow flex flex-col ">{children}</div>;
};

const ModalFooter = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-4">{children}</div>;
};

CenteredModal.Header = ModalHeader;
CenteredModal.Body = ModalBody;
CenteredModal.Footer = ModalFooter;
export default CenteredModal;
