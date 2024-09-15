"use client";
import CourseList from "@/components/ui/course-list";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import InfoCard from "./_components/info-card";
import { CheckCircle, Clock } from "lucide-react";
import { useState } from "react";
import { fakeCourses } from "@/fake-data/course";

const DashboardPage = () => {
  // const router = useRouter();
  // const isLogin = useAppSelector((state) => state.profile.isLogin);
  // if (!isLogin) {
  //   router.push("/login");
  //   return null;
  // }
  const [inprogress, setInprogress] = useState(0);
  const [completed, setCompleted] = useState(0);
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <InfoCard
            Icon={Clock}
            label="In Progress"
            numberOfItems={inprogress}
          />
        </div>
        <div>
          <InfoCard
            Icon={CheckCircle}
            label="Completed"
            numberOfItems={completed}
            variant="success"
          />
        </div>
      </div>
      <CourseList courses={fakeCourses} />
    </div>
  );
};

export default DashboardPage;
