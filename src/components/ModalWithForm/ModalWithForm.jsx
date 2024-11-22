import "./ModalWithForm.css";

function ModalWithForm() {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">New garment</h2>
        <button className="modal__close" type="button"></button>
        <form className="modal__form">
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
            <label
              className="modal__label modal__label_type_radio"
              htmlFor="hot"
            >
              <input className="modal__radio-input" type="radio" id="hot" />
              Hot
            </label>
            <label
              className="modal__label modal__label_type_radio"
              htmlFor="warm"
            >
              <input className="modal__radio-input" type="radio" id="warm" />
              Warm
            </label>
            <label
              className="modal__label modal__label_type_radio"
              htmlFor="cold"
            >
              <input className="modal__radio-input" type="radio" id="cold" />
              Cold
            </label>
          </fieldset>
          <button className="modal__submit-button" type="submit">
            Add garmet
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
