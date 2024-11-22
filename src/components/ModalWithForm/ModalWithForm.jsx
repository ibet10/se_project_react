import "./ModalWithForm.css";

function ModalWithForm() {
  return (
    <div className="modal">
      <form className="modal__form">
        <h2 className="modal__title">New garment</h2>
        <button className="modal__close" type="button">
          CLOSE
        </button>
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
          <label className="modal__label modal__label_type_radio" htmlFor="hot">
            <input className="modal__radio-input" type="radio" id="hot" />
          </label>
          <label
            className="modal__label modal__label_type_radio"
            htmlFor="warm"
          >
            <input className="modal__radio-input" type="radio" id="warm" />
          </label>
          <label
            className="modal__label modal__label_type_radio"
            htmlFor="cold"
          >
            <input className="modal__radio-input" type="radio" id="cold" />
          </label>
        </fieldset>
      </form>
    </div>
  );
}

export default ModalWithForm;
