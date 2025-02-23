import React, { useState } from 'react';
import s from './styles.module.scss';

interface SearchBarProps {
    onSearch: (city: string) => void;
}

export const SearchBar : React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.trim() !== "") {
            onSearch(query);
            setQuery("");
        }
    };
    

    return (
        <div className={s.searchWrapper}>
            <input 
            type="text"
            placeholder="Введите город..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={s.searchInput}
            />
            <button onClick={handleSearch} className={s.searchButton}>Поиск</button>
        </div>
    )
};