import React, { useState } from 'react';
import { WeatherDisplay } from "./Components/LogicComponents/Result/index";
import { fetchCoordinates, fetchWeather, fetchFiveDayForecast, fetchCoordinatesFromCoords } from "./Components/LogicComponents/Api/index";
import ForecastToggle from './Components/LogicComponents/ForecastToggle/index';
import Header from "./Components/Layout/Header/index";
import s from "./index.module.scss";

export const App: React.FC = () => {
  const [forecastMode, setForecastMode] = useState<"daily" | "five-day">("daily");
  const [city, setCity] = useState<string | null>(null);
  const [dailyWeatherData, setDailyWeatherData] = useState<any>(null);
  const [fiveDayWeatherData, setFiveDayWeatherData] = useState<any>(null);
  const [weatherData, setWeatherData] = useState<any>(null); 

  // Функция обработки успешного получения местоположения
  const handleLocationSuccess = async (lat: number, lon: number) => {
    const location = await fetchCoordinatesFromCoords(lat, lon);
    if (location) {
      setCity(location);

      const weather = await fetchWeather(lat, lon, location);
      setDailyWeatherData(weather);

      const forecast = await fetchFiveDayForecast(lat, lon);
      setFiveDayWeatherData(forecast);

      setWeatherData(forecastMode === "daily" ? weather : forecast);
    } else {
      alert("Не удалось определить местоположение.");
    }
  };

  // Функция для поиска города
  const handleSearch = async (city: string) => {
    const location = await fetchCoordinates(city);
    if (!location) {
      alert("Город не найден");
      return;
    }

    setCity(city);

    const weather = await fetchWeather(location.lat, location.lon, city);
    setDailyWeatherData(weather);

    const forecast = await fetchFiveDayForecast(location.lat, location.lon);
    setFiveDayWeatherData(forecast);

    setWeatherData(forecastMode === "daily" ? weather : forecast);
  };

  // Функция переключения режима
  const handleToggleMode = (mode: "daily" | "five-day") => {
    setForecastMode(mode);

    // Переключаем уже загруженные данные
    setWeatherData(mode === "daily" ? dailyWeatherData : fiveDayWeatherData);
  };

  return (
    <div className={s.app}>
      <ForecastToggle mode={forecastMode} setMode={handleToggleMode} />
      <Header 
      onSearch={handleSearch} 
      onLocationSuccess={handleLocationSuccess} 
      onLocationError={() => alert("Ошибка при получении местоположения.")} 
      />
      {weatherData && <WeatherDisplay city={city || ""} mode={forecastMode} weatherData={weatherData} />}
    </div>
  );
};

export default App;
