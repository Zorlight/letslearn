import { Topic, TopicType } from "@/models/topic";

export const fakeTopics: Topic[] = [
  {
    id: "1",
    sectionId: "1",
    type: TopicType.LINK,
    title: "Topic Link",
  },
  {
    id: "2",
    sectionId: "1",
    type: TopicType.LEARNING,
    title: "Topic Learning",
    chapterIds: ["1", "2"],
  },
  {
    id: "3",
    sectionId: "1",
    type: TopicType.MEETING,
    title: "Topic Meeting",
  },
  {
    id: "4",
    sectionId: "1",
    type: TopicType.ASSIGNMENT,
    title: "Topic Assignment",
  },
  {
    id: "5",
    sectionId: "1",
    type: TopicType.CHOICE,
    title: "Topic Choice",
  },
  {
    id: "7",
    sectionId: "1",
    type: TopicType.QUIZ,
    title: "Topic Quiz",
  },
  {
    id: "8",
    sectionId: "2",
    type: TopicType.LINK,
    title: "Topic Link",
  },
  {
    id: "9",
    sectionId: "2",
    type: TopicType.LEARNING,
    title: "Topic Learning",
    chapterIds: ["3", "4", "5"],
  },
  {
    id: "10",
    sectionId: "2",
    type: TopicType.MEETING,
    title: "Topic Meeting",
  },
  {
    id: "11",
    sectionId: "3",
    type: TopicType.LINK,
    title: "Topic Link",
  },
  {
    id: "12",
    sectionId: "3",
    type: TopicType.LEARNING,
    title: "Topic Learning",
    chapterIds: ["6", "7", "8"],
  },
];
