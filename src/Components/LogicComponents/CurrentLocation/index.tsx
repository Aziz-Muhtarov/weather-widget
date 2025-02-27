import React, { useState } from "react";
import s from './styles.module.scss'

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
    <div className={s.buttonContainer}>
      <button onClick={getCurrentLocation} disabled={isLoading} className={s.button}>
        {isLoading
          ? "Получение местоположения..."
          : "Текущее местоположение"}
      </button>
    </div>
  );
};

export default CurrentLocation