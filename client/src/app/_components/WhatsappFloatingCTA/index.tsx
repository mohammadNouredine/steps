import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { cn } from "@/utils/cn";
function WhatsappFloatingCTA() {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="sticky bottom-20 cursor-pointer px-2  z-10 pt-10   flex items-center justify-start overflow-x-clip">
      <div className="  bg-primary rounded-full relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full  -z-10">
          <div
            className={cn(
              "size-full bg-primary rounded-full",
              isActive && "animate-ping"
            )}
          />
        </div>
        {isActive && (
          <div className="absolute right-0  top-0 -translate-y-[132%]">
            <Bubble setIsActive={setIsActive} />
          </div>
        )}
        <a
          href="https://wa.me/96181265632"
          target="_blank"
          referrerPolicy="no-referrer"
          className="cursor-pointer"
        >
          <div className="p-3 bg-primary rounded-full ">
            <div className="absolute top0 right-0  top-0 rounded-full  z-10 bg-white p-1 flex items-center justify-center">
              <div className="size-2 rounded-full bg-green animate-pulse" />
            </div>
            <FaWhatsapp size={30} className="text-white" />
          </div>
        </a>
      </div>
    </div>
  );
}

export default WhatsappFloatingCTA;

const Bubble = ({
  setIsActive,
}: {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [text, setText] = useState("");
  const [startText, setStartText] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setStartText(true);
      setText("السلام عليكم");
    }, 3000);

    const textTimer2 = setTimeout(() => {
      setText("هل تريد المساعدة؟");
    }, 6000);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(textTimer2);
    };
  }, []);

  const typingAnimation = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const dotAnimation = (index: number) => {
    return {
      animate: {
        y: ["0%", "-20%", "0%"], // Moves the dot up and down
        transition: {
          delay: index * 0.4,
          duration: 0.6, // Duration of one cycle
          repeat: 2, // Repeat indefinitely
          ease: "easeInOut",
        },
      },
    };
  };
  const charAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0,
      },
    },
  };

  return (
    <motion.div
      key={text}
      variants={typingAnimation}
      initial="hidden"
      animate="visible"
      className="relative w-fit h-fit"
    >
      <div className="min-w-32 relative w-fit text-end text-nowrap bg-white p-3 min-h-12 rounded-lg shadow-[0_0_14px_0_rgba(0,0,0,.1)] z-10">
        {!startText && (
          <div className="absolute inset-0 flex gap-x-1 justify-end items-center px-3">
            {[...Array(3)].map((_, index) => (
              <motion.span
                key={index}
                className="block bg-gray-300 rounded-full w-2 h-2"
                variants={dotAnimation(index)}
                animate="animate"
              />
            ))}
          </div>
        )}
        {startText &&
          text.split("").map((char, index) => (
            <motion.span key={index} variants={charAnimation}>
              {char}
            </motion.span>
          ))}
      </div>

      <button
        onClick={() => {
          setIsActive(false);
        }}
        className="absolute z-10 p-0.5 top-0 -translate-y-1/2 bg-white right-0 rounded-full"
      >
        <IoClose size={20} />
      </button>
      <svg
        className="absolute bottom-0 translate-y-full right-5 w-4 h-fit"
        width="155"
        height="123"
        viewBox="0 0 155 123"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M87.8928 117C83.274 125 71.727 125 67.1082 117L-0.00877733 0.749986L155.01 0.75L87.8928 117Z"
          fill="#FFFFFF"
          className="shadow-[0_0_4px_0_rgba(0,0,0,.1)] border "
        />
      </svg>
    </motion.div>
  );
};
