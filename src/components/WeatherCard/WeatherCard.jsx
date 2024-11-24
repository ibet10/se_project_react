import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
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
  //const weatherOption = filteredOptions[0];
  //const weatherOptionUrl = filteredOption[0]?.url;
  //const weatherOptionCondition = filteredOption[0]?.condition;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {Math.round(weatherData.temp.F)}&deg; F
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
