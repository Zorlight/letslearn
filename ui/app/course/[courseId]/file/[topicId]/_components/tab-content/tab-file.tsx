import { cn } from "@/lib/utils";
import { FileTopic } from "@/models/topic";
import { User } from "@/models/user";

interface Props {
  topic: FileTopic;
  className?: string;
}
const TabFile = ({ className, topic }: Props) => {
  return <div className={cn("", className)}>File</div>;
};

export default TabFile;
