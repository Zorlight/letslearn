import { Topic } from "@/models/topic";

interface Props {
  content: Topic;
  onClick?: (e: any) => void;
}
const CourseSidebarTopic = ({ content, onClick }: Props) => {
  return (
    <div
      className="pl-6 py-2 flex flex-row items-center transition-all text-sm text-slate-500 cursor-pointer select-none hover:text-slate-600 hover:bg-indigo-50"
      onClick={onClick}
    >
      {content.title}
    </div>
  );
};

export default CourseSidebarTopic;
