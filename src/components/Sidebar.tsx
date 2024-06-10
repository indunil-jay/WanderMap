import { Outlet } from "react-router-dom";
import AppLogo from "./AppLogo";
import AppNav from "./AppNav";

const Sidebar = () => {
  return (
    <div className="w-full h-full lg:basis-[34rem] bg-dark-2 py-[2rem] lg:px-[2rem] flex flex-col items-center ">
      <AppLogo />
      <AppNav />

      <Outlet />

      <footer className="mt-auto hidden lg:block">
        <p className="text-[1.2rem] font-light  text-light-2 pointer-events-none">
          &copy; Copyright {new Date().getFullYear()} by WanderMap Inc.
        </p>
      </footer>
    </div>
  );
};

export default Sidebar;
