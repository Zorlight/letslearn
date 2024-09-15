import { Question } from "@/models/question";
import { QuestionStatus, QuestionType } from "./static-data";

export const questionBank: Question[] = [
  {
    id: "1",
    questionName: "What is the capital of France?",
    questionText: "What is the capital of France?",
    status: QuestionStatus.DRAFT,
    type: QuestionType.MULTIPLE_CHOICE,
    defaultMark: 1,
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    modifiedBy: "admin",
    usage: 0,
    choices: [
      {
        text: "Paris",
        gradePercent: 100,
        feedback: "Correct!",
      },
      {
        text: "London",
        gradePercent: 0,
        feedback: "Incorrect!",
      },
      {
        text: "Berlin",
        gradePercent: 0,
        feedback: "Incorrect!",
      },
      {
        text: "Madrid",
        gradePercent: 0,
        feedback: "Incorrect!",
      },
    ],
  },
  {
    id: "2",
    questionName: "What is the capital of Spain?",
    questionText: "What is the capital of Spain?",
    status: QuestionStatus.DRAFT,
    type: QuestionType.MULTIPLE_CHOICE,
    defaultMark: 1,
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    modifiedBy: "admin",
    usage: 0,
    choices: [
      {
        text: "Paris",
        gradePercent: 0,
        feedback: "Incorrect!",
      },
      {
        text: "London",
        gradePercent: 0,
        feedback: "Incorrect!",
      },
      {
        text: "Berlin",
        gradePercent: 0,
        feedback: "Incorrect!",
      },
      {
        text: "Madrid",
        gradePercent: 100,
        feedback: "Correct!",
      },
    ],
  },
  {
    id: "3",
    questionName: "What is the capital of Spain?",
    questionText: "What is the capital of Spain?",
    status: QuestionStatus.DRAFT,
    type: QuestionType.TRUE_FALSE,
    defaultMark: 1,
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    modifiedBy: "admin",
    usage: 0,
    correctAnswer: true,
    feedbackOfFalse: "Incorrect!",
    feedbackOfTrue: "Correct!",
  },
];

export const questions = questionBank;
