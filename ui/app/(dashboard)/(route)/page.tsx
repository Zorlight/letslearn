"use client";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  // const router = useRouter();
  // const isLogin = useAppSelector((state) => state.profile.isLogin);
  // if (!isLogin) {
  //   router.push("/login");
  //   return null;
  // }
  return <div>This is dashboard</div>;
};

export default DashboardPage;
