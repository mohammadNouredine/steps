"use client";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./gallery.css";
// Import styles

// Import plugins

interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const generateImages = (): Image[] => {
  return Array.from({ length: 20 }, (_, i) => {
    // Create a more dynamic masonry layout with varying heights
    const height = Math.floor(Math.random() * (600 - 300) + 300); // Random height between 300-600px
    const width = Math.floor(Math.random() * (400 - 200) + 200); // Random width between 200-400px

    return {
      src: `/home/gallery/${i + 1}.jpg`,
      alt: "أنشطة النّادي الصيفي STEPS",
      width,
      height,
    };
  });
};

const Gallery: React.FC = () => {
  const [index, setIndex] = useState(-1);
  const images = generateImages();

  const slides = images.map((image) => ({
    src: image.src,
    alt: image.alt,
  }));

  return (
    <div className=" bg-gradient-to-b from-brand-green/10 to-brand-yellow/10">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8">معرض الصور</h2>
        <div className="masonry-grid">
          {images.map((image, index) => (
            <div
              onClick={() => setIndex(index)}
              key={image.src}
              className="masonry-item"
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-auto rounded-[2px] shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <Lightbox
          slides={slides}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Zoom, Thumbnails]}
          zoom={{
            maxZoomPixelRatio: 3,
            zoomInMultiplier: 2,
            doubleTapDelay: 300,
            doubleClickDelay: 300,
            doubleClickMaxStops: 2,
            keyboardMoveDistance: 50,
            wheelZoomDistanceFactor: 100,
            pinchZoomDistanceFactor: 100,
            scrollToZoom: true,
          }}
          thumbnails={{
            width: 120,
            height: 80,
            padding: 4,
            border: 2,
            borderRadius: 4,
            gap: 16,
            imageFit: "contain",
          }}
        />
      </div>
    </div>
  );
};

export default Gallery;
