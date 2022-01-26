import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  };

  React.useEffect(() => {
    if (!props.isOpen) {
      avatarRef.current.value = '';
    };
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      buttonText='Сохранить'
      loadingButtonText='Сохранение...'
      buttonHide={false}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <input id="avatar-input" type="url" className="form__input form__input_type_link" name="link" placeholder="Ссылка на картинку" ref={avatarRef} required />
      <span className="form__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;