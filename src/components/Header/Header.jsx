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
  console.log("Current User in Header:", currentUser);

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
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">
              {currentUser?.name || "Username"}
            </p>
            <div className="header__avatar">
              {currentUser?.avatar ? (
                <img
                  className="header__avatar-image"
                  src={currentUser.avatar}
                  alt="user avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser?.name
                    ? currentUser.name.charAt(0).toUpperCase()
                    : "U"}
                </div>
              )}
            </div>
          </div>
        </Link>
      )}
    </header>
  );
}

export default Header;
