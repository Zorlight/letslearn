import { Topic } from "@/models/topic";
import ReviewItem from "./review-item";

interface Props {
  topics: Topic[];
}
export default function NoDueDateGroup({ topics }: Props) {
  return (
    <div>
      {topics.map((topic) => (
        <ReviewItem key={topic.id} topic={topic} />
      ))}
    </div>
  );
}
