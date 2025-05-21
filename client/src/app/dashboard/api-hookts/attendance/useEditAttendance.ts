import { CreateAttendanceType } from "./useCreateAttendance";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";

export const useEditAttendance = ({
  callBackOnSuccess,
}: {
  callBackOnSuccess?: () => void;
}) => {
  return useUpdateData<EditAttendanceType>({
    queryKeysToInvalidate: [["attendance"], ["kids"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_ATTENDANCE,
    callBackOnSuccess,
  });
};

export type EditAttendanceType = CreateAttendanceType;
