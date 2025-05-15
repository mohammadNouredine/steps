"use client";
import { ZAYTOONAPHONE } from "@/common/constants/brand";
import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { DotLottiePlayer } from "@dotlottie/react-player";
function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-4 lg:py-10">
      <div className="w-96">
        <DotLottiePlayer
          src="/lotties/reading.lottie"
          autoplay
          loop
        ></DotLottiePlayer>
      </div>
      <h1 className="text-3xl lg:text-5xl">هذه الصفحة هي قيد الانشاء</h1>
      <p className="lg:mt-4">يمكنكم التواصل معنا </p>

      <a
        href={`https://wa.me/+961${ZAYTOONAPHONE}`}
        target="_blank"
        rel="noreferrer"
        className="bg-primary px-10 mt-4 py-3 rounded-full text-white w-full lg:w-auto flex gap-x-2 items-center justify-center"
      >
        <FaWhatsapp />
        {ZAYTOONAPHONE}
      </a>
    </div>
  );
}

export default UnderConstruction;
