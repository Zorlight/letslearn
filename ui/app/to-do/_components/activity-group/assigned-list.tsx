import { Topic } from "@/models/topic";
import CollapsibleList from "../collapsible/collapsible-list";
import ActivityItem from "./activity-item";

interface Props {
  workingInProgressTopics: Topic[];
  noDueDateTopics: Topic[];
}
export default function AssignedList({
  workingInProgressTopics,
  noDueDateTopics,
}: Props) {
  const itemsPerGroup = [
    workingInProgressTopics.length,
    noDueDateTopics.length,
  ];

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
