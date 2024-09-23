import { Button } from "@/lib/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/lib/shadcn/dialog";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleX, Info, TriangleAlert } from "lucide-react";
import React from "react";

type Variant = "default" | "warning" | "error" | "success";
const iconMap = {
  default: <Info size={16} className="text-blue-500" />,
  warning: <TriangleAlert size={16} className="text-yellow-500" />,
  error: <CircleX size={16} className="text-red-500" />,
  success: <CircleCheck size={16} className="text-green-500" />,
};

interface Props {
  control?: {
    open: boolean;
    setOpen: (open: boolean) => void;
  };
  variant?: Variant;
  children?: React.ReactNode;
  title: string;
  content: React.ReactNode;
  onYes?: () => void;
  onNo?: () => void;
  onOk?: () => void;
  onCancel?: () => void;
}
const CustomDialog = ({
  control,
  variant = "default",
  children,
  title,
  content,
  onYes,
  onNo,
  onOk,
  onCancel,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const handleYes = () => {
    setOpen(false);
    if (onYes) onYes();
  };
  const handleNo = () => {
    setOpen(false);
    if (onNo) onNo();
  };
  const handleOk = () => {
    setOpen(false);
    if (onOk) onOk();
  };
  const handleCancel = () => {
    setOpen(false);
    if (onCancel) onCancel();
  };
  return (
    <Dialog
      open={control ? control.open : open}
      onOpenChange={control ? control.setOpen : setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>
          <div className="flex flex-row items-center gap-2">
            {iconMap[variant]}
            <span className="font-semibold">{title}</span>
          </div>
        </DialogTitle>
        {content}
        <DialogFooter>
          {onYes && (
            <Button
              variant="default"
              size="sm"
              onClick={handleYes}
              className={cn(
                variant === "success" && "bg-green-500 hover:bg-green-600",
                variant === "error" && "bg-red-500 hover:bg-red-600",
                variant === "warning" && "bg-yellow-500 hover:bg-yellow-600"
              )}
            >
              Yes
            </Button>
          )}
          {onOk && (
            <Button
              variant="default"
              size="sm"
              onClick={handleOk}
              className={cn(
                variant === "success" && "bg-green-500 hover:bg-green-600",
                variant === "error" && "bg-red-500 hover:bg-red-600",
                variant === "warning" && "bg-yellow-500 hover:bg-yellow-600"
              )}
            >
              OK
            </Button>
          )}
          {onNo && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNo}
              className="hover:bg-gray-100"
            >
              No
            </Button>
          )}
          {onCancel && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="hover:bg-gray-100"
            >
              Cancel
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
