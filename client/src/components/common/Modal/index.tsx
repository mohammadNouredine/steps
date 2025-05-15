import { cn } from "@/utils/cn";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

export default function Modal({
  onClose,
  isOpen,
  setIsOpen,
  children,
  title,
  titleColor = "text-gray-900",
  maxWidth = "md:max-w-xl",
  minHeight = "min-h-[70%]",
}: {
  onClose?: () => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title?: string;
  titleColor?: string;
  maxWidth?: string;
  minHeight?: string;
}) {
  function close() {
    onClose?.();
    setIsOpen(false);
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && ( // Conditionally render based on isOpen
          <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none "
            onClose={close}
            dir="rtl"
          >
            <div className="fixed h-screen inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm bg-black/10">
              <motion.div
                initial={{ opacity: 0, y: 200 }} // Starts below the screen
                animate={{ opacity: 1, y: 0 }} // Translates up to its position
                exit={{ opacity: 0, y: 200 }} // Exits by translating down
                transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
                className="flex h-full items-end justify-center"
              >
                <DialogPanel
                  transition
                  className={cn(
                    "w-full overflow-y-scroll max-h-[90%] custom-scrollbar-container   rounded-xl  bg-white p-6 shadow-[0_0_4px_0_rgba(0,0,0,.1)] duration-300 ease-out flex flex-col",
                    maxWidth,
                    minHeight
                  )}
                >
                  <div className="flex items-center justify-between">
                    <DialogTitle
                      as="h3"
                      className={cn("text-base/7 font-medium ", titleColor)}
                    >
                      {title}
                    </DialogTitle>
                    <button onClick={close}>
                      <div className="bg-white shadow-[0_0_4px_0_rgba(0,0,0,.1)] p-2 rounded-full aspect-square">
                        <IoClose />
                      </div>
                    </button>
                  </div>
                  <div className="mt-2 flex-grow flex flex-col">{children}</div>
                </DialogPanel>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
