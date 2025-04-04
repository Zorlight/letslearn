import DraggableContainer from "@/lib/@hello-pangea/draggable-container";
import { Button } from "@/lib/shadcn/button";
import { Topic, TopicType } from "@/models/topic";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateTopicDialog from "../dialogs/create-topic-dialog/create-topic-dialog";
import SectionDescription from "./section-description";
import CourseTopic from "../topic/course-topic";
import { Section } from "@/models/course";
import TopicTooltip from "../topic/topic-tooltip";

interface Props {
  section: Section;
  isEditting?: boolean;
  onCreateTopic?: (type: TopicType) => void;
  onDeleteTopic?: (id: string) => void;
  onReorderedTopic?: (data: Topic[]) => void;
  onSectionChange?: (section: Section) => void;
}
export default function SectionContent({
  section,
  isEditting,
  onDeleteTopic,
  onCreateTopic,
  onReorderedTopic,
  onSectionChange,
}: Props) {
  const { topics, description } = section;
  const [openCreateTopicDialog, setOpenCreateTopicDialog] = useState(false);
  const handleDeleteTopic = (id: string) => () => {
    if (onDeleteTopic) onDeleteTopic(id);
  };

  const handleSectionDescriptionChange = (value: string) => {
    if (onSectionChange) onSectionChange({ ...section, description: value });
  };

  const handleTopicTitleChange = (topic: Topic) => (value: string) => {
    const updatedTopics = topics.map((item) =>
      item.id === topic.id ? { ...item, title: value } : item
    );
    if (onSectionChange) onSectionChange({ ...section, topics: updatedTopics });
  };

  return (
    <div className="w-full space-y-5">
      {description && (
        <SectionDescription
          desc={description}
          isEditting={isEditting}
          onChange={handleSectionDescriptionChange}
        />
      )}
      <div className="flex flex-col">
        {isEditting && (
          <DraggableContainer
            data={topics || []}
            onReordered={onReorderedTopic}
            listItemClassName="gap-0"
            renderItem={(topic, index) => (
              <CourseTopic
                key={index}
                topic={topic}
                isEditing={isEditting}
                onDelete={handleDeleteTopic(topic.id)}
                onTitleChange={handleTopicTitleChange(topic)}
                className="hover:bg-gray-50"
              />
            )}
          />
        )}

        {!isEditting && (
          <div className="flex flex-col">
            {topics.map((topic, index) => (
              <TopicTooltip
                key={index}
                content={topic.data ? topic.data.description : ""}
              >
                <CourseTopic topic={topic} isEditing={isEditting} />
              </TopicTooltip>
            ))}
          </div>
        )}

        <div className="w-full flex justify-center pb-6">
          {isEditting && (
            <CreateTopicDialog
              open={openCreateTopicDialog}
              onOpenChange={setOpenCreateTopicDialog}
              onSelect={onCreateTopic}
              trigger={
                <Button variant="default" className="bg-indigo-700">
                  <Plus size={20} className="text-white" />
                  <span>New topic</span>
                </Button>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
