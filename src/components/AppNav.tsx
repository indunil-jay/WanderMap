import { Link, useLocation } from "react-router-dom";
import { appnavigation } from "../constant";

const AppNav = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <nav className="mt-[3rem] mb-[2rem]">
      <ul className="flex bg-dark-3 rounded-full">
        {appnavigation.map((item) => (
          <Link
            key={item.id}
            to={item.url}
            className={`block uppercase text-[12px] font-bold py-[10px] px-[24px] rounded-full ${
              item.url === pathname && "bg-dark-1"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default AppNav;