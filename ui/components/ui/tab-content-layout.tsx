import { Separator } from "@/lib/shadcn/separator";
import { cn } from "@/lib/utils";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
  fullWidth?: boolean;
  className?: string;
}
const TabContentLayout = ({
  children,
  fullWidth = false,
  className,
}: Props) => {
  return (
    <div className={cn("relative", !fullWidth && className)}>
      <Separator />
      <div className="flex flex-col py-4">{children}</div>
    </div>
  );
};

export default TabContentLayout;
