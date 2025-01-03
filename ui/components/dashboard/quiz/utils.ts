import { StudentWithAverageMark, StudentWithMark } from "@/models/report";

export const getStudentWithMark = (list: StudentWithMark[]) => {
  return list.map((s) => s.student);
};

export const getStudentWithAvgMark = (list: StudentWithAverageMark[]) => {
  return list.map((s) => s.user);
};
