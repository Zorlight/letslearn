import { Topic, TopicType } from "@/models/topic";
import { useEffect, useState } from "react";
import CollapsibleList from "../collapsible/collapsible-list";
import ActivityItem from "./activity-item";
import {
  isOverDueTopic,
  isWillHappenTopic,
  isWorkingInProgressTopic,
} from "./utils";
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
  const [willHappenTopics, setWillHappenTopics] = useState<Topic[]>([]);
  const [itemsPerGroup, setItemsPerGroup] = useState<number[]>([0, 0, 0]);

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
    const willHappenTopics = topics
      .filter(filterTopicType(selectedType))
      .filter(isWillHappenTopic);
    setWorkingInProgressTopics(workingInProgressTopics);
    setOverdueTopics(overdueTopics);
    setWillHappenTopics(willHappenTopics);
    setItemsPerGroup([
      workingInProgressTopics.length,
      overdueTopics.length,
      willHappenTopics.length,
    ]);
  }, [topics, selectedType]);

  const titles = ["Work in progress", "Closed", "Will happen"];
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
        <div>
          {willHappenTopics.map((topic) => (
            <ActivityItem key={topic.id} topic={topic} course={course} />
          ))}
        </div>
      </CollapsibleList>
    </div>
  );
}
