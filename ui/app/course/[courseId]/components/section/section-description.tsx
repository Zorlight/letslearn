"use client";
import { Textarea } from "@/lib/shadcn/textarea";

interface Props {
  desc: string;
  isEditting?: boolean;
}
export default function SectionDescription({
  desc,
  isEditting = false,
}: Props) {
  return (
    <>
      {!isEditting ? (
        <h6 className="text-gray-500 font-medium text-sm">{desc}</h6>
      ) : (
        <Textarea
          defaultValue={desc}
          variant="no-border"
          className="text-gray-500 font-medium text-sm"
        />
      )}
    </>
  );
}
