import { fakeUser } from "@/fake-data/user";
import { StudentResponse } from "@/models/student-response";
import { nanoid } from "@reduxjs/toolkit";

export const defaultAssignmentResponse: StudentResponse = {
  id: nanoid(4),
  student: fakeUser,
  topicId: nanoid(4),
  data: {
    submittedAt: new Date().toISOString(),
    files: [],
    mark: null,
    note: "",
  },
};

export enum BackgroundColor {
  GREEN = "bg-green-50",
  RED = "bg-red-50",
}

export enum TextColor {
  GREEN = "text-green-500",
  RED = "text-red-500",
}

export enum GradingStatus {
  NOT_GRADED = "Not graded",
  GRADED = "Graded",
}
