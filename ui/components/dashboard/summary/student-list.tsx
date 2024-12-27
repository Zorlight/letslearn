import Avatar from "@/components/ui/simple/avatar";
import { User } from "@/models/user";
import React from "react";
import ColorItem from "./color-item";

interface Props {
  students: User[];
  maxToShow?: number;
}
export default function StudentList({ students, maxToShow = 5 }: Props) {
  return (
    <div className="flex flex-row gap-2 items-center">
      {students.slice(0, maxToShow).map((student) => (
        <Avatar key={student.id} src={student.image} className="w-8" />
      ))}
      <ColorItem className="bg-cyan-100 text-cyan-500">
        {`+${students.length - maxToShow}`}
      </ColorItem>
    </div>
  );
}
