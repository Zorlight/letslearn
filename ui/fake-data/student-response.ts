import { ChoiceResponse, StudentResponse } from "@/models/student-response";
import { fakeUser, fakeUserList } from "./user";
import { fakeAssignment } from "./test";

export const fakeResponses: ChoiceResponse[] = [
  {
    option: "Option 1",
    studentResponses: ["Student 1", "Student 2", "Student 3"],
  },
  {
    option: "Option 2",
    studentResponses: ["Student 4", "Student 5"],
  },
  {
    option: "Option 3",
    studentResponses: ["Student 6"],
  },
  {
    option: "Option 4",
    studentResponses: ["Student 7", "Student 8"],
  },
  {
    option: "Option 5",
    studentResponses: ["Student 9"],
  },
];

export const fakeStudentResponses: StudentResponse[] = [
  {
    id: "1",
    student: fakeUserList[0],
    test: fakeAssignment,
    data: {
      submittedAt: new Date(2024, 11, 1).toISOString(),
      submitted: {
        text: "This is the answer",
      },
    },
  },
  {
    id: "2",
    student: fakeUserList[1],
    test: fakeAssignment,
    data: {
      submittedAt: new Date(2024, 10, 1).toISOString(),
      submitted: {
        text: "This is the answer",
      },
    },
  },
  {
    id: "3",
    student: fakeUserList[2],
    test: fakeAssignment,
    data: {
      submittedAt: new Date(2024, 11, 2).toISOString(),
      submitted: {
        text: "This is the answer",
      },
    },
  },
  {
    id: "4",
    student: fakeUserList[3],
    test: fakeAssignment,
    data: {
      submittedAt: new Date(2024, 11, 23).toISOString(),
      submitted: {
        files: [
          {
            name: "file1.jpg",
            displayUrl:
              "https://res.cloudinary.com/dggtc5ucv/image/upload/v1721188025/mfbsuoavvzmil8gud9a2.jpg",
            downloadUrl:
              "https://res.cloudinary.com/dggtc5ucv/image/upload/fl_attachment/v1721188025/mfbsuoavvzmil8gud9a2.jpg",
          },
          {
            name: "file2.jpg",
            displayUrl:
              "https://res.cloudinary.com/dggtc5ucv/image/upload/v1720970602/epalczk6hix3bvbpa4xd.jpg",
            downloadUrl:
              "https://res.cloudinary.com/dggtc5ucv/image/upload/fl_attachment/v1720970602/epalczk6hix3bvbpa4xd.jpg",
          },
        ],
      },
    },
  },
  {
    id: "5",
    student: fakeUserList[4],
    test: fakeAssignment,
    data: {
      submittedAt: new Date(2024, 11, 10).toISOString(),
      submitted: {
        text: "This is the answer",
      },
    },
  },
  {
    id: "6",
    student: fakeUserList[5],
    test: fakeAssignment,
    data: {
      submittedAt: new Date(2024, 10, 1).toISOString(),
      submitted: {
        text: "This is the answer",
      },
    },
  },
];
