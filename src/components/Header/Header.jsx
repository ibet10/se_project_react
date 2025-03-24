import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLoginClick,
  onLogout,
  onRegisterClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser } = useContext(CurrentUserContext) || {};

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      {!isLoggedIn ? (
        <div className="header__auth-buttons">
          <button className="header__button" onClick={onRegisterClick}>
            Sign Up
          </button>
          <button className="header__button" onClick={onLoginClick}>
            Log In
          </button>
        </div>
      ) : (
        <>
          <button className="header__button" onClick={onLogout}>
            Log Out
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">
                {currentUser?.name || "Username"}
              </p>
              <img
                className="header__avatar"
                src={currentUser?.avatar || avatar}
                alt="user avatar image"
              />
            </div>
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
