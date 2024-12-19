import { Topic } from "@/models/topic";
import CollapsibleList from "../collapsible/collapsible-list";
import ActivityItem from "./activity-item";
interface Props {
  overdueTopics: Topic[];
}
export default function OverdueList({ overdueTopics }: Props) {
  const itemsPerGroup = [overdueTopics.length];

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
