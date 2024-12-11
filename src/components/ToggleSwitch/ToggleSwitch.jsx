import React, { useState } from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  const [currentTemperatureUnit, handleToggleSwitchChange] = useState("F");

  const handleChange = (e) => {
    if (currentTemperatureUnit === "F") handleToggleSwitchChange("C");
    if (currentTemperatureUnit === "C") handleToggleSwitchChange("F");
  };
  console.log(currentTemperatureUnit);
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        onChange={handleChange}
      />
      <span
        className={
          currentTemperatureUnit === "C"
            ? "toggle-switch__slider toggle-switch_C"
            : "toggle-switch__slider toggle-switch_F"
        }
      ></span>
      <p
        className={`toggle-switch_temp-C ${
          currentTemperatureUnit === "C" && "toggle-switch__active"
        }`}
      >
        C
      </p>
      <p
        className={`toggle-switch_temp-F ${
          currentTemperatureUnit === "F" && "toggle-switch__active"
        }`}
      >
        F
      </p>
    </label>
  );
};

export default ToggleSwitch;
