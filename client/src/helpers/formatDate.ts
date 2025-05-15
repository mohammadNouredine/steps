import dayjs from "dayjs";

export function formatDateString(dateString: string): string {
  const date = dayjs(dateString);
  const dayOfWeek = date.format("ddd");
  const dayOfMonth = date.format("D");
  const year = date.format("YYYY");

  return `${dayOfWeek}, ${dayOfMonth}, ${year}`;
}
