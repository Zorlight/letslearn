import { Course } from "@/models/course";
import React from "react";
import UserRow from "./people-tab/user-row";
import { IconPersonAdd } from "@/components/icons/person-add";
import IconButton from "@/components/buttons/icon-button";

interface Props {
  course: Course;
}
export default function PeopleTab({ course }: Props) {
  const { creator, students } = course;

  return (
    <div className="max-w-4xl mx-auto text-gray-700">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <h4 className="font-medium">Instructor</h4>
          <UserRow user={creator} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-row items-center justify-between">
            <h4 className="font-medium">Members</h4>
            <div className="flex flex-row items-center gap-4">
              <span className="font-medium">
                {`${students.length} ${
                  students.length > 1 ? "members" : "member"
                }`}
              </span>
              <IconButton>
                <IconPersonAdd />
              </IconButton>
            </div>
          </div>
          {students.map((student) => (
            <UserRow key={student.id} user={student} />
          ))}
          {students.map((student) => (
            <UserRow key={student.id} user={student} />
          ))}
        </div>
      </div>
    </div>
  );
}
