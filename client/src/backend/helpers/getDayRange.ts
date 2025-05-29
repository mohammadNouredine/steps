function getDayRange(dateString: string) {
  const date = new Date(dateString);
  const startOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const startOfNextDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  );
  return { startOfDay, startOfNextDay };
}

export function getDayRangeFromDate(date: Date) {
  const startOfDay = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const startOfNextDay = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1)
  );

  return { startOfDay, startOfNextDay };
}

export default getDayRange;
