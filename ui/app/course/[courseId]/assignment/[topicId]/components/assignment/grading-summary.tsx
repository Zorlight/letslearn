import React from "react";

interface Props {
  hiddenFromStudent: number;
  assigned: number;
  submitted: number;
  needGrading: number;
}
const GradingSummary = ({
  hiddenFromStudent,
  assigned,
  submitted,
  needGrading,
}: Props) => {
  return (
    <div className="flex flex-col border rounded-lg">
      <Row title="Hidden from student">
        {hiddenFromStudent !== 0 ? hiddenFromStudent : "No"}
      </Row>
      <Row title="Assigned">{assigned}</Row>
      <Row title="Submitted">{submitted}</Row>
      <Row title="Need grading">{needGrading}</Row>
    </div>
  );
};
interface RowProps {
  title: string;
  children: React.ReactNode;
}
const Row = ({ title, children }: RowProps) => {
  return (
    <div className="flex flex-row items-center gap-3 py-2 px-4 odd:bg-gray-100 hover:bg-gray-50">
      <span className="font-semibold max-w-[200px] w-1/2">{title}</span>
      <p className="text-slate-600 text-sm">{children}</p>
    </div>
  );
};

export default GradingSummary;
