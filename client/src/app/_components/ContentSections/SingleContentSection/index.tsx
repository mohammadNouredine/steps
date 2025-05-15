import SquareVerticalItem from "@/components/common/products/SquareVerticalItem";
import { CustomerContentSection } from "@/types/content";
import Link from "next/link";
import React from "react";
import ImageCarousel from "../../../../components/common/carousels/ImageCarousel";

function SingleContentSection({
  section,
}: {
  section: CustomerContentSection;
}) {
  return (
    <div>
      {section.collection.media.length > 0 && (
        <ImageCarousel
          images={section.collection.media}
          isPadded={section.collection.mediaType === "padded"}
        />
      )}
      <div className="px-2">
        <div className="flex justify-between items-center">
          <Link
            className="text-sm text-primary"
            href={`/collections/${section.collectionId}`}
          >
            {section.collection.sectionAction}
          </Link>
          <h2 className="text-lg text-neutral-700">
            {section.collection.sectionTitle}
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-x-2 mt-4">
          {section.collection?.products?.slice(0, 3).map((item, index) => (
            <div key={index} className="min-w-[50%]">
              <SquareVerticalItem partialItem={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SingleContentSection;
