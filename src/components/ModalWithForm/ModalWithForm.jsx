import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  isOpen,
  closeActiveModal,
  onSubmit,
  alternativeButtonText,
  onAlternativeClick,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          className="modal__close"
          onClick={closeActiveModal}
          type="button"
        />
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__button-container">
            <button className="modal__submit-button" type="submit">
              {buttonText}
            </button>
            <button
              className="modal__alternative-button"
              type="button"
              onClick={onAlternativeClick}
            >
              {alternativeButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
