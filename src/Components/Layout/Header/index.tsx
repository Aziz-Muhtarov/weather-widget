import React from "react";
import { SearchBar } from "../../LogicComponents/Search/index";
import s from "./styles.module.scss";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <div className={s.header}>
        <h1>Прогноз погоды</h1>
        <SearchBar onSearch={onSearch} />
    </div>
  );
};

export default Header;
