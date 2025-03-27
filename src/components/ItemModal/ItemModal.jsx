import React from "react";
import "./ItemModal.css";
import useModalClose from "../../hooks/useModalClose";

import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, card, closeActiveModal, onDelete }) {
  useModalClose(isOpen === "preview", closeActiveModal);
  const { currentUser } = useContext(CurrentUserContext) || {};

  const isOwn =
    currentUser && card && card.owner ? card.owner === currentUser._id : false;

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
          {isOwn && (
            <button
              className="modal__delete-button"
              onClick={() => onDelete(card)}
              type="button"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
