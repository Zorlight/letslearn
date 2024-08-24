import React from "react";

interface Props {
  params: {
    courseId: string;
  };
}
const CourseIdPage = ({ params }: Props) => {
  const { courseId } = params;
  return <div>This is course id page for course id: {courseId}</div>;
};

export default CourseIdPage;
