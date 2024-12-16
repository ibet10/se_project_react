import React from "react";
import "./ItemModal.css";

import { deleteItem } from "../../utils/api";

function ItemModal({ isOpen, card, closeActiveModal, onDelete }) {
  /*const handleDelete = (card) => {
    if (!card || !card._id) {
      console.error("Card ID is missing");
      return;
    }

    onDelete(card._id);
    closeActiveModal();
  };
  */

  return (
    <div className={`modal ${isOpen === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close"
          onClick={closeActiveModal}
          type="button"
        ></button>
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button className="modal__delete-button" onClick={onDelete}>
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
