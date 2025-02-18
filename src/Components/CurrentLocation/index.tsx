import React, { useState } from "react";

interface CurrentLocationProps {
  onLocationSuccess: (lat: number, lon: number) => void;
  onLocationError: () => void;
}

const CurrentLocation: React.FC<CurrentLocationProps> = ({
  onLocationSuccess,
  onLocationError,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          onLocationSuccess(lat, lon);
          setIsLoading(false);
        },
        () => {
          onLocationError();
          setIsLoading(false);
        }
      );
    } else {
      onLocationError();
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={getCurrentLocation} disabled={isLoading}>
        {isLoading
          ? "Получение местоположения..."
          : "Использовать текущее местоположение"}
      </button>
    </div>
  );
};

export default CurrentLocation