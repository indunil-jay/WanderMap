import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LeafletMouseEvent } from "leaflet";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { useURLPosition } from "../hooks/useURLPosition";
import { useDestination } from "../contexts/Destinations";

const Map = () => {
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    7.303909698175265, 80.60415189943308,
  ]);
  const { geoPosition, getPosition, isGeoLocationLoading } = useGeolocation();
  const { lat, lng } = useURLPosition();
  const { destinations } = useDestination();

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([lat, lng]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (geoPosition) {
      setMapPosition([geoPosition.lat, geoPosition.lng]);
    }
  }, [geoPosition]);

  return (
    <div className="flex-1 h-full lg:h-screen bg-dark-3 p-[2rem] relative">
      {geoPosition && (
        <div className="absolute !z-[99999999999] bottom-10 right-10">
          <Button onClick={getPosition}>
            {isGeoLocationLoading ? "Loading..." : "USE YOUR LOCATION"}
          </Button>
        </div>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className="h-[30rem] mb-[8rem] lg:h-full "
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {destinations.map((destination) => (
          <Marker
            position={[destination.position.lat, destination.position.lng]}
            key={destination.id}
          >
            <Popup>
              <span>{destination.emoji}</span>{" "}
              <span>{destination.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

interface ICenterMap {
  position: [number, number];
}

const ChangeCenter = ({ position }: ICenterMap) => {
  const map = useMap();
  map.setView(position, 6);
  return null;
};

const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e: LeafletMouseEvent) =>
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });

  return null;
};

export default Map;
