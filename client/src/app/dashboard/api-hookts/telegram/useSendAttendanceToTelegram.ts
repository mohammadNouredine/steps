import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export interface SendAttendanceToTelegramDto {
  // Empty interface since we don't need to send any data
}

export const useSendAttendanceToTelegram = () => {
  return usePostData<SendAttendanceToTelegramDto>({
    queryKeysToInvalidate: [], // No queries to invalidate
    endpoint: DASHBOARD_ENDPOINTS.SEND_ATTENDANCE_TO_TELEGRAM,
  });
};
