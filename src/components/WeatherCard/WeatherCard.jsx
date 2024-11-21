import "./WeatherCard.css";
import daysunny from "../../assets/daytime/day_sunny.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75 &deg; F</p>
      <img className="weather-card__image" src={daysunny} alt="" />
    </section>
  );
}
export default WeatherCard;
