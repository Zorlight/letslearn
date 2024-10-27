import EditorDisplay from "@/lib/tinymce/editor-display";
import { getTextFromHtml } from "@/lib/utils";
import { Page } from "@/models/page";
import React from "react";
interface Props {
  page: Page;
}
export default function TabPage({ page }: Props) {
  return (
    <div>
      <EditorDisplay htmlString={page.content}></EditorDisplay>
    </div>
  );
}
