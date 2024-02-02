import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LIST_URL } from '../../Constants';
import './CountryList.css';

interface CountryList {
    onSelect: (code: string) => void;
}

interface Country {
    name: string;
    alpha3Code: string;
}

const CountryList: React.FC<CountryList> = ({ onSelect }) => {
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(LIST_URL);
                setCountries(response.data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='CountryListBox'>
            <ul className='CountryList'>
                {countries.map(country => (
                    <li className='CountryItem' key={country.alpha3Code} onClick={() => onSelect(country.alpha3Code)}>
                        {country.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountryList;