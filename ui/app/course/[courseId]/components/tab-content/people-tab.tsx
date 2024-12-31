import { Course } from "@/models/course";
import React from "react";
import UserRow from "./people-tab/user-row";
import { IconPersonAdd } from "@/components/icons/person-add";
import IconButton from "@/components/buttons/icon-button";
import { cn } from "@/lib/utils";

interface Props {
  course: Course;
}
export default function PeopleTab({ course }: Props) {
  const { creator, students } = course;

  return (
    <div className="max-w-4xl mx-auto text-gray-700">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <TitleLayout>
            <h4 className="font-medium">Instructor</h4>
          </TitleLayout>
          <UserRow user={creator} />
        </div>
        <div className="flex flex-col gap-6">
          <TitleLayout className="flex flex-row items-center justify-between">
            <h4 className="font-medium">Students</h4>
            <div className="relative flex flex-row items-center gap-2">
              <span className="mr-14">
                {`${students.length} ${
                  students.length > 1 ? "students" : "student"
                }`}
              </span>
            </div>
          </TitleLayout>
          {students.map((student) => (
            <UserRow key={student.id} user={student} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}
const TitleLayout = ({ children, className }: TitleProps) => {
  return (
    <div
      className={cn("py-4 px-6 border-b-[0.5px] border-gray-400", className)}
    >
      {children}
    </div>
  );
};
