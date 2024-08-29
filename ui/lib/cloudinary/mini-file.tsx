import { LoadingCircle } from "@/components/icons/loading-circle";
import { DeleteFile } from "@/lib/cloudinary/cloudinary-handler";
import { AttachedFile } from "@/models/course";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  file: AttachedFile;
  onDeleted?: () => void;
}
const MiniFile = ({ file, onDeleted }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await DeleteFile(file.cloudUrl).finally(() =>
      setIsDeleting(false)
    );
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
      if (onDeleted) onDeleted();
    }
  };
  return (
    <div className="w-full h-fit px-2 py-1 rounded flex flex-row items-center justify-between bg-indigo-100 text-indigo-700">
      <span className="text-sm font-medium">{file.data.name}</span>
      {isDeleting ? (
        <LoadingCircle size={14} />
      ) : (
        <X
          size={14}
          className="text-indigo-700 hover:text-red-600 cursor-pointer ease-linear duration-200"
          onClick={handleDelete}
        />
      )}
    </div>
  );
};

export default MiniFile;
