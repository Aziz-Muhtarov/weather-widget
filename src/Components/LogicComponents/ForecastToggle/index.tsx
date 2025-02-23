import React from "react";
import s from './styles.module.scss'

interface ForecastToggleProps {
  mode: "daily" | "five-day";
  setMode: (mode: "daily" | "five-day") => void;
}

const ForecastToggle: React.FC<ForecastToggleProps> = ({ mode, setMode }) => {
  return (
    <div className={s.forecastToggle}>
      <button onClick={() => setMode("daily")} className={`${s.button} ${s.leftButton} ${mode === "daily" ? s.active : ""}`}>1 день</button>
      <button onClick={() => setMode("five-day")} className={`${s.button} ${s.rightButton} ${mode === "five-day" ? s.active : ""}`}>5 дней</button>
    </div>
  );
};

export default ForecastToggle;