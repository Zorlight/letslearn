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
    type: TopicType.MEETING,
    title: "Topic Meeting",
  },
  {
    id: "3",
    sectionId: "1",
    type: TopicType.ASSIGNMENT,
    title: "Topic Assignment",
  },
  {
    id: "4",
    sectionId: "1",
    type: TopicType.QUIZ,
    title: "Topic Quiz",
  },
  {
    id: "9",
    sectionId: "1",
    type: TopicType.FILE,
    title: "PMBOK book",
    file: {
      data: new File([""], "PMBOK.pdf"),
      cloudUrl: "https://cloud.com/file.txt",
    },
  },
  {
    id: "10",
    sectionId: "1",
    type: TopicType.PAGE,
    title: "Astronomy Page",
  },
  {
    id: "5",
    sectionId: "2",
    type: TopicType.LINK,
    title: "Topic Link",
  },

  {
    id: "6",
    sectionId: "2",
    type: TopicType.MEETING,
    title: "Topic Meeting",
  },
  {
    id: "7",
    sectionId: "3",
    type: TopicType.LINK,
    title: "Topic Link",
  },
];
