import { Chapter } from "./chapter";
import { AttachedFile } from "./course";

interface BaseTopic {
  id: string;
  sectionId: string;
  title: string;
  type: TopicType;
}

export enum TopicType {
  LINK = "link",
  MEETING = "meeting",
  LEARNING = "learning",
  ASSIGNMENT = "assignment",
  CHOICE = "choice",
  FILE = "file",
  QUIZ = "quiz",
}

export interface QuizTopic extends BaseTopic {
  type: TopicType.QUIZ;
}
export interface AssignmentTopic extends BaseTopic {
  type: TopicType.ASSIGNMENT;
}
export interface MeetingTopic extends BaseTopic {
  type: TopicType.MEETING;
}
export interface LearningTopic extends BaseTopic {
  type: TopicType.LEARNING;
  chapterIds: string[];
}
export interface LinkTopic extends BaseTopic {
  type: TopicType.LINK;
}
export interface ChoiceTopic extends BaseTopic {
  type: TopicType.CHOICE;
}
export interface FileTopic extends BaseTopic {
  type: TopicType.FILE;
  file: AttachedFile;
}

export type Topic =
  | LinkTopic
  | MeetingTopic
  | LearningTopic
  | AssignmentTopic
  | ChoiceTopic
  | FileTopic
  | QuizTopic;

export type TopicMap = {
  [TopicType.LINK]: any;
  [TopicType.MEETING]: any;
  [TopicType.LEARNING]: any;
  [TopicType.ASSIGNMENT]: any;
  [TopicType.CHOICE]: any;
  [TopicType.FILE]: {
    document: any;
    audio: any;
    video: any;
  };
  [TopicType.QUIZ]: any;
};
