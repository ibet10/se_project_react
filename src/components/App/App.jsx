import { useState, useEffect } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

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

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        console.log(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
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

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        isOpen={activeModal === "add-garmet"}
        closeActiveModal={closeActiveModal}
        title="New garmet"
        buttonText="Add garmet"
      >
        <label className="modal__label" htmlFor="name">
          Name{" "}
          <input
            className="modal__input"
            id="name"
            type="text"
            placeholder="Name"
          />
        </label>
        <label className="modal__label" htmlFor="imageUrl">
          Image{" "}
          <input
            className="modal__input"
            id="imageUrl"
            type="text"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <div className="modal__radio-button-option">
            <label
              className="modal__label modal__label_type_radio"
              htmlFor="hot"
            >
              <input
                className="modal__radio-input"
                type="radio"
                id="hot"
                name="weatherType"
              />
              Hot
            </label>
          </div>

          <div className="modal__radio-button-option">
            <label
              className="modal__label modal__label_type_radio"
              htmlFor="warm"
            >
              <input
                className="modal__radio-input"
                type="radio"
                id="warm"
                name="weatherType"
              />
              Warm
            </label>
          </div>

          <div className="modal__radio-button-option">
            <label
              className="modal__label modal__label_type_radio"
              htmlFor="cold"
            >
              <input
                className="modal__radio-input"
                type="radio"
                id="cold"
                name="weatherType"
              />
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        closeActiveModal={closeActiveModal}
      />
    </div>
  );
}

export default App;
