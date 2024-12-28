import Avatar from "@/components/ui/simple/avatar";
import { User } from "@/models/user";
import React from "react";
import ColorItem from "./color-item";

interface Props {
  students: User[];
  onClick?: (id: string) => void;
  maxToShow?: number;
}
export default function StudentList({
  students,
  maxToShow = 5,
  onClick,
}: Props) {
  const handleClick = (id: string) => () => {
    if (onClick) onClick(id);
  };

  const rest = students.length > maxToShow ? students.length - maxToShow : 0;
  return (
    <div className="flex flex-row gap-2 items-center">
      {students.slice(0, maxToShow).map((student) => (
        <Avatar
          key={student.id}
          src={student.image}
          className="w-8 hover:scale-105"
          onClick={handleClick(student.id)}
        />
      ))}
      {rest > 0 && (
        <ColorItem className="bg-cyan-100 text-cyan-500">{`+${rest}`}</ColorItem>
      )}
    </div>
  );
}
