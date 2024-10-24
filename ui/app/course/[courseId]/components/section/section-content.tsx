import React from "react";
import CourseTopic from "../topic/course-topic";
import { Topic } from "@/models/topic";
import SectionDescription from "./section-description";
import { Button } from "@/lib/shadcn/button";
import { Plus } from "lucide-react";

interface Props {
  desc: string | null;
  topics: Topic[];
  isEditting?: boolean;
}
export default function SectionContent({ desc, topics, isEditting }: Props) {
  return (
    <div className="w-full space-y-5">
      {desc && <SectionDescription desc={desc} isEditting={isEditting} />}
      <div className="flex flex-col">
        {topics.map((topic, index) => (
          <CourseTopic key={index} topic={topic} isEditing={isEditting} />
        ))}
        {isEditting && (
          <div className="w-full flex justify-center pb-6">
            <Button variant="default" className="bg-indigo-700">
              <Plus size={20} className="text-white" />
              <span>New topic</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
