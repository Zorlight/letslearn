"use client";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import { cn } from "@/lib/utils";
import { FileTopicData } from "@/models/file-topic";
import { LinkData } from "@/models/link";
import {
  colorMap,
  iconMap,
  isValidType,
  Topic,
  TopicMap,
} from "@/models/topic";
import { Role } from "@/models/user";
import { useAppSelector } from "@/redux/hooks";
import { Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  topic: Topic;
  isEditing?: boolean;
  onDelete?: () => void;
  onTitleChange?: (value: string) => void;
  className?: string;
}

const CourseTopic = ({
  topic,
  isEditing = false,
  onDelete,
  onTitleChange,
  className,
}: Props) => {
  const router = useRouter();
  const path = usePathname();
  const user = useAppSelector((state) => state.profile.value);
  const { title, type } = topic;

  const getTopicIcon = (type: keyof TopicMap) => {
    return iconMap[type];
  };

  const getTopicColor = (type: keyof TopicMap) => {
    return colorMap[type];
  };

  const handleLinkAction = () => {
    if (!user) return;
    if (user.role === Role.TEACHER) router.push(`${path}/link/${topic.id}`);
    if (!topic.data) return;
    const { url } = topic.data as LinkData;
    if (!url || url === "") return;
    if (user.role === Role.STUDENT) window.open(url, "_blank");
  };

  const handleMeetingAction = () => {
    router.push(`${path}/meeting/${topic.id}`);
  };

  const handleAssignmentAction = () => {
    router.push(`${path}/assignment/${topic.id}`);
  };

  const handleFileAction = () => {
    //download file
    if (!user) return;
    if (user.role === Role.STUDENT) {
      const { file } = topic.data as FileTopicData;
      if (!file) return;
      const downloadUrl = file.downloadUrl;
      router.push(downloadUrl);
    } else {
      router.push(`${path}/file/${topic.id}`);
    }
  };

  const handleQuizAction = () => {
    router.push(`${path}/quiz/${topic.id}`);
  };

  const handlePageAction = () => {
    router.push(`${path}/page/${topic.id}`);
  };

  const actionMap: TopicMap = {
    link: handleLinkAction,
    meeting: handleMeetingAction,
    assignment: handleAssignmentAction,
    file: handleFileAction,
    quiz: handleQuizAction,
    page: handlePageAction,
  };

  const handleTopicClick = () => {
    const action = actionMap[type];
    action();
  };

  const handleTopicTitleChange = (e: any) => {
    if (onTitleChange) onTitleChange(e.target.value);
  };

  const Icon = getTopicIcon(type);
  const color = getTopicColor(type);

  if (!isValidType(type)) return null;

  return (
    <div
      className={cn(
        "w-full flex items-center justify-between px-4 py-6 border-t-[0.5px] transition-all duration-200 hover:bg-gray-50",
        isEditing && "border-transparent",
        !isEditing && "border-gray-300",
        className
      )}
    >
      <div className="w-full flex flex-row items-center gap-4 pr-4">
        <Icon size={18} className={cn(color)} />
        {!isEditing && (
          <Button
            variant="link"
            className={cn("h-fit p-0 text-cyan-500 gap-0")}
            onClick={handleTopicClick}
          >
            {title}
          </Button>
        )}

        {isEditing && (
          <Input
            variant="no-border"
            placeholder="Topic title here"
            defaultValue={title}
            className="w-full text-cyan-500 bg-transparent"
            onChange={handleTopicTitleChange}
          />
        )}
      </div>

      {isEditing && (
        <div className="flex flex-row gap-4">
          <Trash2
            size={18}
            className="text-red-500 cursor-pointer hover:text-red-600 duration-200"
            onClick={onDelete}
          />
        </div>
      )}
    </div>
  );
};

export default CourseTopic;
