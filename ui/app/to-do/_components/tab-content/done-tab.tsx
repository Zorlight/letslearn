import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { Course } from "@/models/course";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import OverdueList from "../activity-group/overdue-list";
import DoneList from "../activity-group/done-list";
import { useAppSelector } from "@/redux/hooks";
import { getAllAssignmentResponsesOfUser } from "@/services/assignment-response";
import { StudentResponse } from "@/models/student-response";
import { toast } from "react-toastify";

interface Props {
  courses: Course[];
}
export default function DoneTab({ courses }: Props) {
  const options = ["All courses", ...courses.map((course) => course.title)];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const user = useAppSelector((state) => state.profile.value);
  const [assignmentResponses, setAssignmentResponses] = useState<
    StudentResponse[]
  >([]);
  const handleGetAssignmentResponseSuccess = (data: StudentResponse[]) => {
    console.log(data);
    setAssignmentResponses(data);
  };
  const handleGetAssignmentResponseFail = (error: any) => {
    toast.error(error);
  };
  useEffect(() => {
    if (!user) return;
    getAllAssignmentResponsesOfUser(
      user.id,
      handleGetAssignmentResponseSuccess,
      handleGetAssignmentResponseFail
    );
  }, [user]);
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
      {/* <DoneList topics={}/> */}
    </div>
  );
}
