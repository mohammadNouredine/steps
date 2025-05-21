import { usePostData } from "@/api/api-service/usePostData";

export const useToggleAttendance = () => {
  return usePostData<ToggleAttendanceType>({
    queryKeysToInvalidate: [["attendance"], ["kids"]],
    endpoint: "/api/attendance/toggle",
  });
};

export type ToggleAttendanceType = {
  kidId: number;
  date: string; //format: YYYY-MM-DD
};
