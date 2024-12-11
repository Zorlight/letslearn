import React, { ReactNode } from "react";

interface Props {
  label: ReactNode;
  htmlFor?: string;
  children?: ReactNode[] | ReactNode;
}
export default function SettingRow({ label, htmlFor, children }: Props) {
  return (
    <div className="flex flex-row items-center gap-2">
      <label htmlFor={htmlFor} className="w-[50px] font-semibold">
        {label}
      </label>
      <div className="relative w-full flex flex-col">{children}</div>
    </div>
  );
}
