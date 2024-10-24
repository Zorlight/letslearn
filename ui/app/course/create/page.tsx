"use client";
import { Combobox } from "@/components/ui/combobox";
import PageLayout from "@/components/ui/util-layout/page-layout";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateCoursePage() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const [courseName, setCourseName] = useState("");
  const [category, setCategory] = useState("");
  const visibilityOptions = ["Private", "Public"];
  const [visibility, setVisibility] = useState(false);
  const visibilityDescriptions = [
    "Only participants can access the course",
    "Anyone can access the course",
  ];
  const handleComboboxChange = (value: string) => {
    setVisibility(value === visibilityOptions[1]);
  };
  return (
    <PageLayout className="flex flex-col p-5">
      <div
        className="w-fit h-fit p-3 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200 duration-200"
        onClick={handleBack}
      >
        <ArrowLeft size={20} />
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="max-w-4xl space-y-6">
          <div className="space-y-2">
            <h4>Name your course</h4>
            <p className="text-sm text-gray-500">
              {
                "What would you like to name your course? Don't worry, you can change it later."
              }
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="" className="font-bold">
              Name
            </label>
            <Input placeholder="e.g. Introduce to Astronomy" />
            <p className="text-sm text-gray-500">
              What will you teach in this course?
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="" className="font-bold">
              Category
            </label>
            <Input placeholder="e.g. Astronomy" />
            <p className="text-sm text-gray-500">
              What subject area best describes your course?
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="" className="font-bold">
              Visibility
            </label>
            <Combobox
              options={visibilityOptions}
              initialValue={visibilityOptions[0]}
              popoverClassName="w-[200px] text-gray-800"
              showSearch={false}
              onChange={handleComboboxChange}
            >
              <Button
                variant="outline"
                className="w-[200px] justify-between text-gray-800 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 data-[state=open]:border-blue-500"
              >
                {visibility ? visibilityOptions[1] : visibilityOptions[0]}
                <ChevronDown className="text-gray-500" />
              </Button>
            </Combobox>
            <p className="text-sm text-gray-500">
              {visibility
                ? visibilityDescriptions[1]
                : visibilityDescriptions[0]}
            </p>
          </div>
          <div className="flex justify-center">
            <Button className="">Save</Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
