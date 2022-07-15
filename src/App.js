import "./App.css";
import { useState } from "react";
import { WEATHER_API_URL } from "./components/search/api";
import CurrentWeather from "./components/current_weather/current-weather";
import Search from "./components/search/search";
import Forecast from "./components/forecast/forecast";
import AirPollution from "./components/air_pollution/air-pollution";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [airPollution, setAirPollution] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    );

    const weatherForecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    );

    const airPollutionFetch = fetch(
      `${WEATHER_API_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, weatherForecastFetch, airPollutionFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        const pollutionResponse = await response[2].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
        setAirPollution({ city: searchData.label, ...pollutionResponse });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {airPollution && <AirPollution data={airPollution} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
