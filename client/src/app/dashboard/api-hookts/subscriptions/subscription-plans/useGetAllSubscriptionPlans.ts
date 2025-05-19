import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../../dashboard-endpoints";
import { SubscriptionPlan } from "@prisma/client";

export function useGetAllSubscriptionPlans() {
  return useReadData<SubscriptionPlan[]>({
    queryKey: ["subscription-plans"],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_SUBSCRIPTION_PLANS,
  });
}
