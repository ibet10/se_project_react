import React from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import ModalWithForm from "../ModalWithForm/ModalWithForm"; //Add ModalWithForm?

import "./Profile.css";

function Profile({ onCardClick, clothingItems }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
