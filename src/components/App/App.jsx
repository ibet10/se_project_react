import { useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main weatherData={weatherData} />
        <Footer />
      </div>
      <ModalWithForm title="New garmet" buttonText="Add garmet">
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
              <input className="modal__radio-input" type="radio" id="hot" />
              Hot
            </label>
          </div>

          <div className="modal__radio-button-option">
            <label
              className="modal__label modal__label_type_radio"
              htmlFor="warm"
            >
              <input className="modal__radio-input" type="radio" id="warm" />
              Warm
            </label>
          </div>

          <div className="modal__radio-button-option">
            <label
              className="modal__label modal__label_type_radio"
              htmlFor="cold"
            >
              <input className="modal__radio-input" type="radio" id="cold" />
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>
    </div>
  );
}

export default App;
