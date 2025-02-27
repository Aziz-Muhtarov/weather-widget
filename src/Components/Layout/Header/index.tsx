import React from "react";
import { SearchBar } from "../../LogicComponents/Search/index";
import CurrentLocation from "../../LogicComponents/CurrentLocation";
import s from "./styles.module.scss";

interface HeaderProps {
  onSearch: (query: string) => void;
  onLocationSuccess: (lat: number, lon: number) => void;
  onLocationError: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onLocationSuccess, onLocationError }) => {
  return (
    <div className={s.header}>
        <h1>Прогноз погоды</h1>
        <SearchBar onSearch={onSearch} />
        <CurrentLocation onLocationSuccess={onLocationSuccess} onLocationError={onLocationError}/>
    </div>
  );
};

export default Header;
