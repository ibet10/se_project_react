import "./ModalWithForm.css";
import { useRef, useState, useEffect } from "react";

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
  const formRef = useRef(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkValidity = () => {
      if (formRef.current) {
        setIsValid(formRef.current.checkValidity());
      }
    };

    checkValidity();

    const form = formRef.current;
    if (form) {
      form.addEventListener("input", checkValidity);
      return () => form.removeEventListener("input", checkValidity);
    }
  }, [isOpen]);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          className="modal__close"
          onClick={closeActiveModal}
          type="button"
        />
        <form
          ref={formRef}
          className="modal__form"
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <div className="modal__button-container">
            <button
              className={`modal__submit-button ${
                !isValid ? "modal__submit-button_disabled" : ""
              }`}
              type="submit"
              disabled={!isValid}
            >
              {buttonText}
            </button>

            {alternativeButtonText && (
              <button
                className="modal__alternative-button"
                type="button"
                onClick={onAlternativeClick}
              >
                {alternativeButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
