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
