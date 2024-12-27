import { Card } from "@/lib/shadcn/card";
import { User } from "@/models/user";
import ColorItem from "./color-item";
import StudentList from "./student-list";

interface Props {
  students: User[];
}
export default function SummaryCard({ students }: Props) {
  return (
    <Card className="min-w-[250px] min-h-full flex flex-col gap-2 p-4 text-gray-500 text-sm border-0">
      <div className="flex flex-col gap-2">
        <Title
          title={
            students.length > 1 ? "Students attempted" : "Student attempted"
          }
          number={students.length}
        />
        <StudentList students={students} maxToShow={5} />
      </div>
      {/* <div className="flex flex-col gap-2">
        <Title title="Attempt summary" />
        <SmallChart sNum={1} aNum={3} bNum={5} cNum={4} other={5} />
      </div> */}
    </Card>
  );
}

interface TitleProps {
  title: string;
  number?: number;
}
const Title = ({ title, number }: TitleProps) => {
  return (
    <div className="flex flex-row gap-2 items-center font-bold">
      <span>{title}</span>
      {number && <ColorItem>{number}</ColorItem>}
    </div>
  );
};
