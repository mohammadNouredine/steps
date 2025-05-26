import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { GetSubscriptionsSchemaType } from "@/app/api/subscription/_dto/get-subscriptions.dto";
import { DashboardSubscriptionType } from "../../_common/types/subscriptions";

export function useGetSubscriptions({
  params,
}: {
  params: GetSubscriptionsSchemaType;
}) {
  return useReadData<GetSubscriptionsResponse>({
    queryKey: ["subscriptions", JSON.stringify(params)],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_SUBSCRIPTIONS,
    params,
  });
}

type GetSubscriptionsResponse = {
  data: DashboardSubscriptionType[];
};
