import { useGetReviewsSummary } from "@/api/api-hooks/review/useGetReviewsSummary";
import MyRater from "@/components/common/ui/MyRater";
import React from "react";
import { Progress } from "rsuite";

function RatingSummary() {
  const { data: summary } = useGetReviewsSummary();
  const {
    average_product,
    total_product,
    zero_to_one,
    one_to_two,
    two_to_three,
    three_to_four,
    four_to_five,
  } = summary || {};

  const percZeroToOne = ((zero_to_one || 0) / (total_product || 0)) * 100;
  const percOneToTwo = ((one_to_two || 0) / (total_product || 0)) * 100;
  const percTwoToThree = ((two_to_three || 0) / (total_product || 0)) * 100;
  const percThreeToFour = ((three_to_four || 0) / (total_product || 0)) * 100;
  const percFourToFive = ((four_to_five || 0) / (total_product || 0)) * 100;

  return (
    <div className="flex gap-x-4 mt-4">
      <div>
        <h3 className="text-7xl rs-text-semibold">
          {average_product?.toFixed(1) || "0.0"}
        </h3>
        <MyRater rating={average_product || 0} starSize={14} isDisabled />
        <p className="text-lg text-gray-600">{total_product}</p>
      </div>
      <div className="flex-grow">
        <ProgressComp progress={percZeroToOne} count={zero_to_one || 0} />
        <ProgressComp progress={percOneToTwo} count={one_to_two || 0} />
        <ProgressComp progress={percTwoToThree} count={two_to_three || 0} />
        <ProgressComp progress={percThreeToFour} count={three_to_four || 0} />
        <ProgressComp progress={percFourToFive} count={four_to_five || 0} />
      </div>
    </div>
  );
}

export default RatingSummary;

const ProgressComp = ({
  progress,
  count,
}: {
  progress: number;
  count: number;
}) => {
  return (
    <div className="flex items-center">
      <p>{count}</p>
      <Progress.Line percent={progress} showInfo={false} />
    </div>
  );
};
