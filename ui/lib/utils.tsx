import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { RefObject } from "react";
import { toast } from "react-toastify";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
  if (!startTime || !endTime) return "";

  try {
    startTime = new Date(startTime);
    endTime = new Date(endTime);
  } catch (e) {
    return "";
  }

  const duration = Math.abs(
    Math.floor(endTime / 1000) - Math.floor(startTime / 1000)
  );
  return getTimeStringByDuration(duration);
};

const getTimeStringByDuration = (duration: number) => {
  const years = Math.floor(duration / 31536000);
  duration -= years * 31536000;
  const months = Math.floor(duration / 2628000);
  duration -= months * 2628000;
  const days = Math.floor(duration / 86400);
  duration -= days * 86400;
  const hours = Math.floor(duration / 3600);
  duration -= hours * 3600;
  const minutes = Math.floor((duration % 3600) / 60);
  duration -= minutes * 60;
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

const resetFileInput = (ref: RefObject<HTMLInputElement>) => {
  //this function is used to reset input type="file" element easily
  if (!ref.current) {
    toast.error("Something went wrong");
    return;
  }
  ref.current.value = "";
};
const getFileInput = (ref: RefObject<HTMLInputElement>) => {
  //this function is used to get single file from input type="file" element easily
  if (!ref.current) {
    toast.error("Something went wrong");
    return;
  }
  return ref.current.files?.[0];
};
const getMultipleFileInput = (ref: RefObject<HTMLInputElement>) => {
  //this function is used to get multiple files from input type="file" element easily
  if (!ref.current) {
    toast.error("Something went wrong");
    return;
  }
  return ref.current.files?.length ? Array.from(ref.current.files) : [];
};

const imageExtension = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
const videoExtension = ["mp4", "webm", "ogg", "avi", "mov", "flv", "wmv"];
const audioExtension = ["mp3", "wav", "ogg", "flac", "aac", "wma"];
const documentExtension = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"];
const archiveExtension = ["zip", "rar", "7z", "tar", "gz", "bz2"];

const isImageExtension = (ex: string) => imageExtension.includes(ex);
const isVideoExtension = (ex: string) => videoExtension.includes(ex);
const isAudioExtension = (ex: string) => audioExtension.includes(ex);
const isDocumentExtension = (ex: string) => documentExtension.includes(ex);
const isArchiveExtension = (ex: string) => archiveExtension.includes(ex);
const fileTypeColorMap = {
  pdf: "text-red-500",
  doc: "text-blue-500",
  docx: "text-blue-500",
  ppt: "text-orange-500",
  pptx: "text-orange-500",
  xls: "text-green-500",
  xlsx: "text-green-500",
  image: "text-yellow-500",
  video: "text-indigo-600",
  audio: "text-pink-500",
  archive: "text-teal-500",
  default: "text-gray-500",
};
const getFileTypeColor = (ex: string) => {
  if (isImageExtension(ex)) return fileTypeColorMap.image;
  if (isVideoExtension(ex)) return fileTypeColorMap.video;
  if (isAudioExtension(ex)) return fileTypeColorMap.audio;
  if (isArchiveExtension(ex)) return fileTypeColorMap.archive;
  if (isDocumentExtension(ex)) {
    if (ex === "pdf") return fileTypeColorMap.pdf;
    if (ex === "doc" || ex === "docx") return fileTypeColorMap.doc;
    if (ex === "ppt" || ex === "pptx") return fileTypeColorMap.ppt;
    if (ex === "xls" || ex === "xlsx") return fileTypeColorMap.xls;
  }
  return fileTypeColorMap.default;
};
export {
  cn,
  displayNumber,
  formatDate,
  getFileSize,
  getByteFromSize,
  handleFilterColumn,
  getDurationText,
  getTimeStringByDuration,
  getTextFromHtml,
  scrollTo,
  resetFileInput,
  getFileInput,
  getMultipleFileInput,
  isImageExtension,
  isVideoExtension,
  isAudioExtension,
  isDocumentExtension,
  isArchiveExtension,
  getFileTypeColor,
};
