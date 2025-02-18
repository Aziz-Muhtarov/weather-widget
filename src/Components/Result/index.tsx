import React from 'react';

interface WeatherDisplayProps {
    city: string;
    lat: number;
    lon: number;
    temperature: number; // исправил "temprature" на "temperature"
    description: string;
    pressure: number;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city, temperature, description, pressure }) => {
    return (
        <div className="weather-display">
            <h2>Погода в {city}</h2>
            <p>{description}, {temperature}°C</p>
            <p>Атмосферное давление: {pressure} hPa</p> {/* Добавил давление */}
        </div>
    );
};