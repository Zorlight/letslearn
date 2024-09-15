import {
  FileAudio,
  FileText,
  FileUp,
  FileVideo,
  Link,
  ListTodo,
  ListVideo,
  Video,
} from "lucide-react";
import { ChoicesIcon } from "./icons";
import { TopicMap } from "@/models/topic";

const colorMap: TopicMap = {
  link: "text-green-700",
  meeting: "text-indigo-700",
  learning: "text-orange-700",
  assignment: "text-pink-600",
  choice: "#9333ea",
  file: {
    document: "text-cyan-600",
    audio: "text-yellow-500",
    video: "text-indigo-500",
  },
  quiz: "text-pink-500",
};

const iconMap: TopicMap = {
  link: Link,
  meeting: Video,
  learning: ListVideo,
  assignment: FileUp,
  choice: ChoicesIcon,
  file: {
    document: FileText,
    audio: FileAudio,
    video: FileVideo,
  },
  quiz: ListTodo,
};

export { colorMap, iconMap };
