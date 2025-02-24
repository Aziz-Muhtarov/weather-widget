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
  icon: any;
  pressure: number;
  humidity: number;
  wind: number;
  sunrise: string;
  sunset: string;
}



// Функция для форматирования даты из строки в dd-mm-yyyy
const formatDateFromString = (dateString: string): string => {
  // Преобразуем строку в объект Date
  const date = new Date(dateString); // Конструктор Date автоматически парсит строку в формате "yyyy-mm-dd hh:mm:ss"

  // Извлекаем день, месяц и год
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяц начинается с 0, поэтому добавляем 1
  const year = date.getFullYear();

  return `${day}-${month}-${year}`; // Форматируем как dd-mm-yyyy
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

// Функция для получения названия города по координатам
export const fetchCoordinatesFromCoords = async (lat: number, lon: number): Promise<string | null> => {
  try {
      const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`
      );
      const data = await response.json();
      return data.name || null;
  } catch (error) {
      console.error("Ошибка при получении названия города:", error);
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
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    };
  } catch (error) {
    console.error("Ошибка при получении погоды:", error);
    return null;
  }
};

// Функция проверки прогноза погоды за 5 дней
export const fetchFiveDayForecast = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`
    );
    const data = await response.json();

    console.log('5 Day Forecast Data:', data.list);
    
    return data.list.map((item: any) => ({
      date: formatDateFromString(item.dt_txt), // Пытаюсь поменять формат даты
      temperature: Math.round(item.main.temp),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      pressure: item.main.pressure,
      humidity: item.main.humidity,
      wind: item.wind.speed,
      sunrise: item.sys.sunrise,
      sunset: item.sys.sunset,
    }));
  } catch (error) {
    console.error("Ошибка загрузки прогноза на 5 дней:", error);
    return null;
  }
};