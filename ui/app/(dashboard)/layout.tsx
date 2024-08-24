import { ReactNode } from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";

interface Props {
  children: ReactNode;
}
const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <div className="h-[80px] w-full fixed flex flex-row px-6 items-center z-50 border-b inset-y-0 bg-white">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed z-50 border-r bg-white">
        <Sidebar />
      </div>

      <main className="md:pl-56 pt-[80px]">{children}</main>
    </div>
  );
};

export default DashboardLayout;
