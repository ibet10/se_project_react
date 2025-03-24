import React from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./Profile.css";

/*
function Profile() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleUpdateProfile = (newUserData) => {
    // Make API call to update user data
    // Then update the context
    setCurrentUser(newUserData);
  };
*/
function Profile({ onCardClick, clothingItems, handleAddClick }) {
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
