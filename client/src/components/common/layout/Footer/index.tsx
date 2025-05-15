"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdContactPage, MdOutlineContactPage } from "react-icons/md";
import {
  RiShoppingBag4Line,
  RiShoppingBag4Fill,
  RiHomeSmileFill,
  RiHomeSmileLine,
  RiSearchFill,
} from "react-icons/ri";
import {} from "react-icons/ri";

function Footer() {
  //check the active item from  the url
  const [activeItem, setActiveItem] = React.useState(footerItems[0]);
  const pathname = usePathname();

  React.useEffect(() => {
    const activeItem = footerItems.find((item) => item.href === pathname);
    if (activeItem) {
      setActiveItem(activeItem);
    }
  }, [pathname]);

  return (
    <div className="fixed bottom-0 z-10 w-full bg-white shadow-[0_0_2px_0_rgba(0,0,0,.1)] py-4 px-2">
      <div className="flex justify-around w-full items-center">
        {footerItems.map((item, index) => {
          const isActive = activeItem.value === item.value;
          return (
            <Link
              href={item.href}
              key={index}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div
                className={`${isActive ? "text-primary" : "text-gray-500"}
              } text-2xl`}
              >
                {isActive ? item.iconActive : item.icon}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Footer;

const footerItems = [
  {
    name: "Home",
    value: "home",
    href: "/",
    icon: <RiHomeSmileLine />,
    iconActive: <RiHomeSmileFill />,
  },
  {
    name: "Shop",
    value: "shop",
    href: "/shop",
    icon: <RiShoppingBag4Line />,
    iconActive: <RiShoppingBag4Fill />,
  },
  {
    name: "Cart",
    value: "cart",
    href: "/cart",
    icon: (
      <svg
        style={{
          width: 30,
          height: 30,
        }}
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 8H17.1597C18.1999 8 19.0664 8.79732 19.1528 9.83391L19.8195 17.8339C19.9167 18.9999 18.9965 20 17.8264 20H6.1736C5.00352 20 4.08334 18.9999 4.18051 17.8339L4.84718 9.83391C4.93356 8.79732 5.80009 8 6.84027 8H8M16 8H8M16 8L16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7L8 8M16 8L16 12M8 8L8 12"
          className="stroke-gray-500"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    iconActive: <RiSearchFill />,
  },
  {
    name: "about",
    value: "about",
    href: "/about-us",
    icon: <MdOutlineContactPage />,
    iconActive: <MdContactPage />,
  },
];
