import { getDateAfterNDays } from "@/lib/utils";
import { FileSizeOption } from "@/models/assignment";
import { GradingMethod, TimeLimitType } from "@/models/quiz";
import {
  AssignmentTopic,
  FileTopic,
  LinkTopic,
  MeetingTopic,
  PageTopic,
  QuizTopic,
  TopicType,
} from "@/models/topic";
import { nanoid } from "@reduxjs/toolkit";

const today = new Date();
const todayNextHour = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  today.getHours() + 1,
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

const endOfToday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  23,
  59,
  59,
  999
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
    open: todayNextHour.toISOString(),
    close: endOfToday.toISOString(),
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
    open: todayNextHour.toISOString(),
    close: endOfToday.toISOString(),
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

const htmlString = `<p><b>Welcome to Our Platform!</b></p>
<p>Here are some of the key features you can enjoy:</p>
<ul>
  <li><b>Interactive Courses:</b> Learn at your own pace with engaging video lectures and hands-on exercises.</li>
  <li><b>Assignments & Quizzes:</b> Test your knowledge and track your progress with regular assessments.</li>
  <li><b>Live Classes:</b> Participate in real-time discussions and get your questions answered by experts.</li>
  <li><b>Community Support:</b> Connect with peers and mentors to enhance your learning experience.</li>
</ul>
<p><b>Start teaching today by create a beautiful page for your course!</b></p>
`;

export const initPage: PageTopic = {
  id: nanoid(4), // generate temp id to use in client and it will be removed in service folder when saving to db
  sectionId: nanoid(4),
  title: "New Page",
  type: TopicType.PAGE,
  data: {
    content: htmlString,
    description: "",
  },
};
