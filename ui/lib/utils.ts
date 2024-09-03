import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

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

export {
  cn,
  getPublicIdFromCloudinaryUrl,
  getFileSize,
  formatDate,
  displayNumber,
  handleFilterColumn,
};
