import { Topic, TopicType } from "@/models/topic";
import { useEffect, useState } from "react";
import CollapsibleList from "../collapsible/collapsible-list";
import ActivityItem from "./activity-item";
import { isOverDueTopic, isWorkingInProgressTopic } from "./utils";
import { Course } from "@/models/course";

interface Props {
  topics: Topic[];
  course: Course;
  selectedType: string;
}
export default function ActivityList({ topics, course, selectedType }: Props) {
  const [workingInProgressTopics, setWorkingInProgressTopics] = useState<
    Topic[]
  >([]);
  const [overdueTopics, setOverdueTopics] = useState<Topic[]>([]);
  const [itemsPerGroup, setItemsPerGroup] = useState<number[]>([0, 0]);

  const filterTopicType = (type: string) => (topic: Topic) => {
    if (type === "All activities") return topic;
    return topic.type === type;
  };

  useEffect(() => {
    const workingInProgressTopics = topics
      .filter(filterTopicType(selectedType))
      .filter(isWorkingInProgressTopic);
    const overdueTopics = topics
      .filter(filterTopicType(selectedType))
      .filter(isOverDueTopic);
    setWorkingInProgressTopics(workingInProgressTopics);
    setOverdueTopics(overdueTopics);
    setItemsPerGroup([workingInProgressTopics.length, overdueTopics.length]);
  }, [topics, selectedType]);

  const titles = ["Work in progress", "Closed"];
  return (
    <div className="w-full">
      <CollapsibleList titles={titles} itemsPerGroup={itemsPerGroup}>
        <div>
          {workingInProgressTopics.map((topic) => (
            <ActivityItem key={topic.id} topic={topic} course={course} />
          ))}
        </div>
        <div>
          {overdueTopics.map((topic) => (
            <ActivityItem key={topic.id} topic={topic} course={course} />
          ))}
        </div>
      </CollapsibleList>
    </div>
  );
}
