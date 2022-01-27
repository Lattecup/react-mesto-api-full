import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = isOwn ? 'card__remove-button card__remove-button_active' : 'card__remove-button';
  const isLiked = card.likes.some(like => like._id === currentUser._id);
  const cardLikeButtonClassName = isLiked ? 'card__like-button card__like-button_active' : 'card__like-button'; 


  function handleClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleDeleteClick() {
    onCardDelete(card);
  };

  return (
    <div className="card">
      <button type="button" onClick={handleDeleteClick} className={cardDeleteButtonClassName} aria-label="Удалить карточку" />
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
      <div className="card__content">
        <h2 className="card__caption">{card.name}</h2>
        <div className="card__like-container">
          <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName} aria-label="Поставить лайк" />
          <span className="card__like-counter">{card.likes.length}</span>          
        </div>
      </div>
    </div>
  );
};

export default Card;