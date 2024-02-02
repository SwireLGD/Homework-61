import { useState } from 'react';
import CountryList from './Components/CountryList/CountryList';
import CountryInfo from './Components/CountryInfo/CountryInfo';
import './App.css';

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  return (
    <div className= 'App'>
      <CountryList onSelect={setSelectedCountry}/>
      <CountryInfo code={selectedCountry} />
    </div>
  );
};

export default App;
