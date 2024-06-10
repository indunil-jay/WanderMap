import { Link, useLocation } from "react-router-dom";
import { navigation } from "../constants";
import Button from "./Button";
import AppLogo from "./AppLogo";

const Navigation = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex justify-between items-center">
      <AppLogo />
      <div className="flex items-center  gap-3">
        <ul className="hidden  lg:flex lg:gap-3">
          {navigation.map((item) => (
            <Link
              to={item.url}
              key={item.id}
              className={`${
                pathname === item.url && "text-primary hover:text-primary"
              } text-light-2 label-1 px-6 xl:px-10 py-4 transition-colors hover:text-light-1`}
            >
              {item.name}
            </Link>
          ))}
        </ul>

        <Button>Login</Button>
      </div>
    </nav>
  );
};

export default Navigation;
