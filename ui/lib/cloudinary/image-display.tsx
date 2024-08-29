import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ImageIcon } from "lucide-react";
import { CldImage } from "next-cloudinary";

interface Props {
  imageUrl: string | null | undefined;
  className?: ClassValue;
}
const ImageDisplay = ({ imageUrl, className }: Props) => {
  return (
    <div className={cn("w-full rounded-md overflow-hidden", className)}>
      {imageUrl ? (
        <CldImage
          width={1600}
          height={900}
          src={imageUrl}
          alt="Course image"
          className="w-full"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
          <ImageIcon size={32} className="text-slate-600" />
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
