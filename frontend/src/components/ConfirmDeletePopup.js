import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props) {

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onCardDelete(props.card);
  };

  return (
    <PopupWithForm
      name="confirm-delete"
      title="Вы уверены?"
      buttonText="Да"
      loadingButtonText='Удаление...'
      buttonHide={false}
      isLoading={props.isLoading}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default ConfirmDeletePopup;