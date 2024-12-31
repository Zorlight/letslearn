import { Topic } from "@/models/topic";
import CollapsibleList from "../collapsible/collapsible-list";
import ReviewItem from "./review-item";

interface Props {
  workingInProgressTopics: Topic[];
  closedTopics: Topic[];
  noDueDateTopics: Topic[];
}
export default function ReviewList({
  workingInProgressTopics,
  closedTopics,
  noDueDateTopics,
}: Props) {
  const titles = ["Work in progress", "Closed", "No due date"];
  const itemsPerGroup = [
    workingInProgressTopics.length,
    closedTopics.length,
    noDueDateTopics.length,
  ];
  return (
    <div className="w-full">
      <CollapsibleList titles={titles} itemsPerGroup={itemsPerGroup}>
        <div>
          {workingInProgressTopics.map((topic) => (
            <ReviewItem key={topic.id} topic={topic} />
          ))}
        </div>
        <div>
          {closedTopics.map((topic) => (
            <ReviewItem key={topic.id} topic={topic} />
          ))}
        </div>
        <div>
          {noDueDateTopics.map((topic) => (
            <ReviewItem key={topic.id} topic={topic} />
          ))}
        </div>
      </CollapsibleList>
    </div>
  );
}
