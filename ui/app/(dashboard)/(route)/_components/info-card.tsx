import IconBadge from "@/components/ui/simple/icon-badge";
import { LucideIcon } from "lucide-react";

interface Props {
  Icon: LucideIcon;
  label: string;
  numberOfItems: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}
const InfoCard = ({
  Icon,
  label,
  numberOfItems,
  variant = "default",
  size = "default",
}: Props) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge
        icon={<Icon size={size == "default" ? 20 : 16} />}
        variant={variant}
        size={size}
      />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-600 text-sm">
          {numberOfItems} {numberOfItems <= 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
