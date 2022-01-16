import React from 'react';

function ImagePopup(props) {
  return (
    <div className={props.card ? `popup popup_opened` : `popup popup popup_type_image`}>
      <div className="popup__figure-container">
        <figure className="popup__figure">
          <img src={props.card ? props.card.link : '#'} alt="Изображение" className="popup__image" />
          <figcaption className="popup__image-caption">{props.card ? props.card.name : 'Изображение'}</figcaption>
        </figure>
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </div>
  );
};

export default ImagePopup;