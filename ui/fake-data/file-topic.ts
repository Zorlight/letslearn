import { FileTopic, TopicType } from "@/models/topic";

export const fakeFileTopic: FileTopic = {
  id: "5",
  sectionId: "1",
  title: "PMBOK book",
  type: TopicType.FILE,
  data: {
    description: "This is a book about PMBOK",
    file: null,
  },
};
