import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  isOpen,
  onLogin,
  closeActiveModal,
  buttonText,
  onLoginClick,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      title="Log in"
      buttonText={buttonText}
      alternativeButtonText="Sign up"
      onAlternativeClick={onLoginClick}
    >
      <label className="modal__label" htmlFor="email-login">
        Email
        <input
          className="modal__input"
          id="email-login"
          type="email"
          placeholder="Email"
          value={email}
          minLength="1"
          maxLength="60"
          required
          onChange={handleEmailChange}
        />
      </label>

      <label className="modal__label" htmlFor="password-login">
        Password
        <input
          className="modal__input"
          id="password-login"
          type="password"
          placeholder="Password"
          value={password}
          minLength="1"
          maxLength="30"
          required
          onChange={handlePasswordChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
