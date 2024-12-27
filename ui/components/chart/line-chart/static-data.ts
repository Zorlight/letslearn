const getLast6Months = () => {
  const currentMonth = new Date().getMonth();
  return Array.from({ length: 6 }, (_, index) => {
    const month = currentMonth - index;
    return month < 0 ? month + 12 : month;
  }).sort((a, b) => a - b);
};

const monthNames = [
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
