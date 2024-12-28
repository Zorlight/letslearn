import { cn } from "@/lib/utils";
import { FileTopic } from "@/models/topic";
import Link from "next/link";

interface Props {
  topic: FileTopic;
  className?: string;
}
const TabFile = ({ className, topic }: Props) => {
  const { file } = topic.data;
  return (
    <div className={cn("", className)}>
      <p>
        <span>Click </span>
        <Link
          className="text-file font-bold hover:underline underline-offset-2 cursor-pointer"
          href={file ? file.downloadUrl : ""}
        >
          Download
        </Link>{" "}
        to test the file uploaded
      </p>
    </div>
  );
};

export default TabFile;
