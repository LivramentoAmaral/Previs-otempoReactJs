// App.jsx
import React, { useState } from 'react';
import './App.css';
import Search from './Components/Search';


function App() {
  const [weatherData, setWeatherData] = useState(null);

  const handleWeatherUpdate = (data) => {
    setWeatherData(data);
  };

  return (
    <>
      <header>
        <Search onWeatherUpdate={handleWeatherUpdate} />
      </header>
      <main>
        <h1>Previsão do tempo...</h1>
        {weatherData ? (
          <>
            <h2 className= 'description'>Local: {weatherData.name}, {weatherData.sys.country}</h2>
            <h2 className= 'description'> Temperatura: {weatherData.main.temp} °C</h2>
            <h2 className= 'description'>Condição: {weatherData.weather[0].description}</h2>
            <img
              src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weatherData.weather[0].icon}.svg`}
              alt={weatherData.weather[0].description}
            />  
          </>
        ) : (
          <>
            <p>Insira o nome de uma cidade para ver a previsão do tempo acima</p>
          </>
        )}
      </main>
    </>
  );
}

export default App;
