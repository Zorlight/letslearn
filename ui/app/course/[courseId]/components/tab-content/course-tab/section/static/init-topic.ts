import { getDateAfterNDays } from "@/lib/utils";
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

const today = new Date();
const todayAt9 = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  9,
  0,
  0,
  0
);
const todayAt17 = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  14,
  0,
  0,
  0
);
const todayAt20 = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  20,
  0,
  0,
  0
);

const nextWeek = getDateAfterNDays(7, today);
const nextWeekAt9 = new Date(
  nextWeek.getFullYear(),
  nextWeek.getMonth(),
  nextWeek.getDate(),
  9,
  0,
  0,
  0
);

export const initQuiz: QuizTopic = {
  id: nanoid(4), // generate temp id to use in client and it will be removed in service folder when saving to db
  sectionId: nanoid(4),
  title: "Quiz",
  type: TopicType.QUIZ,
  data: {
    open: todayAt9.toISOString(),
    close: todayAt17.toISOString(),
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
    open: todayAt9.toISOString(),
    close: todayAt17.toISOString(),
    description:
      "This quiz contains a variety of questions to test your knowledge. At the end of the quiz you will be given your score with suggestions for improvement.",
    remindToGrade: todayAt20.toISOString(),
    maximumFile: 5,
    maximumFileSize: FileSizeOption["5MB"],
  },
};

export const initMeeting: MeetingTopic = {
  id: nanoid(4), // generate temp id to use in client and it will be removed in service folder when saving to db
  sectionId: nanoid(4),
  title: "Meeting",
  type: TopicType.MEETING,
  data: {
    open: nextWeekAt9.toISOString(),
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
