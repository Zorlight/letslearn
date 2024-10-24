import { Section } from "@/models/course";
import { TopicType } from "@/models/topic";
import { fakeTopics } from "./topic";

export const fakeSections: Section[] = [
  {
    id: "1",
    courseId: "1",
    title: "Introduction",
    desc: "Welcome everyone! Below is some documents needed for this course. Hope all of you enjoy this course.",
    topics: fakeTopics.filter((topic) => topic.sectionId === "1"),
  },
  {
    id: "2",
    courseId: "1",
    title: "Lesson 1",
    desc: null,
    topics: fakeTopics.filter((topic) => topic.sectionId === "2"),
  },
  {
    id: "3",
    courseId: "1",
    title: "Lesson 2",
    desc: null,
    topics: fakeTopics.filter((topic) => topic.sectionId === "3"),
  },
];
