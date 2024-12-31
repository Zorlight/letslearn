export const getTimeText = (time: string) => {
  if (!time || time === "") return "";
  const now = new Date();
  const timeStamp = new Date(time);
  const duration = Math.abs(
    Math.floor(now.getTime() / 1000) - Math.floor(timeStamp.getTime() / 1000)
  );

  if (duration < 60) return "Just now";
  if (duration < 3600) {
    const minute = Math.floor(duration / 60);
    return `${minute} ${minute > 1 ? "minutes" : "minute"} ago`;
  }
  if (duration < 86400) {
    const hour = Math.floor(duration / 3600);
    return `${hour} ${hour > 1 ? "hours" : "hour"} ago`;
  }
  if (duration < 2592000) {
    const day = Math.floor(duration / 86400);
    return `${day} ${day > 1 ? "days" : "day"} ago`;
  }
  if (duration < 31536000) {
    const month = Math.floor(duration / 2592000);
    return `${month} ${month > 1 ? "months" : "month"} ago`;
  }
  const year = Math.floor(duration / 31536000);
  return `${year} ${year > 1 ? "years" : "year"} ago`;
};
