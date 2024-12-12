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
  },
  {
    id: "5",
    sectionId: "1",
    type: TopicType.FILE,
    title: "PMBOK book",
    file: {
      id: nanoid(),
      name: "PMBOK book",
      displayUrl:
        "https://res.cloudinary.com/dggtc5ucv/image/upload/v1721188025/mfbsuoavvzmil8gud9a2.jpg",
      downloadUrl:
        "https://res.cloudinary.com/dggtc5ucv/image/upload/fl_attachment/v1721188025/mfbsuoavvzmil8gud9a2.jpg",
    },
  },
  {
    id: "6",
    sectionId: "1",
    type: TopicType.PAGE,
    title: "Astronomy Page",
  },
];
