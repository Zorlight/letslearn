import { Topic } from "@/models/course";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

interface Props {
  content: Topic;
}
const CourseSidebarChapterItem = ({ content }: Props) => {
  const path = usePathname();
  const href = `${path}/${content.type}/${content.id}`;
  return (
    <Link
      href={href}
      className="pl-6 py-2 flex flex-row items-center transition-all text-sm text-slate-500 cursor-pointer select-none hover:text-slate-600 hover:bg-indigo-50"
    >
      {content.title}
    </Link>
  );
};

export default CourseSidebarChapterItem;
