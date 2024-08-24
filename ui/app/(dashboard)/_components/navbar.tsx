import MobileSidebar from "./mobile-sidebar";
import NavRoutes from "./nav-routes";

const Navbar = () => {
  return (
    <div className="w-full flex flex-row items-center justify-between">
      <MobileSidebar />
      <NavRoutes />
    </div>
  );
};

export default Navbar;
