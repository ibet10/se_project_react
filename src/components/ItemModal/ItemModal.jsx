import "./ItemModal.css";

function ItemModal({ activeModal, card, closeActiveModal }) {
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close"
          onClick={closeActiveModal}
          type="button"
        ></button>
        <img className="modal__image" src={card.link} alt={card.name} />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

/*
<ModalWithForm
          isOpen={activeModal === "add-garmet"}
          closeActiveModal={closeActiveModal}
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
            <div className="modal__radio-button-option">
              <label
                className="modal__label modal__label_type_radio"
                htmlFor="hot"
              >
                <input
                  className="modal__radio-input"
                  type="radio"
                  id="hot"
                  name="weatherType"
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
                />
                Cold
              </label>
            </div>
          </fieldset>
        </ModalWithForm>
*/
