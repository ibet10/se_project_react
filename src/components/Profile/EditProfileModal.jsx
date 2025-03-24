import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({ isOpen, onClose, onSubmit, currentUser }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      name: name,
      avatar: avatar,
    };
    onSubmit(updatedData);
  };

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
    }
  }, [isOpen, currentUser]);

  return (
    <ModalWithForm
      title="Change profile data"
      isOpen={isOpen}
      closeActiveModal={onClose}
      onSubmit={handleOnSubmit}
      buttonText="Save changes"
    >
      <label className="modal__label" htmlFor="name-edit-profile">
        Name*{" "}
        <input
          className="modal__input"
          type="text"
          id="name-edit-profile"
          placeholder="Name"
          name="name"
          value={name}
          minLength="1"
          maxLength="30"
          required
          onChange={handleNameChange}
        />
      </label>

      <label className="modal__label" htmlFor="avatar-edit-profile">
        Avatar URL*{" "}
        <input
          className="modal__input"
          type="url"
          id="avatar-edit-profile"
          placeholder="Avatar URL"
          name="avatar"
          value={avatar}
          minLength="1"
          required
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
