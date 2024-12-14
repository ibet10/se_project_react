import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, closeActiveModal }) => {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImgUrlChange = (e) => {
    setImgUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imgUrl, weather });
    closeActiveModal();
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImgUrl("");
      setWeather("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      isOpen={isOpen === "add-garmet"}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
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
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label className="modal__label" htmlFor="imageUrl">
        Image{" "}
        <input
          className="modal__input"
          id="imageUrl"
          type="text"
          placeholder="Image URL"
          value={imgUrl}
          onChange={handleImgUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <div className="modal__radio-button-option">
          <label className="modal__label modal__label_type_radio" htmlFor="hot">
            <input
              className="modal__radio-input"
              type="radio"
              id="hot"
              name="weatherType"
              value="hot"
              checked={weather === "hot"}
              onChange={handleWeatherChange}
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
              value="warm"
              checked={weather === "warm"}
              onChange={handleWeatherChange}
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
              value="cold"
              checked={weather === "cold"}
              onChange={handleWeatherChange}
            />
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
