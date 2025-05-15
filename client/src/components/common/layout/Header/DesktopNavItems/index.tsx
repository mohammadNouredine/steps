import Image from "next/image";
import Link from "next/link";
import React from "react";

function DesktopNavItems() {
  return (
    <div className="flex items-center gap-x-8">
      <Link href={"/"}>
        <Image
          src="/brand/images/logozaytoona.png"
          alt="Zaytoona Logo"
          width={100}
          height={100}
          className="w-32 "
        />
      </Link>
      <div className="flex gap-x-6 text-2xl ">
        {menuItems.map((item, index) => {
          return (
            <div key={index}>
              <Link
                key={index}
                href={item.href}
                className="text-gray-800 font-semibold"
              >
                {item.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DesktopNavItems;

export const menuItems = [
  {
    name: "المتجر",
    value: "shop",
    href: "/shop",
  },
  {
    name: "من نحن",
    value: "about",
    href: "/about-us",
  },
];
