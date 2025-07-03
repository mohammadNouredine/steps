import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export interface SendTelegramReportDto {
  date: Date;
  sendAttendance: boolean;
  sendLoans: boolean;
  sendPayments: boolean;
  sendPurchases: boolean;
}

export const useSendAttendanceToTelegram = () => {
  return usePostData<SendTelegramReportDto>({
    queryKeysToInvalidate: [], // No queries to invalidate
    endpoint: DASHBOARD_ENDPOINTS.SEND_ATTENDANCE_TO_TELEGRAM,
  });
};
