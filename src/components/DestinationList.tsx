import { IDestination } from "../App";
import DestinationItem from "./DestinationItem";
import Spinner from "./Spinner";

type Props = {
  destinations: IDestination[];
  isLoading: boolean;
};

const DestinationList = ({ isLoading, destinations }: Props) => {
  console.log(destinations);
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
