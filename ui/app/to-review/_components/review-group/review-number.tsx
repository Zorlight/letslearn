import React from "react";

interface Props {
  number: number;
  title: string;
}
export default function ReviewNumber({ title, number }: Props) {
  return (
    <div className="flex flex-col text-gray-500">
      <span className="font-bold text-lg">{number}</span>
      <span>{title}</span>
    </div>
  );
}
