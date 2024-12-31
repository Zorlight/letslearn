import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import {
  activityTopics,
  AssignmentTopic,
  QuizTopic,
  Topic,
  TopicType,
} from "@/models/topic";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import ActivityList from "./activities-tab/activity-group/activity-list";
import { Course } from "@/models/course";
import { getAllAssignmentOfCourse, getAllQuizOfCourse } from "@/services/topic";
import { toast } from "react-toastify";

interface Props {
  course: Course;
}
export default function ActivitiesTab({ course }: Props) {
  const options = ["All activities", ...activityTopics];
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string>(options[0]);
  const handleChoiceChange = (choice: string) => {
    setSelectedChoice(choice);
  };

  const handleGetAllQuizSuccess = (data: QuizTopic[]) => {
    console.log("quiz", data);
    setTopics((prev) => [...prev, ...data]);
  };
  const handleGetAllAssignmentSuccess = (data: AssignmentTopic[]) => {
    console.log("assignment", data);
    setTopics((prev) => [...prev, ...data]);
  };
  const handleFail = (error: any) => {
    toast.error(error);
  };
  useEffect(() => {
    getAllQuizOfCourse(course.id, handleGetAllQuizSuccess, handleFail);
    getAllAssignmentOfCourse(
      course.id,
      handleGetAllAssignmentSuccess,
      handleFail
    );
  }, []);

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center gap-5">
      <Combobox
        showSearch={false}
        initialValue={options[0]}
        renderItem={(item) => <span className="capitalize">{item}</span>}
        options={options}
        onChange={handleChoiceChange}
        className="w-[400px]"
        popoverClassName="w-[400px]"
      >
        <Button variant="outline" className="w-full justify-between">
          <span className="capitalize">{selectedChoice}</span>
          <ChevronDown className="ml-2 shrink-0" size={20} />
        </Button>
      </Combobox>
      <ActivityList
        topics={topics}
        course={course}
        selectedType={selectedChoice}
      />
    </div>
  );
}
