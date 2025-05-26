import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const TIMEZONE = "Asia/Beirut";

function getDayRange(dateString: string) {
  // Parse the dateString **as Beirut time**
  const date = dayjs.tz(dateString, TIMEZONE);

  // Start of the day in Beirut TZ
  const startOfDay = date.startOf("day").toDate();

  // Start of the next day in Beirut TZ
  const startOfNextDay = date.add(1, "day").startOf("day").toDate();

  return {
    startOfDay,
    startOfNextDay,
  };
}

export default getDayRange;

export function transformDateFromUTCToTimezone(date: Date, timezone: string) {
  return dayjs(date).tz(timezone).format("YYYY-MM-DD HH:mm:ss");
}
