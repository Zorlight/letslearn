import React from "react";

interface Props {
  label: string;
  htmlFor?: string;
  children?: React.ReactNode[] | React.ReactNode;
}
export default function SettingInputForm({ label, htmlFor, children }: Props) {
  return (
    <div className="w-full flex flex-row items-center gap-2">
      <label htmlFor={htmlFor} className="w-[100px] font-semibold">
        {label}
      </label>
      <div className="relative w-full flex flex-col">{children}</div>
    </div>
  );
}
