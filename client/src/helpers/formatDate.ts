import dayjs from "dayjs";

export function formatDateString(dateString: string): string {
  const date = dayjs(dateString);
  const dayOfWeek = date.format("ddd");
  const dayOfMonth = date.format("D");
  const year = date.format("YYYY");

  return `${dayOfWeek}, ${dayOfMonth}, ${year}`;
}

export const formatDateToDashes = (date: Date): string => {
  return dayjs(date).format("YYYY-MM-DD");
};
