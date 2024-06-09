import { PiSpinnerLight } from "react-icons/pi";

const Spinner = () => {
  return (
    <div className="h-full flex items-start justify-center">
      <PiSpinnerLight size={60} className="transition-transform animate-spin" />
    </div>
  );
};

export default Spinner;
