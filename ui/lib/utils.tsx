import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getPublicIdFromCloudinaryUrl = (url: string) => {
  //E.g: url = http://res.cloudinary.com/dggtc5ucv/image/upload/v1720082993/jlqkd6dqyx4mrbsqhe31.jpg
  // -> public_id = jlqkd6dqyx4mrbsqhe31
  const parts = url.split("/");
  const publicId = parts[parts.length - 1].split(".")[0];
  return publicId;
};

const getFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};
const getByteFromSize = (size: string) => {
  const [value, unit] = size.split(" ");
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const index = sizes.indexOf(unit);
  return parseFloat(value) * Math.pow(k, index);
};

type DateType = "date" | "datetime" | "time";
const formatDate = (date: Date, type: DateType = "date") => {
  const convertDate = new Date(date);
  if (!convertDate) return "";
  if (type === "date") return format(convertDate, "MM/dd/yyyy");
  if (type === "datetime") return format(convertDate, "MM/dd/yyyy hh:mm a");
  return format(convertDate, "hh:mm a");
};

const displayNumber = (
  number: number | null | undefined,
  unit: "%" | "$" | string = "",
  spaceBetweenNumAndUnit: boolean = false,
  maximumFractionDigits: number = 2
) => {
  if (!number || isNaN(number)) return "$0.00";

  const formattedNumber = (minDigits: number, maxDigits: number) =>
    number.toLocaleString("en-US", {
      minimumFractionDigits: minDigits,
      maximumFractionDigits: maxDigits,
      ...(unit === "$" && { style: "currency", currency: "USD" }),
    });

  const separator = spaceBetweenNumAndUnit ? " " : "";

  if (unit === "%") {
    const fractionDigits = number < 1000 ? 2 : 0;
    return `${formattedNumber(fractionDigits, fractionDigits)}${separator}%`;
  } else if (unit === "$") {
    return `${formattedNumber(0, maximumFractionDigits)}${separator}`;
  }

  return `${formattedNumber(0, maximumFractionDigits)}${separator}${unit}`;
};

function handleFilterColumn<T>(
  filterInput: string,
  col: string,
  listToFilter: Array<T>
): Array<T> {
  if (filterInput === "") return listToFilter;
  const filter = filterInput.toLowerCase();
  const filterList = listToFilter.filter((row) => {
    const value = row[col as keyof typeof row];
    if (value === null || value === undefined) return false;
    if (typeof value === "string") {
      if (!value.toLowerCase().includes(filter)) return false;
    }
    if (typeof value === "number") {
      if (!value.toString().includes(filter)) return false;
    }
    return true;
  });
  return filterList;
}

// 3680s -> 1 hour 1 minute 20 second
const getDurationText = (startTime: any, endTime: any) => {
  if (!startTime || !endTime) return 0;

  try {
    startTime = new Date(startTime);
    endTime = new Date(endTime);
  } catch (e) {
    return null;
  }

  const duration = Math.floor(endTime / 1000) - Math.floor(startTime / 1000);
  return getTimeStringByDuration(duration);
};

const getTimeStringByDuration = (duration: number) => {
  const years = Math.floor(duration / 31536000);
  const months = Math.floor(duration / 2628000);
  const days = Math.floor(duration / 86400);
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  // any value that is 0 will not be displayed
  const time = [
    years && `${years} ${years > 1 ? "years" : "year"}`,
    months && `${months} ${months > 1 ? "months" : "month"}`,
    days && `${days} ${days > 1 ? "days" : "day"}`,
    hours && `${hours} ${hours > 1 ? "hours" : "hour"}`,
    minutes && `${minutes} ${minutes > 1 ? "minutes" : "minute"}`,
    seconds && `${seconds} ${seconds > 1 ? "seconds" : "second"}`,
  ]
    .filter((value) => value)
    .join(" ");

  return time;
};

const getTextFromHtml = (html: string) => {
  if (DOMParser === undefined) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const scrollTo = (id: string, adjustTopPosition: number = 0) => {
  if (typeof window === undefined) return;
  const questionToScroll = document.getElementById(id);
  console.log("questionToScroll", questionToScroll);
  if (!questionToScroll) return;
  const topPositionOfQuestion = questionToScroll.offsetTop;
  console.log("topPositionOfQuestion", topPositionOfQuestion);

  // Scroll with adjustment for the navbar height
  window.scrollTo({
    top: topPositionOfQuestion + adjustTopPosition,
    behavior: "smooth",
  });
};

export {
  cn,
  displayNumber,
  formatDate,
  getFileSize,
  getByteFromSize,
  getPublicIdFromCloudinaryUrl,
  handleFilterColumn,
  getDurationText,
  getTimeStringByDuration,
  getTextFromHtml,
  scrollTo,
};
