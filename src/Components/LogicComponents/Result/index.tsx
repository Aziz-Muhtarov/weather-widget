import React from "react";
import moment from "moment";
import s from "./styles.module.scss";

interface DailyWeather {
  date: string;
  temperature: number;
  description: string;
  icon: any;
  pressure: number;
  humidity: number;
  wind: number;
  sunrise: number;
  sunset: number;
}

interface WeatherDisplayProps {
  city: string;
  mode: "daily" | "five-day";
  weatherData: DailyWeather | DailyWeather[];
}

const formatDateFromString = (timestamp: number): string => {
  return moment.unix(timestamp).format('DD-MM-YYYY');
};

// Функция для преобразования времени
const formatTime = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  city,
  mode,
  weatherData,
}) => {
  // Фильтрация прогноза погоды на 5 дней: запись берётся с "12:00"
  const dailyFilteredData = Array.isArray(weatherData)
    ? weatherData.filter((day) => day.date.includes("12:00:00"))
    : [];

  // console.log("weatherData:", weatherData);
  // console.log("dailyFilteredData:", dailyFilteredData);

  return (
    <div className={s.weatherDisplay}>
      {mode === "daily" && !Array.isArray(weatherData) ? (
        // 🔹 Прогноз на 1 день
        <div className={s.dailyWrapper}>
          <h2>Погода в {city}</h2>
          <div className={s.mainInfoDaily}>
            <p className={s.temperature}>{weatherData.temperature}°C</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
              alt={weatherData.description}
              className={s.weatherIcon}
            />
          </div>
          <p className={s.description}>{weatherData.description}</p>
          <div className={s.items}>
            <p className={s.item}>
              Атмосферное давление: <span>{weatherData.pressure} hPa</span>
            </p>
            <p className={s.item}>
              Влажность: <span>{weatherData.humidity}%</span>
            </p>
            <p className={s.item}>
              Скорость ветра: <span>{weatherData.wind} м/с</span>
            </p>
            <p className={s.item}>
              Восход солнца: <span>{formatTime(weatherData.sunrise || 0)}</span>
            </p>
            <p className={s.item}>
              Закат солнца: <span>{formatTime(weatherData.sunset || 0)}</span>
            </p>
          </div>
        </div>
      ) : (
        // 🔹 Прогноз на 5 дней
        <div className={s.container}>
          <h2>Погода в {city}</h2>
          <div className={s.fiveDayWrapper}>
            {dailyFilteredData.length > 0 ? (
              dailyFilteredData.map((day, index) => {
                // console.log("Day data:", day);
                return (
                  <div key={index} className={s.mainInfoFive}>
                    <h3 className={s.date}>
                      {formatDateFromString(moment(day.date, "YYYY-MM-DD HH:mm:ss").unix())}
                    </h3>
                    <div className={s.mainTitle}>
                      <p className={s.temperature}>{day.temperature}°C</p>
                      <img
                        src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                        alt={day.description}
                        className={s.weatherIcon}
                      />
                    </div>
                    <p className={s.description}>{day.description}</p>
                    <div className={s.items}>
                      <p className={s.item}>Давление: <span>{day.pressure} hPa</span></p>
                      <p className={s.item}>Влажность: <span>{day.humidity}%</span></p>
                      <p className={s.item}>Скорость ветра: <span>{day.wind} м/с</span></p>
                      <p className={s.item}>Восход солнца: <span>{formatTime(day.sunrise || 0)}</span></p>
                      <p className={s.item}>Закат солнца: <span>{formatTime(day.sunset || 0)}</span></p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Данные о погоде отсутствуют.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
