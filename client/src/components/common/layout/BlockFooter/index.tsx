import Image from "next/image";
import React from "react";
import { BiBook } from "react-icons/bi";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { TbEyeglass, TbMoodKid, TbTruckDelivery } from "react-icons/tb";
import { MdLocationPin } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

function BlockFooter() {
  return (
    <div className=" border-t  border-gray-300 flex flex-col items-start pt-4">
      <div className="flex px-2 gap-x-12 items-start justify-between w-full">
        <div className="flex-grow gap-x-2">
          <p className="text-2xl text-neutral-900 font-bold">مكتبة زيتونة</p>
          <ul className="font-semibold text-base text-gray-400">
            {about.map((item, index) => {
              return (
                <li
                  key={index}
                  className="flex items-center gap-x-2 w-fit text-nowrap"
                >
                  <item.icon size={20} />
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <Image
            src="/brand/images/logo.png"
            width={150}
            height={150}
            alt="Zaytoona"
            className="w-full h-auto grow-0"
          />
        </div>
      </div>

      <div className="px-2 w-full">
        <div className="border-t border-gray-100  pt-2">
          <div className="flex items-start gap-x-2">
            <MdLocationPin />
            <p>جنوب لبنان - عربصاليم - دوار اللبانة</p>
          </div>
          <div className="flex items-start gap-x-2">
            <TbTruckDelivery />
            <p>توصبل الى كافة المناطق داخل لبنان، و بعض دول الخارج.</p>
          </div>
          <div className="flex gap-x-2">
            <FaPhoneAlt /> <a href="tel:81748606">81748606</a>-
            <a href="tel:81265632">81265632</a>
          </div>
        </div>
      </div>

      <div className="flex items-center  gap-x-2 mt-4 px-2 ">
        {socials.map((item, index) => {
          return (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className=" text-primary p-2 rounded-full bg-primary/10"
            >
              <item.icon size={20} />
            </a>
          );
        })}
      </div>

      <div className="mt-4 bg-orange w-full pb-[70px] pt-2 px-2 flex flex-col text-center items-center justify-center">
        <p className="text-white">
          © 2021 - {new Date().getFullYear()} مكتبة زيتونة
        </p>
        <a
          className="text-white"
          href="https://wa.me/96176552423"
          target="_blank"
          rel="noreferrer"
        >
          تصميم و برمجة محمد نور الدين{" "}
        </a>
      </div>
    </div>
  );
}

export default BlockFooter;

const about = [
  {
    name: "قصص تربوية",
    icon: BiBook,
  },
  {
    name: "موسوعات علمية",
    icon: TbEyeglass,
  },
  {
    name: "بطاقات تعليمية للأطفال",
    icon: TbMoodKid,
  },
];

const socials = [
  {
    name: "facebook",
    href: "https://www.facebook.com/Zaytoona",
    icon: FaFacebook,
  },
  {
    name: "instagram",
    href: "https://www.instagram.com/zaytoona",
    icon: FaInstagram,
  },
];
