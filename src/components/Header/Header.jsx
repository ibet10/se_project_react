import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ handleAddClick }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="WTWR logo" />
      <p className="header__date-location">DATE, LOCATION</p>
      <button
        className="header__add-clothes-button"
        onClick={handleAddClick}
        type="button"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img className="header__avatar" src={avatar} alt="user avatar image" />
      </div>
    </header>
  );
}

export default Header;
