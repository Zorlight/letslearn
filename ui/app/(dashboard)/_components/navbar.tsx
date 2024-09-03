import MobileSidebar from "./mobile-sidebar";
import NavRoutes from "./nav-routes";
import SearchInput from "./search-input";

const Navbar = () => {
  return (
    <div className="w-full flex flex-row items-center justify-between md:pl-56">
      <MobileSidebar />
      <SearchInput />
      <NavRoutes />
    </div>
  );
};

export default Navbar;
