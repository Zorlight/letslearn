import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { Topic } from "@/models/topic";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import DoneList from "../activity-group/done-list";
import { isDoneTopic } from "../activity-group/utils";
import { CourseOption } from "../static-data";

interface Props {
  topics: Topic[];
}
export default function DoneTab({ topics }: Props) {
  const options: CourseOption[] = useMemo(() => {
    let init = [{ key: "all", value: "All courses" }];
    let checkIds: string[] = [];
    topics.forEach((topic) => {
      if (topic.course && !checkIds.includes(topic.course.id)) {
        init.push({ key: topic.course.id, value: topic.course.title });
        checkIds.push(topic.course.id);
      }
    });
    return init;
  }, [topics]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>(
    options[0].value
  );

  const filteredDoneTopics = useMemo(() => {
    if (selectedIndex === 0) return topics.filter(isDoneTopic);

    const selectedCourseId = options[selectedIndex].key;
    return topics.filter(
      (topic) =>
        topic.course &&
        topic.course.id === selectedCourseId &&
        isDoneTopic(topic)
    );
  }, [selectedIndex, topics, options]);
  const handleComboboxChange = (courseName: string, index: number) => {
    setSelectedIndex(index);
    setSelectedOption(courseName);
  };
  return (
    <div className="flex flex-col items-center">
      <Combobox
        name="course"
        options={options.map((option) => option.value)}
        initialValue={options[0].value}
        popoverClassName="min-w-[400px]"
        onChange={handleComboboxChange}
      >
        <Button
          variant="outline"
          className="min-w-[400px] flex justify-between"
        >
          {selectedOption}
          <ChevronDown size={20} />
        </Button>
      </Combobox>
      <DoneList doneTopics={filteredDoneTopics} />
    </div>
  );
}
