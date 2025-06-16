"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import BurgerMenu from "@/components/common/layout/Header/BurgerMenu";
import { useGetNavItems } from "../../hooks/useGetNavItems";
import { useMenuStore } from "@/store/dashboardStore/useMenuStore";
import { Tooltip, Whisper } from "rsuite";

// Variants for the mobile "curtain" transition from left to right
const mobileVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: "0%",
    opacity: 1,
    transition: { duration: 0.1, ease: "easeInOut" },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

// Variants for the desktop sidebar width animation
const desktopVariants = {
  collapsed: {
    width: "80px",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  expanded: {
    width: "200px",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

// Variants for the navigation item text animation
const textVariants = {
  open: {
    opacity: 1,
    width: "auto",
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  closed: {
    opacity: 0,
    width: 0,
    transition: { duration: 0.1, ease: "easeInOut" },
  },
};

function NavContent() {
  const DASHBOARD_NAV_ITEMS = useGetNavItems();
  const pathname = usePathname();
  const { isOpen } = useMenuStore();

  return (
    <>
      <button
        className="pl-5  lg:pl-0"
        onClick={() => {
          // Toggle menu open/close state
          useMenuStore.getState().setIsOpen(!isOpen);
        }}
      >
        <BurgerMenu isOpen={isOpen} />
      </button>
      <div className={cn("flex flex-col gap-4 mt-4")}>
        {DASHBOARD_NAV_ITEMS.map((item) => {
          const pathArray = pathname.split("/");
          const lastPath = pathArray[pathArray.length - 1];
          const itemRefArray = item.href.split("/");
          const lastItemRef = itemRefArray[itemRefArray.length - 1];
          const isActive = lastPath === lastItemRef;

          return (
            <Whisper
              key={item.href}
              placement="auto"
              trigger="hover"
              speaker={<Tooltip>{item.toolTip}</Tooltip>}
              className="w-full"
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg py-2 pl-5 pr-4 text-sm font-medium hover:no-underline active:!no-underline border transition-all",
                  isActive
                    ? "bg-primary/10 text-primary border-primary/40"
                    : "hover:bg-gray-100 border-transparent"
                )}
              >
                <item.icon
                  className={cn(
                    "text-lg",
                    isActive ? "text-primary" : "text-gray-500"
                  )}
                />
                <motion.span
                  variants={textVariants}
                  initial={isOpen ? "open" : "closed"}
                  animate={isOpen ? "open" : "closed"}
                  className="overflow-hidden whitespace-nowrap"
                >
                  {item.name}
                </motion.span>
              </Link>
            </Whisper>
          );
        })}
      </div>
    </>
  );
}

function SideNav() {
  const { isOpen, setIsOpen } = useMenuStore();

  return (
    <div>
      {/* Mobile SideNav with Left-to-Right Curtain Transition */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "px-4 py-4 space-y-4 border-r border-gray-200 bg-white transition-all min-h-full fixed z-[1000] lg:hidden"
            )}
          >
            <NavContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop SideNav with width animation */}
      <motion.div
        variants={desktopVariants}
        animate={isOpen ? "expanded" : "collapsed"}
        className={cn(
          "px-4 py-4 space-y-4 border-r border-gray-200 bg-white transition-all min-h-full hidden lg:flex flex-col items-center"
        )}
      >
        <NavContent />
      </motion.div>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "inset-0 bg-black/50 backdrop-blur-sm fixed lg:hidden z-[999]"
            )}
            onClick={() => {
              setIsOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default SideNav;
