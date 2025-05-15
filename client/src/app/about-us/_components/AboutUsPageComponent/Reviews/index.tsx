"use client";
import ReviewSection from "@/components/common/ReviewSection";
import { useCheckoutStore } from "@/store/cart/useCheckoutStore";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import ReviewListing from "./ReviewListing";

function Reviews() {
  const { lastReviewDate } = useCheckoutStore();
  const currentTime = new Date().getTime();
  const lastReviewTime =
    (lastReviewDate && new Date(lastReviewDate).getTime()) || 0;
  const timeDiff = Math.abs(currentTime - lastReviewTime);
  const canReview = timeDiff > 24 * 60 * 60 * 1000 * 30;
  return (
    <div className="border px-2 py-4 rounded-md border-gray-300 my-8">
      <AnimatePresence>
        {canReview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <ReviewSection type="products" />
          </motion.div>
        )}
        <ReviewListing />
      </AnimatePresence>
    </div>
  );
}

export default Reviews;
