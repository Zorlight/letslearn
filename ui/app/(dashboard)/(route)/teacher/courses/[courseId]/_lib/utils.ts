import { RefObject } from "react";
import { toast } from "react-toastify";

const resetFileInput = (ref: RefObject<HTMLInputElement>) => {
  if (!ref.current) {
    toast.error("Something went wrong");
    return;
  }
  ref.current.value = "";
};
const getFileInput = (ref: RefObject<HTMLInputElement>) => {
  if (!ref.current) {
    toast.error("Something went wrong");
    return;
  }
  return ref.current.files?.[0];
};
const getMultipleFileInput = (ref: RefObject<HTMLInputElement>) => {
  if (!ref.current) {
    toast.error("Something went wrong");
    return;
  }
  return ref.current.files?.length ? Array.from(ref.current.files) : [];
};

export { resetFileInput, getFileInput, getMultipleFileInput };
