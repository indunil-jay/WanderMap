import { IDestination } from "../App";
import CountryItem from "./CountryItem";

type Props = {
  destinations: IDestination[];
  isLoading: boolean;
};

export interface IUniqueDestinationCountrty {
  id: number;
  country: string;
  emoji: string;
  date: string;
}

const CountriesList = ({ destinations }: Props) => {
  const uniqueDestinations: IUniqueDestinationCountrty[] = destinations.reduce<
    IUniqueDestinationCountrty[]
  >((acc, destination) => {
    const { country, emoji, date, id } = destination;
    // Check if this combination is already in the accumulator
    const exists = acc.some((data) => data.country === country);
    if (!exists) {
      acc.push({ country, emoji, date, id });
    }
    return acc;
  }, []);

  return (
    <ul className="w-full h-[65vh] list-none overflow-x-hidden overflow-y-scroll grid grid-cols-2 content-start gap-4  ">
      {uniqueDestinations.map((destination) => (
        <CountryItem key={destination.id} destination={destination} />
      ))}
    </ul>
  );
};

export default CountriesList;
