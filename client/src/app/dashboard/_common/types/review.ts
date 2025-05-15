export interface DashboardReview extends CreateDashboardReview {
  id: number;
}
export type CreateDashboardReview = {
  review_amount: number;
  type: ReviewType;
  name?: string;
  description?: string;
};
export type ReviewType = "website" | "products";
