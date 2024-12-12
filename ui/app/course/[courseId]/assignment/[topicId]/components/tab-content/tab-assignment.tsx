import { AssignmentTopic } from "@/models/topic";
import { Role, User } from "@/models/user";
import TabStudentAssignment from "../assignment/student/tab-student-assignment";
import TabTeacherAssignment from "../assignment/teacher/tab-teacher-assignment";

interface Props {
  user: User;
  assignment: AssignmentTopic;
  className?: string;
}
const TabAssignment = ({ className, assignment, user }: Props) => {
  if (user.role === Role.TEACHER)
    return (
      <TabTeacherAssignment
        user={user}
        assignment={assignment}
        className={className}
      />
    );

  return (
    <TabStudentAssignment
      user={user}
      assignment={assignment}
      className={className}
    />
  );
};

export default TabAssignment;
