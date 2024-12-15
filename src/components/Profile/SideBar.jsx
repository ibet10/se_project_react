import React from "react";
import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__user-menu">
        <img className="sidebar__avatar" src={avatar} alt="user avatar image" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    </div>
  );
}

export default SideBar;
