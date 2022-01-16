import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={props.isOpen ? `popup popup_opened` : `popup popup_type_${props.name}`}>
      <div className="popup__container">
        <form className="form form-edit" name={props.name} onSubmit={props.onSubmit}>
          <h2 className="form__heading">{props.title}</h2>
          {props.children}
          <button type="submit" className="form__submit-button">{props.isLoading ? props.loadingButtonText : props.buttonText}</button>
        </form>
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={props.onClose} />
      </div>
    </div>
  );
};

export default PopupWithForm;