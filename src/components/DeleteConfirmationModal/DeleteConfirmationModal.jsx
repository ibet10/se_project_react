import React from "react";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({
  isOpen,
  closeActiveModal,
  onConfirm,
  cardName,
}) {
  return (
    <div
      className={`modal ${isOpen === "confirm-delete" ? "modal_opened" : ""}`}
    >
      <div className="modal__content modal__content_type_confirmation">
        <button
          className="modal__close"
          onClick={closeActiveModal}
          type="button"
        ></button>
      </div>
      <div className="modal__options">
        <h2 className="modal__confirm-caption">
          Are you sure you want to delete <strong>"{cardName}"</strong>? <br />{" "}
          This action is irreversible.
        </h2>
        <div className="modal__action-buttons">
          <button
            className="modal__button-delete"
            type="button"
            onClick={onConfirm}
          >
            Yes, delete item
          </button>
          <button
            className="modal__button-cancel"
            type="button"
            onClick={closeActiveModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
