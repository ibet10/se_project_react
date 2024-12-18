import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

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
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Open "preview" Modal
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  //Open "add-garmet" Modal
  const handleAddClick = () => {
    setActiveModal("add-garmet");
  };

  //Open "confirm-delete" Modal
  const openConfirmDeleteModal = (card) => {
    setCardToDelete(card);
    setActiveModal("confirm-delete");
  };

  // Close "ActiveModal"
  const closeActiveModal = () => {
    setActiveModal("");
    setCardToDelete(null);
  };

  // Toggle Temperature
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // Add new item
  const handleAddItemCardSubmit = async (newItem) => {
    setIsLoading(true);
    try {
      const createdItem = await addItem({
        name: newItem.name,
        imageUrl: newItem.imgUrl,
        weather: newItem.weather.toLowerCase(),
      });
      setClothingItems((prevItems) => [createdItem, ...prevItems]);
      closeActiveModal();
    } catch (err) {
      console.error("Error adding item:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete item by Id
  const handleDeleteItemCard = async () => {
    if (!cardToDelete) return;

    try {
      await deleteItem(cardToDelete._id);
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== cardToDelete._id)
      );
      closeActiveModal();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather(coordinates, APIkey);
        setWeatherData(filterWeatherData(data));
      } catch (err) {
        console.error("Error fetching weather:", err);
      }
    };
    fetchWeather();
  }, []);

  // Fetch clothing items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getItems();
        setClothingItems(items);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
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

  //console.log(currentTemperatureUnit);

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
                  handleAddClick={handleAddClick}
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
          buttonText={isLoading ? "Saving..." : "Add garmet"}
        />

        <ItemModal
          isOpen={activeModal}
          card={selectedCard}
          closeActiveModal={closeActiveModal}
          onDelete={() => openConfirmDeleteModal(selectedCard)}
        />

        <DeleteConfirmationModal
          isOpen={activeModal}
          closeActiveModal={closeActiveModal}
          onConfirm={handleDeleteItemCard}
          cardName={cardToDelete?.name}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
