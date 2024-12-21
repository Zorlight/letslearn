import { Topic, TopicType } from "@/models/topic";
import { fakeQuiz } from "./quiz";
import { fakeAssignment } from "./assignment";
import { nanoid } from "@reduxjs/toolkit";

export const fakeTopics: Topic[] = [
  fakeQuiz,
  fakeAssignment,
  {
    id: "3",
    sectionId: "1",
    type: TopicType.MEETING,
    title: "Topic Meeting",
    data: {
      description: "Meeting description",
      open: new Date(2024, 11, 20).toISOString(),
    },
  },
  {
    id: "4",
    sectionId: "1",
    type: TopicType.LINK,
    title: "Topic Link",
    data: {
      description: "Link description",
      url: "https://www.google.com",
    },
  },
  {
    id: "5",
    sectionId: "1",
    type: TopicType.FILE,
    title: "PMBOK book",
    data: {
      description: "PMBOK description",
      file: {
        id: nanoid(4),
        name: "PMBOK",
        downloadUrl: "https://www.google.com",
        displayUrl: "https://www.google.com",
      },
    },
  },
  {
    id: "6",
    sectionId: "1",
    type: TopicType.PAGE,
    title: "Astronomy Page",
  },
];
