import { Topic } from "@/models/topic";
import CollapsibleList from "../collapsible/collapsible-list";
import ActivityItem from "./activity-item";

interface Props {
  doneTopics: Topic[];
}
export default function DoneList({ doneTopics }: Props) {
  const itemsPerGroup = [doneTopics.length];

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
