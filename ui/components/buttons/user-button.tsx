import ImageDisplay from "@/lib/cloudinary/image-display";
import { Button } from "@/lib/shadcn/button";
import { cn } from "@/lib/utils";

interface Props {
  userId: string;
  userName: string;
  imageUrl?: string;
  className?: string;
}
const UserButton = ({ userId, userName, imageUrl, className }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center gap-2 cursor-pointer",
        className
      )}
    >
      <ImageDisplay imageUrl={imageUrl} className="w-8 h-8 rounded-full" />
      <Button variant="link" className="p-0">
        {userName}
      </Button>
    </div>
  );
};

export default UserButton;
