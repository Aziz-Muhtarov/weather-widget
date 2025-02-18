const API_KEY = "0baa5368c1f880bf8c569f63e959ee91";


interface GeoLocation {
  lat: number;
  lon: number;
  name: string;
}

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  pressure: number;
}

// Функция для получения координат по названию города
export const fetchCoordinates = async (city: string): Promise<GeoLocation | null> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();

    if (!data.length) {
      return null;
    }

    return {
      lat: data[0].lat,
      lon: data[0].lon,
      name: data[0].name,
    };
  } catch (error) {
    console.error("Ошибка при получении координат:", error);
    return null;
  }
};

// Функция для получения погоды по координатам
export const fetchWeather = async (lat: number, lon: number, city: string): Promise<WeatherData | null> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`
    );
    const data = await response.json();

    return {
      city,
      temperature: data.main.temp,
      description: data.weather[0].description,
      pressure: data.main.pressure,
    };
  } catch (error) {
    console.error("Ошибка при получении погоды:", error);
    return null;
  }
};