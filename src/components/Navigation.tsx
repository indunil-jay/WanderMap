import { Link, useLocation } from "react-router-dom";
import { navigation } from "../constant";
import Button from "./Button";

const Navigation = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex justify-between items-center">
      <div>
        <Link
          to="/"
          className="text-[2.8rem] text-white font-semibold cursor-pointer transition-colors hover:gradient-text-type-1"
        >
          WanderMap
        </Link>
      </div>
      <div className="flex items-center  gap-4">
        <ul className="flex gap-4 ">
          {navigation.map((item) => (
            <Link
              to={item.url}
              key={item.id}
              className={`${
                pathname === item.url && "text-primary hover:text-primary"
              } text-light-2 text-[18px] uppercase font-semibold px-10 py-4 transition-colors hover:text-light-1`}
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
