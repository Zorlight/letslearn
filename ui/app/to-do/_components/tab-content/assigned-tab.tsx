import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { Course } from "@/models/course";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import AssignedList from "../activity-group/assigned-list";
import { AssignmentTopic, QuizTopic } from "@/models/topic";

interface Props {
  courses: Course[];
  assignmentsOfUser: AssignmentTopic[];
  quizzesOfUser: QuizTopic[];
}
export default function AssignedTab({
  courses,
  assignmentsOfUser,
  quizzesOfUser,
}: Props) {
  const options = ["All courses", ...courses.map((course) => course.title)];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const topics = useMemo(() => {
    return [...assignmentsOfUser, ...quizzesOfUser];
  }, [assignmentsOfUser, quizzesOfUser]);
  return (
    <div className="flex flex-col items-center">
      <Combobox
        name="course"
        options={options}
        initialValue={options[0]}
        popoverClassName="min-w-[400px]"
      >
        <Button
          variant="outline"
          className="min-w-[400px] flex justify-between"
        >
          {selectedOption}
          <ChevronDown size={20} />
        </Button>
      </Combobox>
      <AssignedList topics={topics} />
    </div>
  );
}
