import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { ToggleAttendeeDto } from "@/app/api/attendance/_dto/mutate-attendee.dto";

export const useToggleAttendance = () => {
  return usePostData<ToggleAttendeeDto>({
    queryKeysToInvalidate: [["attendance"], ["kids"]],
    endpoint: DASHBOARD_ENDPOINTS.TOGGLE_ATTENDANCE,
  });
};
