import { IDestination } from "../App";

type Props = {
  destination: IDestination;
};

const dateFormater = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

const DestinationItem = ({ destination }: Props) => {
  return (
    <li className="bg-dark-3 rounded-md px-7 py-3 flex items-center justify-between border-l-[8px] border-primary transition-all hover:shadow-lg shadow-dark-3/70">
      <div className="flex items-center gap-3">
        <p className="w-[3.2rem] h-[2.2rem] bg-light-1 rounded-md"></p>
        <h3 className="text-[20px] font-medium capitalize">
          {destination.cityName}
        </h3>
      </div>
      <div className="flex items-center gap-3">
        <time className="text-[20px] font-light capitalize">
          {dateFormater(destination.date)}
        </time>
        <span className="w-[2rem] h-[2rem] aspect-square rounded-full bg-dark-1 text-[30px] font-medium flex items-center justify-center cursor-pointer transition-all hover:bg-light-1 hover:text-dark-3 ">
          &times;
        </span>
      </div>
    </li>
  );
};

export default DestinationItem;
