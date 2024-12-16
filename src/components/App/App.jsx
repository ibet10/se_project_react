import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
//import ModalWithForm from "../ModalWithForm/ModalWithForm";
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

  //Open "preview" Modal
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  //Open "add-garmet" Modal
  const handleAddClick = () => {
    setActiveModal("add-garmet");
  };

  // Close "ActiveModal"
  const closeActiveModal = () => {
    setActiveModal("");
  };

  // Toggle Temperature
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // Add new item
  const handleAddItemCardSubmit = async (newItem) => {
    try {
      const createdItem = await addItem({
        name: newItem.name,
        imageUrl: newItem.imgUrl,
        weather: newItem.weather.toLowerCase(),
      });
      setClothingItems((prevItems) => [createdItem, ...prevItems]);
      closeActiveModal();
      console.log("Image URL:", newItem.imgUrl);
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };
  /*
  const handleAddItemCardSubmit = (newItem) => {
    addItem(newItem)
      .then((createdItem) => {
        setClothingItems([createdItem, ...clothingItems]);
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  };
  */

  // Delete item by Id
  const handleDeleteItemCard = async (itemId) => {
    try {
      await deleteItem(itemId);
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );
      closeActiveModal();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };
  /*
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
  */

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
  /*
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        console.log(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);
*/

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
  /*
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error(`Error fetching items: ${err}`);
      });
  }, []);
  */

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
