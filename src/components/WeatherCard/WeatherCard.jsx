import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {Math.round(weatherData.temp[currentTemperatureUnit])}&deg;
        {currentTemperatureUnit}
      </p>
      <img
        className="weather-card__image"
        src={weatherOption?.url}
        alt={`Card showing ${
          weatherOption?.day ? "day" : "night"
        } time weather`}
      />
    </section>
  );
}
export default WeatherCard;
