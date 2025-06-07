"use client";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./Gallery.css";

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
    // Determine size based on index to create an interesting pattern
    const isLarge = i % 5 === 0;
    const isMedium = i % 3 === 0;

    return {
      src: `/home/gallery/${i + 1}.jpg`,
      alt: "أنشطة النّادي الصيفي STEPS",
      width: isLarge ? 800 : isMedium ? 600 : 400,
      height: isLarge ? 600 : isMedium ? 450 : 300,
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
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-brand-green/10 to-brand-yellow/10">
      <h2 className="text-3xl font-bold text-center mb-8">معرض الصور</h2>
      <div className="gallery-container">
        <div className="gallery">
          {images.map((image, idx) => (
            <div
              key={idx}
              className="gallery__item"
              style={{
                gridColumn: `span ${Math.ceil(image.width / 200)}`,
                gridRow: `span ${Math.ceil(image.height / 200)}`,
              }}
              onClick={() => setIndex(idx)}
            >
              <img src={image.src} alt={image.alt} />
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
