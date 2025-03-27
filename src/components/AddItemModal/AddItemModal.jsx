import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, closeActiveModal, buttonText }) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imgUrl: "",
    weather: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
  };

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: "",
        imgUrl: "",
        weather: "",
      });
    }
  }, [isOpen, setValues]);

  return (
    <ModalWithForm
      isOpen={isOpen === "add-garmet"}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      title="New garment"
      buttonText={buttonText}
    >
      <label className="modal__label" htmlFor="name">
        Name{" "}
        <input
          className="modal__input"
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label" htmlFor="imageUrl">
        Image{" "}
        <input
          className="modal__input"
          id="imageUrl"
          name="imgUrl"
          type="text"
          placeholder="Image URL"
          value={values.imgUrl}
          onChange={handleChange}
          required
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
              name="weather"
              value="hot"
              checked={values.weather === "hot"}
              onChange={handleChange}
              required
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
              name="weather"
              value="warm"
              checked={values.weather === "warm"}
              onChange={handleChange}
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
              name="weather"
              value="cold"
              checked={values.weather === "cold"}
              onChange={handleChange}
            />
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
