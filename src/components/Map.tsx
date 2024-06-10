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

const Map = () => {
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    7.303909698175265, 80.60415189943308,
  ]);
  const { geoPosition, getPosition, isGeoLocationLoading } = useGeolocation();

  // const [searchParams] = useSearchParams();
  // const lat = Number(searchParams.get("lat"));
  // const lng = Number(searchParams.get("lng"));
  const { lat, lng } = useURLPosition();

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
    <div className="flex-1  bg-dark-3 relative isolate">
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
        className="h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
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
