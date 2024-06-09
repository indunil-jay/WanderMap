import { useParams } from "react-router-dom";

const currentCity = {
  cityName: "kadny",
  country: "sri lanka",
  emoji: "🇵🇹",
  date: "2027-10-31T15:59:59.138Z",
  notes: "My favorite city so far!",
};

const DestinationDetails = () => {
  const { cityName, emoji, date, notes } = currentCity;
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>{cityName}</h1>
      <p>{emoji}</p>
      <p>{date}</p>
      <p>{notes}</p>
    </div>
  );
};

export default DestinationDetails;
