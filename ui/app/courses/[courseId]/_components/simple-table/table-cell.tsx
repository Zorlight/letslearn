import { cn } from "@/lib/utils";

interface CellProps {
  children: React.ReactNode;
  isLeftColumn?: boolean;
  className?: string;
}
const Cell = ({ children, isLeftColumn, className }: CellProps) => {
  return (
    <td
      className={cn(
        "p-2 border text-sm",
        isLeftColumn && "w-[200px] font-bold",
        className
      )}
    >
      {children}
    </td>
  );
};
export default Cell;
