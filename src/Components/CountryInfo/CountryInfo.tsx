import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Constants';

interface CountryInfoProps {
    code: string | null;
};

interface Country {
    name: string;
    capital: string;
    borders: string[];
    flag: string;
};

const CountryInfo: React.FC<CountryInfoProps> = ({ code }) => {
    const [country, setCountry] = useState<Country | null>(null);

    useEffect (() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`${BASE_URL}v2/alpha/${code}?fields=name,capital,borders,flag`);
                setCountry(response.data);
            } catch (error)  {
                console.error('Failed to fetch data', error);
                setCountry(null);
            }
        };

        fetchData();
    }, [code]);

    if (!code) return <p>Выберите страну</p>;

    return (
        <div className='CountryInfoBox'>
            {country?.flag && <img src={country.flag} alt={'Флаг'} className='flag' />}
            <h2>{country?.name}</h2>
            <p>Столица: {country?.capital}</p>
            <p>Соседние страны: {country?.borders?.join(', ') || 'Нет соседних стран'}</p>
        </div>
    );
};

export default CountryInfo;