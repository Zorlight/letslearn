import { AssignmentTopic, MeetingTopic } from "@/models/topic";

export const convertMeetingToRequestData = (meeting: MeetingTopic) => {
  const { id, data } = meeting;
  return {
    ...meeting,
    id: id.length === 4 ? null : id,
    data: data ? JSON.stringify(data) : null,
  };
};

export const convertMeetingFromResponseData = (meeting: any): MeetingTopic => {
  const parsedData = JSON.parse(meeting.data);
  return {
    ...meeting,
    data: parsedData,
  };
};
