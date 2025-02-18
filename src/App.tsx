import React, { useState } from 'react';
import { SearchBar } from "./Components/Search/index";
import { WeatherDisplay } from "./Components/Result/index";
import { fetchCoordinates, fetchWeather } from "./Components/Api/index";
import CurrentLocation from "./Components/CurrentLocation"; // Импортируем компонент для текущего местоположения

export const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<{
    city: string;
    temperature: number;
    description: string;
    pressure: number;
    lat: number;
    lon: number;

  } | null>(null);

  // Функция обработки успешного получения местоположения
  const handleLocationSuccess = async (lat: number, lon: number) => {
    // Получаем название города по координатам
    const location = await fetchCoordinatesFromCoords(lat, lon);
    if (location) {
      const weather = await fetchWeather(lat, lon, location.name); // Используем название города для прогноза погоды
      if (weather) {
        setWeatherData({
          city: location.name, // Устанавливаем название города
          temperature: weather.temperature,
          description: weather.description,
          pressure: weather.pressure,
          lat,
          lon,
        });
      }
    } else {
      alert("Не удалось определить местоположение.");
    }
  };

  // Функция обработки ошибки получения местоположения
  const handleLocationError = () => {
    alert("Ошибка при получении местоположения.");
  };

  // Функция для получения города по координатам
  const fetchCoordinatesFromCoords = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0baa5368c1f880bf8c569f63e959ee91&units=metric&lang=ru`
      );
      const data = await response.json();
      return data?.name; // Возвращаем название города
    } catch (error) {
      console.error("Ошибка при получении города:", error);
      return null;
    }
  };

  // Функция для поиска города
  const handleSearch = async (city: string) => {
    const location = await fetchCoordinates(city);
    if (!location) {
      alert("Город не найден");
      return;
    }

    const weather = await fetchWeather(location.lat, location.lon, location.name);
    if (weather) {
      setWeatherData({
        city: weather.city,
        temperature: weather.temperature,
        description: weather.description,
        pressure: weather.pressure,
        lat: location.lat,
        lon: location.lon,
      });
    }
  };

  return (
    <div className="app">
      <h1>Прогноз погоды</h1>

      {/* Компонент для получения текущего местоположения */}
      <CurrentLocation
        onLocationSuccess={handleLocationSuccess}
        onLocationError={handleLocationError}
      />

      {/* Поисковая строка доступна всегда */}
      <SearchBar onSearch={handleSearch} />

      {weatherData && <WeatherDisplay {...weatherData} />}
    </div>
  );
};

export default App;