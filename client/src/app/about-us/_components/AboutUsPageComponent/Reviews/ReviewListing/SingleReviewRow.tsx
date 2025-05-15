import MyRater from "@/components/common/ui/MyRater";
import { CustomerReview } from "@/types/review";
import React from "react";
import { FaFaceGrin, FaFaceRollingEyes, FaFaceSmile } from "react-icons/fa6";

function SingleReviewRow({ review }: { review: CustomerReview }) {
  const { name, description, review_amount } = review;

  const Face =
    review_amount > 3.5
      ? FaFaceGrin
      : review_amount > 2.5
      ? FaFaceSmile
      : FaFaceRollingEyes;

  return (
    <div>
      <div className="flex gap-x-4 items-center justify-start">
        <div className="p-1.5 rounded-full bg-gray-100 flex items-center justify-center">
          <Face className="text-gray-400 text-4xl" />
        </div>
        <h3 className="text-3xl text-gray-600">{name ?? "مجهول"}</h3>
      </div>
      <MyRater isDisabled={true} rating={review_amount} starSize={30} />
      <p className="text-xl">{description}</p>
    </div>
  );
}

export default SingleReviewRow;
