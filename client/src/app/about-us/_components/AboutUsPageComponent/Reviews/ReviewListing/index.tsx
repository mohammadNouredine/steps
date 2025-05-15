import { useGetAllReviews } from "@/api/api-hooks/review/useGetAllReviews";
import React from "react";
import SingleReviewRow from "./SingleReviewRow";
import RatingSummary from "./RatingSummary";
import RatingHero from "./RatingHero";

function ReviewListing() {
  const { data: reviews } = useGetAllReviews();
  const filteredReviews = reviews?.filter((review) => {
    const shouldAppear = review.description && review.description.length > 0;
    return shouldAppear;
  });
  return (
    <div>
      <RatingHero />
      <RatingSummary />
      {filteredReviews?.map((review, indx) => {
        return (
          <div key={review.id}>
            <SingleReviewRow key={review.id} review={review} />
            {indx !== filteredReviews.length - 1 && <hr className="my-4" />}
          </div>
        );
      })}
    </div>
  );
}

export default ReviewListing;
