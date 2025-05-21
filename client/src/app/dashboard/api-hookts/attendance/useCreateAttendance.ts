import { usePostData } from "@/api/api-service/usePostData";

export const useCreateAttendance = () => {
  return usePostData<CreateAttendanceType>({
    queryKeysToInvalidate: [["attendance"], ["kids"]],
    endpoint: "/api/attendance/toggle",
  });
};

export type CreateAttendanceType = {
  kidId: number;
  date: string; //format: YYYY-MM-DD
  extraCharge: number;
  note?: string;
};
