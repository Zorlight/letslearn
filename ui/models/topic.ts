import {
  FileText,
  FileUp,
  Link,
  ListTodo,
  ScrollText,
  Video,
} from "lucide-react";
import { AssignmentData } from "./assignment";
import { Course } from "./course";
import { FileTopicData } from "./file-topic";
import { MeetingData } from "./meeting";
import { QuizData } from "./quiz";
import { StudentResponse } from "./student-response";
import { LinkData } from "./link";
import { PageData } from "./page";

interface BaseTopic {
  id: string;
  sectionId: string;
  title: string;
  type: TopicType;
  course?: Course;
}

export enum TopicType {
  ASSIGNMENT = "assignment",
  FILE = "file",
  LINK = "link",
  MEETING = "meeting",
  PAGE = "page",
  QUIZ = "quiz",
}

export interface QuizTopic extends BaseTopic {
  type: TopicType.QUIZ;
  data: QuizData;
  response?: StudentResponse;
}
export interface AssignmentTopic extends BaseTopic {
  type: TopicType.ASSIGNMENT;
  data: AssignmentData;
  response?: StudentResponse;
}
export interface MeetingTopic extends BaseTopic {
  type: TopicType.MEETING;
  data: MeetingData;
}
export interface LinkTopic extends BaseTopic {
  type: TopicType.LINK;
  data: LinkData;
}

export interface FileTopic extends BaseTopic {
  type: TopicType.FILE;
  data: FileTopicData;
}
export interface PageTopic extends BaseTopic {
  type: TopicType.PAGE;
  data: PageData;
}

export type Topic =
  | LinkTopic
  | MeetingTopic
  | AssignmentTopic
  | FileTopic
  | QuizTopic
  | PageTopic;

export type TopicMap = {
  [TopicType.LINK]: any;
  [TopicType.MEETING]: any;
  [TopicType.ASSIGNMENT]: any;
  [TopicType.FILE]: any;
  [TopicType.QUIZ]: any;
  [TopicType.PAGE]: any;
};

export const colorMap: TopicMap = {
  link: "text-link",
  meeting: "text-meeting",
  assignment: "text-assignment",
  file: "text-file",
  quiz: "text-quiz",
  page: "text-page",
};

export const iconMap: TopicMap = {
  link: Link,
  meeting: Video,
  assignment: FileUp,
  file: FileText,
  quiz: ListTodo,
  page: ScrollText,
};

export const activityTopics = [
  TopicType.ASSIGNMENT,
  TopicType.MEETING,
  TopicType.QUIZ,
];

export const resourceTopics = [TopicType.FILE, TopicType.LINK, TopicType.PAGE];

export const isValidType = (type: string): boolean => {
  return type in iconMap;
};
