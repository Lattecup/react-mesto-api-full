import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      
      <section className="profile">
        <div className="profile__avatar-container">
          <button type="button" className="profile__avatar-change-button" aria-label="Изменить аватар" onClick={props.onEditAvatar} />
          <img alt="Аватар" className="profile__avatar" src={currentUser.avatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button type="button" className="profile__edit-button" aria-label="Редактировать профиль" onClick={props.onEditProfile} />
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" aria-label="Добавить фотографию" onClick={props.onAddPlace} />
      </section>

      <section className="cards">
        {props.cards.map((card) => (
          <Card 
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))};
      </section>

    </main>
  );
};

export default Main;