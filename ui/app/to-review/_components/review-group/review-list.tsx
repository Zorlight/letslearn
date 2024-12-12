import React, { useState } from "react";
import CollapsibleList from "../collapsible/collapsible-list";
import NoDueDateGroup from "./no-due-date-group";
import { Topic } from "@/models/topic";
import { fakeTopics } from "@/fake-data/topic";

export default function ReviewList() {
  const [noDueDateTopics, setNoDueDateTopics] = useState<Topic[]>(fakeTopics);
  const titles = ["No due date", "Work in progress", "Overdue"];
  const itemsPerGroup = [noDueDateTopics.length, 0, 0];
  return (
    <div className="w-full">
      <CollapsibleList titles={titles} itemsPerGroup={itemsPerGroup}>
        <NoDueDateGroup topics={noDueDateTopics} />
        <div>
          <p>Content 1</p>
        </div>
        <div>
          <p>Content 1</p>
        </div>
      </CollapsibleList>
    </div>
  );
}
