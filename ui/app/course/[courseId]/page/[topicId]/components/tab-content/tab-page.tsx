import EditorDisplay from "@/lib/tinymce/editor-display";
import { PageTopic } from "@/models/topic";
interface Props {
  page: PageTopic;
}
export default function TabPage({ page }: Props) {
  return (
    <div>
      <EditorDisplay htmlString={page.data.content} />
    </div>
  );
}
