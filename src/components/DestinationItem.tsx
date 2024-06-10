import { Link } from "react-router-dom";
import { IDestination, useDestination } from "../contexts/Destinations";
import { MouseEvent } from "react";

type Props = {
  destination: IDestination;
};

export const dateFormater = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(new Date(date));
};

const DestinationItem = ({ destination }: Props) => {
  const { cityName, id, date, emoji, position } = destination;
  const { currentDestination, deleteDestination } = useDestination();

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteDestination(id);
  };

  return (
    <Link
      to={`${id}?destination=${cityName}&lat=${position.lat}&lng=${position.lng}`}
      className={` ${
        currentDestination?.id === id
          ? "border-2 border-primary border-l-[8px] "
          : "border-l-[8px] border-primary"
      }   bg-dark-3 rounded-md px-7 py-3 flex items-center justify-between  transition-all hover:shadow-lg shadow-dark-3/70`}
    >
      <div className="flex items-center gap-3">
        <p className="w-[3.4rem] h-[2.2rem]  rounded-md font-montserrat">
          {emoji}
        </p>
        <h3 className="text-[20px] font-medium capitalize">{cityName}</h3>
      </div>
      <div className="flex items-center gap-3">
        <time className="text-[20px] font-light capitalize">
          {dateFormater(date)}
        </time>

        <button
          onClick={handleDelete}
          className="w-[2rem] h-[2rem] aspect-square rounded-full bg-dark-1 grid place-content-center hover:text-dark-3 font-montserrat font-semibold  cursor-pointer transition-all hover:bg-light-1  "
        >
          &times;
        </button>
      </div>
    </Link>
  );
};

export default DestinationItem;
