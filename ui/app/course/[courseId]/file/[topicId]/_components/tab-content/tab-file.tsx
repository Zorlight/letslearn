import { cn } from "@/lib/utils";
import { FileTopic } from "@/models/topic";

interface Props {
  topic: FileTopic;
  className?: string;
}
const TabFile = ({ className, topic }: Props) => {
  const { file } = topic.data;
  return (
    <div className={cn("", className)}>
      <p>
        Click on{" "}
        <a
          className="text-file font-bold hover:underline underline-offset-2 cursor-pointer"
          href={file ? file.downloadUrl : undefined}
        >
          Download link
        </a>{" "}
        to test the file uploaded
      </p>
    </div>
  );
};

export default TabFile;
