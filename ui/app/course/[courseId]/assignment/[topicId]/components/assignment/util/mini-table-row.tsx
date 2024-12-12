import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}
export default function MiniTableRow({ title, children }: Props) {
  return (
    <div className="flex flex-row items-center gap-3 py-2 px-4 odd:bg-gray-100 hover:bg-gray-50">
      <span className="font-semibold max-w-[200px] w-1/2">{title}</span>
      <p className="text-slate-600 text-sm">{children}</p>
    </div>
  );
}
