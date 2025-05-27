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

export function formatDateTime(date: Date) {
  if (!date) return null;

  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatDate(date: Date) {
  if (!date) return null;

  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
