import { LinkTopic, TopicType } from "@/models/topic";

export const fakeLink: LinkTopic = {
  id: "1",
  sectionId: "1",
  title: "Link",
  type: TopicType.LINK,
  data: {
    description: "Link to google",
    url: "https://www.google.com",
  },
};
