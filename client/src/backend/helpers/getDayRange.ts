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
export default getDayRange;
