import { StudentResponse } from "@/models/student-response";
import { fakeAssignment } from "./assignment";
import { fakeUserList } from "./user";

export const fakeStudentResponses: StudentResponse[] = [
  {
    id: "1",
    student: fakeUserList[3],
    topicId: fakeAssignment.id,
    data: {
      submittedAt: new Date(2024, 11, 23).toISOString(),
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
];
