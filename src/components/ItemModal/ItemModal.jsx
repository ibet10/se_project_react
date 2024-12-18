import React from "react";
import "./ItemModal.css";

function ItemModal({ isOpen, card, closeActiveModal, onDelete }) {
  const handleDelete = () => {
    onDelete(card._id);
  };

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
          <button
            className="modal__delete-button"
            onClick={() => onDelete(card)}
            //onClick={handleDelete}
            type="button"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
