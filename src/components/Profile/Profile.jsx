import React from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import ModalWithForm from "../ModalWithForm/ModalWithForm"; //Add ModalWithForm?

import "./Profile.css";

function Profile({ onCardClick, clothingItems, handleAddClick }) {
  const [isModalActive, setIsModalActive] = React.useState(false);

  const handleAddItemClick = () => {
    setIsModalActive(true);
  };

  const closeAddItemModal = () => {
    setIsModalActive(false);
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
