"use client";
import { ClassValue } from "clsx";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { cn } from "../utils";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Props {
  value: string;
  className?: ClassValue;
}
const Preview = ({ value, className }: Props) => {
  return (
    <ReactQuill
      theme="bubble"
      value={value}
      readOnly
      className={cn("p-0 m-0", className)}
    />
  );
};

export default Preview;
