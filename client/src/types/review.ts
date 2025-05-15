export type CustomerReview = {
  id: number;
  name?: string;
  description?: string;
  type: "website" | "products";
  review_amount: number;
  createdAt: string;
};

export type ReviewsSummary = {
  average: number;
  total: number;
  average_product: number;
  total_product: number;
  zero_to_one: number;
  one_to_two: number;
  two_to_three: number;
  three_to_four: number;
  four_to_five: number;
};
