import { useState } from "react";

interface ICoordinates {
  lat: number;
  lng: number;
}

export function useGeolocation(defaultPosition: ICoordinates | null = null) {
  const [isGeoLocationLoading, setIsGeoLocationLoading] =
    useState<boolean>(false);

  const [geoPosition, setGeoPosition] = useState<ICoordinates | null>(
    defaultPosition
  );
  const [geoError, setGeoError] = useState<string>();

  function getPosition() {
    if (!navigator.geolocation)
      return setGeoError("Your browser does not support geolocation");

    setIsGeoLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsGeoLocationLoading(false);
      },
      (error) => {
        setGeoError(error.message);
        setIsGeoLocationLoading(false);
      }
    );
  }

  return { isGeoLocationLoading, geoPosition, geoError, getPosition };
}
