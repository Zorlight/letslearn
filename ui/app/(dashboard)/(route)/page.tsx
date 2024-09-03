"use client";
import CourseList from "@/components/ui/course-list";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { courseWithProgress } from "@/app/(dashboard)/_components/fakedata";
import InfoCard from "./_components/info-card";
import { CheckCircle, Clock } from "lucide-react";

const DashboardPage = () => {
  // const router = useRouter();
  // const isLogin = useAppSelector((state) => state.profile.isLogin);
  // if (!isLogin) {
  //   router.push("/login");
  //   return null;
  // }
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <InfoCard
            Icon={Clock}
            label="In Progress"
            numberOfItems={courseWithProgress.length}
          />
        </div>
        <div>
          <InfoCard
            Icon={CheckCircle}
            label="Completed"
            numberOfItems={courseWithProgress.length}
            variant="success"
          />
        </div>
      </div>
      <CourseList items={courseWithProgress} />
    </div>
  );
};

export default DashboardPage;
