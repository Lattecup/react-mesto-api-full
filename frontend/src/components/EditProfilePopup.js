import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(evt) {
    setName(evt.target.value);
  };

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  };

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name)
      setDescription(currentUser.about)
    };
  }, [currentUser, props.isOpen]);

   return (
    <PopupWithForm 
      name="edit-profile"
      title="Редактировать профиль"
      buttonText='Сохранить'
      loadingButtonText='Сохранение...'
      buttonHide={false}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <input id="name-input" type="text" className="form__input form__input_type_title" name="name" placeholder="Введите имя" required minLength="2" maxLength="40" value={name || ''} onChange={handleChangeName} />
      <span className="form__input-error name-input-error"></span>
      <input id="job-input" type="text" className="form__input form__input_type_subtitle" name="description" placeholder="Введите профессию" required minLength="2" maxLength="200" value={description || ''} onChange={handleChangeDescription} />
      <span className="form__input-error job-input-error"></span>
  </PopupWithForm>
  )
};

export default EditProfilePopup;