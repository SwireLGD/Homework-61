import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Constants';
import './CountryInfo.css';
import Loader from '../Loader/Loader';

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
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect (() => {
        const fetchData = async () => {

            if (!code) {
                return;
            }

            setIsLoading(true);

            const url = `${BASE_URL}v2/alpha/${code}?fields=name,capital,borders,flag`;

            try {
                const response = await axios.get(url);
                const borders = response.data.borders;

                if (borders && borders.length > 0) {
                    const borderName = await Promise.all(
                        borders.map(async (borderCode: string) => {
                            const response = await axios.get(`${BASE_URL}/v2/alpha/${borderCode}`);
                            return response.data.name;
                        })
                    );

                    response.data.borders = borderName;                    
                }
                setCountry(response.data);

            } catch (error)  {
                console.error('Failed to fetch data', error);
                setCountry(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [code]);

    if (!code) return <div className = 'notSelected'>Выберите страну</div>;

    return (
        <div className='CountryInfoBox'>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                {country?.flag && <img src={country.flag} alt={'Флаг'} className='flag' />}
                <h2>{country?.name}</h2>
                <p className='capital'>Столица: {country?.capital}</p>
                <p className='borders'>Соседние страны: {country?.borders.join(', ') || 'Нет соседних стран'}</p>
                </>
            )}   
        </div>
    );
};

export default CountryInfo;