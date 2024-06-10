import { Link } from "react-router-dom";

const AppLogo = () => {
  return (
    <div>
      <Link
        to="/"
        className="text-[1.6rem]  lg:text-[2.2rem] text-white font-semibold cursor-pointer transition-colors hover:gradient-text-type-1"
      >
        WanderMap
      </Link>
    </div>
  );
};

export default AppLogo;
