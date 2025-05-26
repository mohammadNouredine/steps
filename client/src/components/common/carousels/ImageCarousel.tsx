"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";

export type CustomerMedia = {
  id: number;
  name: string;
  url: string;
};

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { cn } from "@/utils/cn";
function ImageCarousel({
  images,
  isPadded,
}: {
  images: CustomerMedia[];
  isPadded?: boolean;
}) {
  return (
    <div className={cn(isPadded && "px-2")}>
      <Swiper
        className={cn(isPadded && "rounded-lg")}
        modules={[Pagination, A11y, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {images?.map((image, index) => (
          <SwiperSlide className="" key={index}>
            <img src={image.url} alt={image.name} className="w-full" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default ImageCarousel;
