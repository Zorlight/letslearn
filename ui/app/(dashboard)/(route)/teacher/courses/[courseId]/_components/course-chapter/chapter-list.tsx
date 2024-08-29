"use client";
import { Chapter } from "@/models/chapter";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useState } from "react";
import ChapterItem from "./chapter-item";

interface Props {
  data: Chapter[];
  onEdit?: (chapter: Chapter) => void;
  onReordered?: (chapters: Chapter[]) => void;
}
const ChapterList = ({ data, onEdit, onReordered }: Props) => {
  const [chapters, setChapters] = useState<Chapter[]>(data);
  const handleDragEnd = (result: DropResult) => {
    const dragIndex = result.source.index;
    const dropIndex = result.destination?.index;
    if (dropIndex === undefined || dragIndex === dropIndex) return;

    const newChapters = [...chapters];
    const [removed] = newChapters.splice(dragIndex, 1);
    newChapters.splice(dropIndex, 0, removed);

    newChapters.map((chapter, index) => ({
      ...chapter,
      position: index,
    }));

    setChapters(newChapters);
    if (onReordered) onReordered(newChapters);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <div className="flex flex-col gap-2">
              {chapters.length === 0 && (
                <p className="text-sm text-slate-600 italic">No chapter</p>
              )}
              {chapters.map((chapter, index) => (
                <Draggable
                  key={chapter.id}
                  draggableId={chapter.id}
                  index={index}
                >
                  {(provided) => (
                    <ChapterItem
                      provided={provided}
                      chapter={chapter}
                      onEdit={() => {
                        if (onEdit) onEdit(chapter);
                      }}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChapterList;
