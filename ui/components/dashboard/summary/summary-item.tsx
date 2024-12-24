import React from "react";

interface Props {
  title: string;
  content: string;
}
export default function SummaryItem({ title, content }: Props) {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-bold text-gray-500">{title}</span>
      <span className="text-xl font-bold text-gray-700">{content}</span>
    </div>
  );
}
