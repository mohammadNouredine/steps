import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export const useToggleAttendance = () => {
  return usePostData<ToggleAttendanceType>({
    queryKeysToInvalidate: [["attendance"], ["kids"]],
    endpoint: DASHBOARD_ENDPOINTS.TOGGLE_ATTENDANCE,
  });
};

export type ToggleAttendanceType = {
  kidId: number;
  date: string; //format: YYYY-MM-DD
};
