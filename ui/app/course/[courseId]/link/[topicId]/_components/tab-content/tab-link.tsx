import { cn } from "@/lib/utils";
import { LinkTopic } from "@/models/topic";

interface Props {
  topic: LinkTopic;
  className?: string;
}
const TabLink = ({ className, topic }: Props) => {
  return (
    <div className={cn("", className)}>
      <p>
        Click on{" "}
        <span className="text-link font-bold hover:underline underline-offset-2 cursor-pointer">
          Link
        </span>{" "}
        to test the destination link
      </p>
    </div>
  );
};

export default TabLink;
