import { IUniqueDestinationCountrty } from "./CountriesList";

type Props = {
  destination: IUniqueDestinationCountrty;
};

const dateFormater = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

const CountryItem = ({ destination }: Props) => {
  return (
    <li className="bg-dark-3 rounded-md px-7 py-3 flex items-center justify-center border-l-[8px] border-secondary transition-all hover:shadow-lg shadow-dark-3/70">
      <div className="flex flex-col items-center gap-1">
        <p className="">{destination.emoji}</p>
        <h3 className="text-[20px] font-medium capitalize">
          {destination.country}
        </h3>
        <time className="text-[14px] font-light capitalize">
          Next tour scheduled on {dateFormater(destination.date)}
        </time>
      </div>
    </li>
  );
};

export default CountryItem;
