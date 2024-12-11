import { MeetingTopic, TopicType } from "@/models/topic";
import { nanoid } from "@reduxjs/toolkit";

export const fakeMeeting: MeetingTopic = {
  id: nanoid(4),
  sectionId: nanoid(4),
  title: "Meeting",
  type: TopicType.MEETING,
  data: {
    description: "This is an important meeting, please attend on time.",
    open: new Date().toISOString(),
  },
};
