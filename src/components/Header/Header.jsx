import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      <button
        className="header__add-clothes-button"
        onClick={handleAddClick}
        type="button"
      >
        + Add clothes
      </button>

      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img
            className="header__avatar"
            src={avatar}
            alt="user avatar image"
          />
        </div>
      </Link>
    </header>
  );
}

export default Header;
