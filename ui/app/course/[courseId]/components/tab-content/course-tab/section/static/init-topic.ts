import { FileSizeOption } from "@/models/assignment";
import { GradingMethod, TimeLimitType } from "@/models/quiz";
import {
  AssignmentTopic,
  FileTopic,
  LinkTopic,
  MeetingTopic,
  QuizTopic,
  TopicType,
} from "@/models/topic";
import { nanoid } from "@reduxjs/toolkit";

export const initQuiz: QuizTopic = {
  id: nanoid(4), // generate temp id to use in client and it will be removed in service folder when saving to db
  sectionId: nanoid(4),
  title: "Quiz",
  type: TopicType.QUIZ,
  data: {
    open: new Date(2024, 11, 10, 10, 30, 0, 0).toISOString(),
    close: new Date(2024, 11, 10, 14, 30, 0, 0).toISOString(),
    description:
      "This quiz contains a variety of questions to test your knowledge. At the end of the quiz you will be given your score with suggestions for improvement.",
    timeLimit: 1,
    timeLimitUnit: TimeLimitType.HOURS,
    gradeToPass: 5,
    gradingMethod: GradingMethod.HIGHEST_GRADE,
    attemptAllowed: "Unlimited",
    questions: [],
  },
};

export const initAssignment: AssignmentTopic = {
  id: nanoid(4), // generate temp id to use in client and it will be removed in service folder when saving to db
  sectionId: nanoid(4),
  title: "Assignment",
  type: TopicType.ASSIGNMENT,
  data: {
    open: new Date(2024, 11, 10, 10, 30, 0, 0).toISOString(),
    close: new Date(2024, 11, 10, 14, 30, 0, 0).toISOString(),
    description:
      "This quiz contains a variety of questions to test your knowledge. At the end of the quiz you will be given your score with suggestions for improvement.",
    remindToGrade: new Date(2024, 11, 10, 14, 30, 0, 0).toISOString(),
    maximumFile: 5,
    maximumFileSize: FileSizeOption["5MB"],
  },
};

const current = new Date();
const nextWeek = new Date(current.getTime() + 7 * 24 * 60 * 60 * 1000);
export const initMeeting: MeetingTopic = {
  id: nanoid(4), // generate temp id to use in client and it will be removed in service folder when saving to db
  sectionId: nanoid(4),
  title: "Meeting",
  type: TopicType.MEETING,
  data: {
    open: nextWeek.toISOString(),
    description: "This is an important meeting. Please attend on time.",
  },
};
export const initFileTopic: FileTopic = {
  id: nanoid(4), // generate temp id to use in client and it will be removed in service folder when saving to db
  sectionId: nanoid(4),
  title: "New File",
  type: TopicType.FILE,
  data: {
    description: "",
    file: null,
  },
};

export const initLink: LinkTopic = {
  id: nanoid(4), // generate temp id to use in client and it will be removed in service folder when saving to db
  sectionId: nanoid(4),
  title: "New Link",
  type: TopicType.LINK,
  data: {
    description: "",
    url: null,
  },
};
