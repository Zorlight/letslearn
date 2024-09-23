import { Separator } from "@/lib/shadcn/separator";
import { cn } from "@/lib/utils";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
  fullWidth?: boolean;
  className?: string;
  hasSeparator?: boolean;
}
const TabContentLayout = ({
  children,
  fullWidth = false,
  className,
  hasSeparator = true,
}: Props) => {
  return (
    <div className={cn("relative", !fullWidth && className)}>
      {hasSeparator && <Separator />}
      <div className="flex flex-col py-4">{children}</div>
    </div>
  );
};

export default TabContentLayout;
