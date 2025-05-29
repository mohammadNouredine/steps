import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export const useCreateAttendance = ({
  callBackOnSuccess,
}: {
  callBackOnSuccess?: () => void;
}) => {
  return usePostData<CreateAttendanceType>({
    queryKeysToInvalidate: [["attendance"], ["kids"]],
    endpoint: DASHBOARD_ENDPOINTS.CREATE_ATTENDANCE,
    callBackOnSuccess,
  });
};

export type CreateAttendanceType = {
  kidId: number;
  date: Date;
  extraCharge?: number;
  note?: string;
};
