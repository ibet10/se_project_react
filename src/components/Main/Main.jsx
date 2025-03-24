import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
//import { defaultClothingItems } from "../../utils/constants";
// //No longer use, instead pass clothingItems prop here and to App Main

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  console.log("Weather type:", weatherData.type);
  console.log(
    "Items weather:",
    clothingItems.map((item) => item.weather)
  );

  return (
    <main className="content">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {Math.round(weatherData.temp[currentTemperatureUnit])}&deg;
          {currentTemperatureUnit}/ You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
