import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  activeModal,
  closeActiveModal,
}) {
  return (
    <div className={`modal ${activeModal ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          className="modal__close"
          onClick={closeActiveModal}
          type="button"
        ></button>
        <form className="modal__form">
          {children}
          <button className="modal__submit-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
