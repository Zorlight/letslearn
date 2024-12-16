import { fakeTopics } from "@/fake-data/topic";
import { Topic, TopicType } from "@/models/topic";
import { useEffect, useState } from "react";
import CollapsibleList from "../collapsible/collapsible-list";
import ActivityItem from "./activity-item";

export default function OverdueList() {
  const [topics, setTopics] = useState<Topic[]>(fakeTopics);

  const [overdueTopics, setOverdueTopics] = useState<Topic[]>([]);
  const [itemsPerGroup, setItemsPerGroup] = useState<number[]>([0]);
  const isOverDueTopic = (topic: Topic) => {
    const { type } = topic;
    const current = new Date();
    if (type === TopicType.QUIZ) {
      const { close } = topic.data;
      return close && new Date(close) < current;
    } else if (type === TopicType.ASSIGNMENT) {
      const { close } = topic.data;
      return close && new Date(close) < current;
    }
    return false;
  };

  useEffect(() => {
    const overdueTopics = topics.filter(isOverDueTopic);
    setOverdueTopics(overdueTopics);
    setItemsPerGroup([overdueTopics.length]);
  }, [topics]);

  const titles = ["Overdue"];
  return (
    <div className="w-full">
      <CollapsibleList titles={titles} itemsPerGroup={itemsPerGroup}>
        <div>
          {overdueTopics.map((topic) => (
            <ActivityItem key={topic.id} topic={topic} />
          ))}
        </div>
      </CollapsibleList>
    </div>
  );
}
