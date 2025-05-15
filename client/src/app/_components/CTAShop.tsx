import Image from "next/image";
import Link from "next/link";
import React from "react";

function CTAShop() {
  return (
    <div className="w-full  rounded-xl py-4 px-4 bg-lightBlue mt-20 space-y-4 relative ">
      <h1 className="text-gray-700">متجر زيتونة</h1>
      <p className="text-gray-500 text-lg !mt-0">ما يحتاجه طفلكِ في مكتبة</p>
      <div className="mt-4">
        <Link
          href={"/shop"}
          className="bg-blue text-base  font-medium  px-10 py-2 text-white rounded-full "
        >
          تصفّح الان
        </Link>
      </div>
      <Image
        className="h-[130%] w-auto absolute bottom-0 left-2 "
        src="/images/kid-reading-sitting.png"
        alt="Zaytoona"
        width={1000}
        height={1000}
      />
    </div>
  );
}

export default CTAShop;
