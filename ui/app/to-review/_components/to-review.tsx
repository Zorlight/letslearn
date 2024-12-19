import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import ReviewList from "./review-group/review-list";
import { CourseOption } from "./static-data";
import { Topic } from "@/models/topic";
import {
  isNoDueDateTopic,
  isClosedTopic,
  isWorkingInProgressTopic,
} from "./utils";

interface Props {
  topics: Topic[];
}
export default function ToReview({ topics }: Props) {
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

  const filteredWorkingInProgressTopics = useMemo(() => {
    if (selectedIndex === 0) return topics.filter(isWorkingInProgressTopic);

    const selectedCourseId = options[selectedIndex].key;
    return topics.filter((topic) => {
      return (
        topic.course &&
        topic.course.id === selectedCourseId &&
        isWorkingInProgressTopic(topic)
      );
    });
  }, [selectedIndex, topics, options]);

  const filteredNoDueDateTopics = useMemo(() => {
    if (selectedIndex === 0) return topics.filter(isNoDueDateTopic);

    const selectedCourseId = options[selectedIndex].key;
    return topics.filter(
      (topic) =>
        topic.course &&
        topic.course.id === selectedCourseId &&
        isNoDueDateTopic(topic)
    );
  }, [selectedIndex, topics, options]);

  const filteredClosedTopics = useMemo(() => {
    if (selectedIndex === 0) return topics.filter(isClosedTopic);

    const selectedCourseId = options[selectedIndex].key;
    return topics.filter(
      (topic) =>
        topic.course &&
        topic.course.id === selectedCourseId &&
        isClosedTopic(topic)
    );
  }, [selectedIndex, topics, options]);

  const handleComboboxChange = (courseName: string, index: number) => {
    setSelectedIndex(index);
    setSelectedOption(courseName);
  };
  return (
    <div className="w-full flex flex-col items-center">
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
      <ReviewList
        workingInProgressTopics={filteredWorkingInProgressTopics}
        noDueDateTopics={filteredNoDueDateTopics}
        closedTopics={filteredClosedTopics}
      />
    </div>
  );
}
