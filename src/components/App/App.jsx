import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

import {
  getToken,
  removeToken,
  checkToken,
  register,
  login,
} from "../../utils/auth";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  //Universal handler function
  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  //Open "preview" Modal
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // Handle Likes
  const handleCardLike = ({ id, isLiked }) => {
    !isLiked
      ? addCardLike(id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
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

  //Open "Login" Modal
  const handleLoginClick = () => {
    setActiveModal("login");
  };

  //Open "Registration" Modal
  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  /*
    const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };
  */
  // Handle Logging In
  const handleLogin = ({ email, password }) => {
    const makeRequest = async () => {
      const userData = await login({ email, password });
      setIsLoggedIn(true);
      setCurrentUser(userData);
    };

    handleSubmit(makeRequest);
  };
  /*const handleLogin = async ({ email, password }) => {
    try {
      const userData = await login({ email, password });
      console.log("Login userData:", userData);
      if (userData) {
        setIsLoggedIn(true);
        setCurrentUser(userData);
        closeActiveModal();
      }
    } catch (err) {
      console.error("Login attempt failed, :( ", err);
      throw err;
    }
  };
  */

  // Handle Registration
  const handleRegistration = ({ name, avatar, email, password }) => {
    const makeRequest = async () => {
      const userData = await register({ email, password, name, avatar });
      setIsLoggedIn(true);
      setCurrentUser(userData);
    };

    handleSubmit(makeRequest);
  };
  /*
  const handleRegistration = async ({ name, avatar, email, password }) => {
    try {
      const userData = await register({ email, password, name, avatar });
      setIsLoggedIn(true);
      setCurrentUser(userData);
      closeActiveModal();
    } catch (err) {
      console.error("Registration attempt failed, :( ", err);
    }
  };
*/

  // Handle Logging Out
  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Toggle Temperature
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // Add new item
  const handleAddItemCardSubmit = (newItem) => {
    const makeRequest = async () => {
      const response = await addItem({
        name: newItem.name,
        imageUrl: newItem.imgUrl,
        weather: newItem.weather.toLowerCase(),
      });
      const createdItem = response.data;
      setClothingItems((prevItems) => [createdItem, ...prevItems]);
    };

    handleSubmit(makeRequest);
  };
  /*
  const handleAddItemCardSubmit = async (newItem) => {
    setIsLoading(true);
    try {
      const response = await addItem({
        name: newItem.name,
        imageUrl: newItem.imgUrl,
        weather: newItem.weather.toLowerCase(),
      });
      const createdItem = response.data;
      setClothingItems((prevItems) => [createdItem, ...prevItems]);
      closeActiveModal();
    } catch (err) {
      console.error("Error adding item:", err);
    } finally {
      setIsLoading(false);
    }
  };
*/

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

  //Check for an existing Token
  useEffect(() => {
    const checkUserSession = async () => {
      setIsCheckingAuth(true);
      try {
        const token = getToken();
        if (token) {
          const userData = await checkToken(token);
          setIsLoggedIn(true);
          setCurrentUser(userData);
        } else {
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error checking user session:", error);
        setIsLoggedIn(false);
        setCurrentUser(null);
        removeToken();
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkUserSession();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="page">
        {isCheckingAuth ? null : (
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                isLoggedIn={isLoggedIn}
                onLoginClick={handleLoginClick}
                onRegisterClick={handleRegisterClick}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                    />
                  }
                ></Route>
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        onCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        handleAddClick={handleAddClick}
                        handleLogout={handleLogout}
                        onCardLike={handleCardLike}
                      />
                    </ProtectedRoute>
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

            <RegisterModal
              isOpen={activeModal === "register"}
              onRegister={handleRegistration}
              closeActiveModal={closeActiveModal}
              buttonText={"Sign up"}
              onRegisterClick={handleLoginClick}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              onLogin={handleLogin}
              closeActiveModal={closeActiveModal}
              buttonText={"Log in"}
              onLoginClick={handleRegisterClick}
            />
          </CurrentTemperatureUnitContext.Provider>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
