import React, { useContext } from "react";
import "./ItemCard.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  const isLiked =
    (currentUser && item?.likes?.some((id) => id === currentUser._id)) || false;

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  console.log({
    itemId: item._id,
    likes: item.likes,
    likesContent: JSON.stringify(item.likes),
    currentUserId: currentUser?._id,
    isLiked,
  });

  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleCardClick}
      />
      {currentUser && (
        <button
          type="button"
          className={itemLikeButtonClassName}
          onClick={handleLike}
        />
      )}
    </li>
  );
}

export default ItemCard;
