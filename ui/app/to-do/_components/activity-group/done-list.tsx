import { fakeTopics } from "@/fake-data/topic";
import { Topic, TopicType } from "@/models/topic";
import { useEffect, useState } from "react";
import CollapsibleList from "../collapsible/collapsible-list";
import ActivityItem from "./activity-item";

export default function DoneList() {
  const [topics, setTopics] = useState<Topic[]>(fakeTopics);

  const [doneTopics, setDoneTopics] = useState<Topic[]>([]);
  const [itemsPerGroup, setItemsPerGroup] = useState<number[]>([0, 0]);

  const isDoneTopic = (topic: Topic) => {
    const { type } = topic;
    if (type === TopicType.QUIZ) {
      const { close } = topic.data;
      return close && new Date(close) < new Date();
    } else if (type === TopicType.ASSIGNMENT) {
      const { close } = topic.data;
      return close && new Date(close) < new Date();
    }
    return false;
  };

  useEffect(() => {
    const doneTopics = topics.filter(isDoneTopic);
    setDoneTopics(doneTopics);
    setItemsPerGroup([doneTopics.length]);
  }, [topics]);

  const titles = ["Done"];
  return (
    <div className="w-full">
      <CollapsibleList titles={titles} itemsPerGroup={itemsPerGroup}>
        <div>
          {doneTopics.map((topic) => (
            <ActivityItem key={topic.id} topic={topic} />
          ))}
        </div>
      </CollapsibleList>
    </div>
  );
}
