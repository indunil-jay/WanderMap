import { Outlet } from "react-router-dom";
import AppLogo from "./AppLogo";
import AppNav from "./AppNav";

const Sidebar = () => {
  return (
    <div className="basis-[56rem] bg-dark-2 py-[5rem] px-[3rem] flex flex-col items-center ">
      <AppLogo />
      <AppNav />

      <Outlet />

      <footer className="mt-auto">
        <p className="text-[1.2rem] text-light-2">
          &copy; Copyright {new Date().getFullYear()} by WanderMao Inc.
        </p>
      </footer>
    </div>
  );
};

export default Sidebar;
