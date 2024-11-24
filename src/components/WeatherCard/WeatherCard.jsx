import "./WeatherCard.css";
import daysunny from "../../assets/daytime/day_sunny.png";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {Math.round(weatherData.temp.F)}&deg; F
      </p>
      <img className="weather-card__image" src={daysunny} alt="" />
    </section>
  );
}
export default WeatherCard;
