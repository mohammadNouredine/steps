import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { Attendance, Kid } from "@prisma/client";

export function useGetAttendance(params: { date?: string; kidId?: number }) {
  return useReadData<GetAttendanceResponse>({
    queryKey: ["attendance", JSON.stringify(params)],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_ATTENDANCE,
    params,
  });
}
export type AttendanceType = Attendance & {
  kid: Kid;
};

type GetAttendanceResponse = {
  data: AttendanceType[];
};
