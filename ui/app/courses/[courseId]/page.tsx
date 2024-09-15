"use client";
import { fakeCourses } from "@/fake-data/course";
import { useState } from "react";
import CollapsibleList from "./_components/collapsible/collapsible-list";
import CourseTopic from "./_components/course-topic";

const CourseIdPage = () => {
  const [course, setCourse] = useState(fakeCourses[0]);

  const titles = course.sections.map((section) => section.title);

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-bold line-clamp-1 text-2xl text-purple-700">
          {course.title}
        </h1>

        <CollapsibleList
          titles={titles}
          contentClassName="px-4 rounded-xl border"
        >
          {course.sections.map((section, index) => (
            <section key={index} id={`section-${section.id}`}>
              <div className="flex flex-col gap-4">
                {section.topics.map((topic, index) => (
                  <CourseTopic key={index} topic={topic} />
                ))}
              </div>
            </section>
          ))}
        </CollapsibleList>
      </div>
    </div>
  );
};

export default CourseIdPage;
