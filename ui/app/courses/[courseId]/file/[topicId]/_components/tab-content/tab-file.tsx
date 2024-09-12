import { Button } from "@/lib/shadcn/button";

const TabFile = () => {
  return (
    <div className="py-6">
      <div className="flex flex-row items-center gap-2 text-md">
        <span>Click on the</span>
        <Button variant="link" className="p-0 h-fit text-cyan-600 text-md">
          link
        </Button>{" "}
        <span>to view the file.</span>
      </div>
      <p className="text-sm text-slate-600 font-semibold">
        This is the link to Youtube
      </p>
    </div>
  );
};

export default TabFile;
