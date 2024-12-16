import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
/*import ModalWithForm from "../ModalWithForm/ModalWithForm";*/
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garmet");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddItemCardSubmit = (newItem) => {
    addItem(newItem)
      .then((createdItem) => {
        setClothingItems([createdItem, ...clothingItems]);
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  };

  const handleDeleteItemCard = (itemCardId) => {
    deleteItem(itemCardId)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item.id !== itemCardId)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        console.log(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  //This data needs to be rendered as cards. Handle in Main and Profile components
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error(`Error fetching items: ${err}`);
      });
  }, []);

  useEffect(() => {
    const handleEscapeClick = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    const handleOutsideClick = (e) => {
      if (
        e.target.classList.contains("modal_opened") &&
        !e.target.closest(".modal__content")
      ) {
        closeActiveModal();
      }
    };

    if (activeModal) {
      document.addEventListener("keydown", handleEscapeClick);
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeClick);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [activeModal]);

  console.log(currentTemperatureUnit);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            ></Route>
          </Routes>

          <Footer />
        </div>

        <AddItemModal
          isOpen={activeModal}
          onAddItem={handleAddItemCardSubmit}
          closeActiveModal={closeActiveModal}
        />

        <ItemModal
          isOpen={activeModal}
          card={selectedCard}
          closeActiveModal={closeActiveModal}
          onDelete={handleDeleteItemCard}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
