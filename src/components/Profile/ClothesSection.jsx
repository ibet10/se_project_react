import React, { useState } from "react";
import ItemCard from "../ItemCard/ItemCard";

import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./ClothesSection.css";
//import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section_menu">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          className="clothes-section__add-clothes-button"
          type="button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items-list">
        {clothingItems
          .filter((item) => item.owner === currentUser._id)
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                currentUser={currentUser}
                onCardLike={onCardLike}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
