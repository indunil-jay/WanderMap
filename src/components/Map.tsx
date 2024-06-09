import { useNavigate, useSearchParams } from "react-router-dom";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div
      className="flex-1  bg-dark-3 relative"
      onClick={() => navigate("form")}
    >
      <h1>MAp</h1>
      <h1>
        {lat}:{lng}
      </h1>
      <button
        onClick={() => {
          setSearchParams({
            lat: "123",
            lng: "456",
          });
        }}
      >
        set new
      </button>
    </div>
  );
};

export default Map;
