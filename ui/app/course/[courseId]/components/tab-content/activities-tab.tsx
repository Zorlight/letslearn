import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { Course } from "@/models/course";
import { activityTopics, Topic } from "@/models/topic";
import { getAllWorkOfCourse } from "@/services/topic";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ActivityList from "./activities-tab/activity-group/activity-list";

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

  const handleGetAllTopicSuccess = (data: Topic[]) => {
    console.log("topic", data);
    setTopics(data);
  };
  const handleFail = (error: any) => {
    toast.error(error);
  };
  useEffect(() => {
    getAllWorkOfCourse(course.id, handleGetAllTopicSuccess, handleFail);
  }, [course]);

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
