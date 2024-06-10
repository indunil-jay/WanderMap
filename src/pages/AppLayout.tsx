import Map from "../components/Map";
import Sidebar from "../components/Sidebar";

const AppLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:h-screen">
      <Sidebar />
      <Map />
    </div>
  );
};

export default AppLayout;
