import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  src?: string;
  className?: string;
  onClick?: () => void;
}
export default function Avatar({ src, className, onClick }: Props) {
  return (
    <Image
      src={src || "/default-user.png"}
      alt="avatar"
      width={64}
      height={64}
      className={cn(
        "w-16 rounded-full object-cover overflow-hidden transition-all duration-200 cursor-pointer select-none",
        className
      )}
      onClick={onClick}
    />
  );
}
