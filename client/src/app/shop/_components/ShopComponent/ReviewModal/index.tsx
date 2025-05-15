import Modal from "@/components/common/Modal";
import ReviewSection from "@/components/common/ReviewSection";
import { useQueryStrings } from "@/hooks/useQueryStrings";
import { useCheckoutStore } from "@/store/cart/useCheckoutStore";
import React, { useEffect } from "react";

function ReviewModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { prevQueries, resetAllQueries } = useQueryStrings();
  const { lastReviewDate, isRehydrated, setRehydrated } = useCheckoutStore();

  useEffect(() => {
    setRehydrated(true);
    if (!isRehydrated) return;
    const currentTime = new Date().getTime();
    const lastReviewTime =
      (lastReviewDate && new Date(lastReviewDate).getTime()) || 0;
    const timeDiff = Math.abs(currentTime - lastReviewTime);

    if (
      prevQueries.review &&
      (!lastReviewDate || timeDiff > 24 * 60 * 60 * 1000 * 30)
    ) {
      setIsOpen(true);
    }
  }, [lastReviewDate, prevQueries.review, isRehydrated]); // Added dependencies

  const onSuccess = () => {
    setIsOpen(false);
  };
  return (
    <Modal
      onClose={() => {
        resetAllQueries();
      }}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      minHeight="min-h-[40vh]"
    >
      <ReviewSection onSuccess={onSuccess} type="website" />
    </Modal>
  );
}

export default ReviewModal;
