import { Course } from "@/models/course";
import DashboardTeacher from "./dashboard-tab/teacher/dashboard-teacher";
import { useAppSelector } from "@/redux/hooks";
import { Role } from "@/models/user";
import DashboardStudent from "./dashboard-tab/student/dashboard-student";

interface Props {
  course: Course;
}
export default function DashboardTab({ course }: Props) {
  const user = useAppSelector((state) => state.profile.value);
  if (!user) return null;
  if (user.role === Role.TEACHER) return <DashboardTeacher course={course} />;
  if (user.role === Role.STUDENT) return <DashboardStudent course={course} />;
}
