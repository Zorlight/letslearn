import { Topic, TopicType } from "@/models/topic";
import { useEffect, useState } from "react";
import CollapsibleList from "../collapsible/collapsible-list";
import ActivityItem from "./activity-item";

interface Props {
  topics: Topic[];
}
export default function AssignedList({ topics }: Props) {
  const [workingInProgressTopics, setWorkingInProgressTopics] = useState<
    Topic[]
  >([]);
  const [noDueDateTopics, setNoDueDateTopics] = useState<Topic[]>([]);
  const [itemsPerGroup, setItemsPerGroup] = useState<number[]>([0, 0]);

  const isWorkingInProgressTopic = (topic: Topic) => {
    const { type } = topic;
    const current = new Date();
    if (type === TopicType.QUIZ) {
      const { close } = topic.data;
      return close && new Date(close) > current;
    } else if (type === TopicType.ASSIGNMENT) {
      const { close } = topic.data;
      return close && new Date(close) > current;
    }
    return false;
  };
  const isNoDueDateTopic = (topic: Topic) => {
    const { type } = topic;
    if (type === TopicType.QUIZ) {
      const { close } = topic.data;
      return !close;
    } else if (type === TopicType.ASSIGNMENT) {
      const { close } = topic.data;
      return !close;
    }
    return false;
  };

  useEffect(() => {
    const workingInProgressTopics = topics.filter(isWorkingInProgressTopic);
    const noDueDateTopics = topics.filter(isNoDueDateTopic);
    setWorkingInProgressTopics(workingInProgressTopics);
    setNoDueDateTopics(noDueDateTopics);
    setItemsPerGroup([workingInProgressTopics.length, noDueDateTopics.length]);
  }, [topics]);

  const titles = ["Work in progress", "No due date"];
  return (
    <div className="w-full">
      <CollapsibleList titles={titles} itemsPerGroup={itemsPerGroup}>
        <div>
          {workingInProgressTopics.map((topic) => (
            <ActivityItem key={topic.id} topic={topic} />
          ))}
        </div>
        <div>
          {noDueDateTopics.map((topic) => (
            <ActivityItem key={topic.id} topic={topic} />
          ))}
        </div>
      </CollapsibleList>
    </div>
  );
}
