import { cn } from "@/lib/utils";
import { LinkTopic } from "@/models/topic";

interface Props {
  topic: LinkTopic;
  className?: string;
}
const TabLink = ({ className, topic }: Props) => {
  const handleClickLink = () => {
    if (!topic.data) return;
    const { url } = topic.data;
    if (!url || url === "") return;
    window.open(url, "_blank");
  };
  return (
    <div className={cn("", className)}>
      <p>
        Click on{" "}
        <span
          className="text-link font-bold hover:underline underline-offset-2 cursor-pointer"
          onClick={handleClickLink}
        >
          Link
        </span>{" "}
        to test the destination link
      </p>
    </div>
  );
};

export default TabLink;
