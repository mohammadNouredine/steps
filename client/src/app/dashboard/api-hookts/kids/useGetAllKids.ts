import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { Attendance, Kid, SubscriptionPlan } from "@prisma/client";

export function useGetAllKids() {
  return useReadData<GetAllKidsResponse>({
    queryKey: ["kids"],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_KIDS,
  });
}

type GetAllKidsResponse = {
  data: KidType[];
};
export type KidType = Kid & {
  attendances: Attendance[];
  hasAttendedToday: boolean;
  subscriptionPlan: SubscriptionPlan;
};
