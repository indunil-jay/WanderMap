import { useAuth } from "../contexts/Auth";
import Button from "./Button";

const User = () => {
  const { user, isAuthenicated, logout } = useAuth();
  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  console.log(isAuthenicated);

  return (
    isAuthenicated && (
      <div className="absolute top-10 right-10 !z-[999999999] bg-dark-3 flex items-center gap-4 px-6 py-2 rounded-md">
        <span className="text-[22px]">Welcome, {user?.email}</span>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-primary/80 transition-colors hover:bg-primary rounded-full text-[20px] font-montserrat font-medium uppercase"
        >
          logout
        </button>
      </div>
    )
  );
};

export default User;