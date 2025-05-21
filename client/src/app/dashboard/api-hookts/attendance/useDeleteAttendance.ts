import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export const useDeleteAttendance = () => {
  return useDeleteData<{
    attendanceId: number;
  }>({
    queryKeysToInvalidate: [["attendance"], ["kids"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_ATTENDANCE,
  });
};
