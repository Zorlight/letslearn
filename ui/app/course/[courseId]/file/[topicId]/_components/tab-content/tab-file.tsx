import { cn } from "@/lib/utils";
import { FileTopic } from "@/models/topic";
import Link from "next/link";
import { toast } from "react-toastify";

interface Props {
  topic: FileTopic;
  className?: string;
}
const TabFile = ({ className, topic }: Props) => {
  const { file } = topic.data;
  const handleDownloadFile = () => {
    if (!file || !file.downloadUrl)
      toast.info("Please go to settings to set the file");
  };
  return (
    <div className={cn("", className)}>
      <p>
        <span>Click </span>
        <Link
          className="text-file font-bold hover:underline underline-offset-2 cursor-pointer"
          href={file && file.downloadUrl ? file.downloadUrl : ""}
          onClick={handleDownloadFile}
        >
          Download
        </Link>{" "}
        to test the file uploaded
      </p>
    </div>
  );
};

export default TabFile;
