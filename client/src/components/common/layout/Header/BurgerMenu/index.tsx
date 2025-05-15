"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface BurgerMenuProps {
  isOpen: boolean;
}

const topVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 8 },
};

const middleVariants = {
  closed: { opacity: 1 },
  open: { opacity: 0 },
};

const bottomVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -8 },
};

function BurgerMenu({ isOpen }: BurgerMenuProps) {
  return (
    <div className="flex flex-col justify-center items-center space-y-1">
      <motion.div
        className="h-[3px] w-5 bg-gray-500 rounded-full"
        animate={isOpen ? "open" : "closed"}
        variants={topVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.div
        className="h-[3px] w-6 bg-gray-500 rounded-full"
        animate={isOpen ? "open" : "closed"}
        variants={middleVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.div
        className={cn(
          "h-[3px]  bg-gray-500 rounded-full",
          isOpen ? "w-5" : "w-4"
        )}
        animate={isOpen ? "open" : "closed"}
        variants={bottomVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </div>
  );
}

export default BurgerMenu;
