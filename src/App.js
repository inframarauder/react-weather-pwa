import React, { useState, useEffect, Fragment } from "react";
import { fetchWeather } from "./api/fetchWeather";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!weather) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const data = await fetchWeather(
            null,
            pos.coords.latitude,
            pos.coords.longitude
          );

          setWeather(data);
        });
      }
    }
  }, [weather]);
  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery("");
    }
  };
  return (
    <Fragment>
      <nav className="app-title">WeatherApp</nav>
      <div className="main-container">
        <input
          type="text"
          className="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
        {weather && weather.main && (
          <div className="city">
            <h2 className="city-name">
              <span>{weather.name}</span>
              <sup>{weather.sys.country}</sup>
            </h2>
            <div className="city-temp">
              <sup>
                <img
                  className="city-icon"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
              </sup>
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>

              <span className="info">{weather.weather[0].description}</span>
              <span className="info">
                {weather.main.temp_min}
                <sup>&deg;C</sup> &darr; &uarr;{weather.main.temp_max}
                <sup>&deg;C</sup>
              </span>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default App;
