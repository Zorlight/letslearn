"use client";
import { ClassValue } from "clsx";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { cn } from "../utils";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Props {
  value: string;
  onChange?: (value: string) => void;
  className?: ClassValue;
}
const Editor = ({ value, onChange, className }: Props) => {
  const [text, setText] = useState(value);

  const handleTextChange = (value: string) => {
    setText(value);
    if (onChange) onChange(value);
  };
  return (
    <ReactQuill
      theme="snow"
      value={text}
      onChange={handleTextChange}
      className={cn("bg-white", className)}
    />
  );
};

export default Editor;
