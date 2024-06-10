import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";

const AppLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:h-screen relative ">
      <Sidebar />
      <Map />

      <User />
    </div>
  );
};

export default AppLayout;
