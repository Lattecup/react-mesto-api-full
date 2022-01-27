import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      
      <section className="profile">
        <div className="profile__avatar-container">
          <button type="button" className="profile__avatar-change-button" aria-label="Изменить аватар" onClick={onEditAvatar} />
          <img alt="Аватар" className="profile__avatar" src={currentUser.avatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button type="button" className="profile__edit-button" aria-label="Редактировать профиль" onClick={onEditProfile} />
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" aria-label="Добавить фотографию" onClick={onAddPlace} />
      </section>

      <section className="cards">
        {cards.map((card) => (
          <Card 
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))};
      </section>

    </main>
  );
};

export default Main;