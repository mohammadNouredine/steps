"use client";
import React, { useEffect } from "react";
import LightGallery from "lightgallery/react";

// Import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "./Gallery.css";

// Import plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
//@ts-ignore
import fjGallery from "flickr-justified-gallery";

interface Image {
  src: string;
  alt: string;
  subHtml: string;
  responsive: {
    breakpoint: number;
    width: number;
    height: number;
  }[];
  size: "small" | "medium" | "large";
}

function Gallery() {
  useEffect(() => {
    fjGallery(document.querySelectorAll(".gallery"), {
      itemSelector: ".gallery__item",
      rowHeight: 180,
      lastRow: "start",
      gutter: 2,
      rowHeightTolerance: 0.1,
      calculateItemsHeight: false,
    });
  }, []);

  // Generate array of image paths with different sizes
  const images: Image[] = Array.from({ length: 20 }, (_, i) => {
    // Determine size based on index to create an interesting pattern
    let size: "small" | "medium" | "large";
    if (i % 5 === 0) size = "large";
    else if (i % 3 === 0) size = "medium";
    else size = "small";

    return {
      src: `/home/gallery/${i + 1}.jpg`,
      alt: `أنشطة النّادي الصيفي STEPS`,
      subHtml: `<h4>أنشطة النّادي الصيفي</h4>`,
      responsive: [
        {
          breakpoint: 1024,
          width: size === "large" ? 1200 : size === "medium" ? 800 : 400,
          height: size === "large" ? 800 : size === "medium" ? 600 : 400,
        },
      ],
      size,
    };
  });

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-brand-green/10 to-brand-yellow/10">
      <h2 className="text-3xl font-bold text-center mb-8">معرض الصور</h2>
      <div className="gallery-container">
        <LightGallery
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          mode="lg-fade"
          pager={false}
          thumbnail={true}
          galleryId={"nature"}
          autoplayFirstVideo={false}
          elementClassNames={"gallery"}
          mobileSettings={{
            controls: false,
            showCloseIcon: false,
            download: false,
            rotate: false,
          }}
        >
          {images.map((image, idx) => (
            <a
              key={idx}
              data-lg-size="1600-2400"
              className={`gallery__item gallery__item--${image.size}`}
              data-src={image.src}
              data-sub-html={image.subHtml}
            >
              <img className="img-responsive" src={image.src} alt={image.alt} />
            </a>
          ))}
        </LightGallery>
      </div>
    </div>
  );
}

export default Gallery;
