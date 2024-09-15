import { Section } from "@/models/course";
import { TopicType } from "@/models/topic";
import { fakeTopics } from "./topic";

export const fakeSections: Section[] = [
  {
    id: "1",
    courseId: "1",
    title: "Section 1",
    topics: fakeTopics.filter((topic) => topic.sectionId === "1"),
  },
  {
    id: "2",
    courseId: "1",
    title: "Section 2",
    topics: fakeTopics.filter((topic) => topic.sectionId === "2"),
  },
  {
    id: "3",
    courseId: "1",
    title: "Section 3",
    topics: fakeTopics.filter((topic) => topic.sectionId === "3"),
  },
];
