import React, { ReactNode } from "react";

interface Props {
  label: ReactNode;
  children?: ReactNode[] | ReactNode;
}
export default function DataRow({ label, children }: Props) {
  return (
    <div className="flex flex-row items-center gap-2">
      <label className="w-[50px] font-semibold">{label}</label>
      <div className="relative w-full flex flex-col">{children}</div>
    </div>
  );
}
