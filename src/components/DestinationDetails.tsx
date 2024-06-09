import { Link, useNavigate, useParams } from "react-router-dom";
import { useDestination } from "../contexts/Destinations";
import { useEffect, MouseEvent } from "react";
import Spinner from "./Spinner";
import { dateFormater } from "./DestinationItem";
import Button from "./Button";

const DestinationDetails = () => {
  const { id } = useParams();
  const { getDestination, currentDestination, isLoading } = useDestination();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getDestination(id);
    }
  }, [id]);

  if (isLoading || !currentDestination) return <Spinner />;

  const { cityName, date, notes, country } = currentDestination;

  return (
    <div className="bg-dark-1  py-[4rem] px-[3rem] max-h-[80%] overflow-scroll overflow-x-hidden rounded-xl  w-full flex flex-col gap-5">
      <div className="flex items-center justify-center gap-5">
        <span className="w-[6rem] h-[4rem] bg-white rounded-sm"></span>
        <span className="text-3xl font-medium capitalize">{country}</span>
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-medium text-light-2 uppercase">
          Destination Name
        </span>
        <span className="text-[20px] font-medium capitalize text-light-1">
          {cityName}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-medium text-light-2 uppercase">
          You Went to lesbon on
        </span>
        <span className="text-[20px] font-medium capitalize text-light-1">
          {dateFormater(date)}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-medium text-light-2 uppercase">Your Note</span>
        <span className="text-[20px] font-medium capitalize text-light-1">
          {notes}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-medium text-light-2 uppercase">Learn More</span>
        <Link
          to={`https://en.wikipedia.org/wiki/?search=${cityName}`}
          className="text-[20px] font-medium capitalize text-secondary"
        >
          Check out {cityName} on Wikipedia &rarr;
        </Link>
      </div>
      <div className="flex flex-col items-start">
        <Button
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </div>
  );
};

export default DestinationDetails;
