import { AssignmentTopic, FileTopic, LinkTopic } from "@/models/topic";
import { convertAssignmentResponseFromResponseData } from "../student-response/assignment-response";

export const convertLinkToRequestData = (link: LinkTopic) => {
  const { id, data } = link;
  return {
    ...link,
    id: id.length === 4 ? null : id,
    data: data ? JSON.stringify(data) : null,
  };
};

export const convertLinkFromResponseData = (link: any): LinkTopic => {
  const parsedData = JSON.parse(link.data);

  return {
    ...link,
    data: parsedData,
  };
};
