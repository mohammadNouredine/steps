import ImageCarousel from "@/components/common/carousels/ImageCarousel";
import LayoutWrapper from "@/components/common/layout/LayoutWrapper";
import { Collection } from "@/types/collection";
import React from "react";
import CollectionProducts from "./CollectionProducts";

function SingleCollectionComponent({ collection }: { collection: Collection }) {
  return (
    <LayoutWrapper>
      <div>
        {collection.media && collection.media.length > 0 && (
          <ImageCarousel
            images={collection.media}
            isPadded={collection.mediaType === "padded"}
          />
        )}
        <h3 className="text-center text-2xl rs-text-semibold mt-4">
          {collection.sectionTitle}
        </h3>
        <p className="text-center text-gray-600">
          {collection.sectionSubtitle}
        </p>
        <CollectionProducts collectionId={collection.id} />
      </div>
    </LayoutWrapper>
  );
}

export default SingleCollectionComponent;
