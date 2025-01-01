export const getLast6Months = (fromDate?: Date) => {
  const currentMonth = fromDate ? fromDate.getMonth() : new Date().getMonth();
  return Array.from({ length: 6 }, (_, index) => {
    const month = currentMonth - index;
    return month < 0 ? month + 12 : month;
  }).sort((a, b) => a - b);
};

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const handleGetDefaultLineChartData = () => {
  const last6Months = getLast6Months();
  return last6Months.map((month) => ({
    name: monthNames[month],
    value: 0,
  }));
};

export const defaultLineChartData = handleGetDefaultLineChartData();
