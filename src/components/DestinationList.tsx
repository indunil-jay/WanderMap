import { useDestination } from "../contexts/Destinations";
import DestinationItem from "./DestinationItem";
import Spinner from "./Spinner";

const DestinationList = () => {
  const { destinations, isLoading } = useDestination();
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <ul className="w-full h-[65vh] list-none overflow-x-hidden overflow-y-scroll flex flex-col gap-3  ">
      {destinations.map((destination) => (
        <DestinationItem key={destination?.id} destination={destination} />
      ))}
    </ul>
  );
};

export default DestinationList;
