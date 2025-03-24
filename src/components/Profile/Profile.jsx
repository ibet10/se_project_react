import React from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import EditProfileModal from "./EditProfileModal";

import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./Profile.css";

function Profile({ onCardClick, clothingItems, handleAddClick }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] =
    React.useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleProfileUpdate = (updatedData) => {
    setCurrentUser(updatedData);
    handleCloseEditProfileModal();
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onEditProfile={handleEditProfileClick} />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={handleCloseEditProfileModal}
        onSubmit={handleProfileUpdate}
        currentUser={currentUser}
      />
    </div>
  );
}

export default Profile;
