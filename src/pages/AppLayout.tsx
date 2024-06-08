import Map from "../components/Map";
import Sidebar from "../components/Sidebar";

const AppLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Map />
    </div>
  );
};

export default AppLayout;
