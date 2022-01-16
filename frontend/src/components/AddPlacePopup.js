import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  };

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: name,
      link: link
    });
  };

  React.useEffect(() => {
    if (!props.isOpen) {
      setName('');
      setLink('');    
    };
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText='Сохранить'
      loadingButtonText='Сохранение...'
      buttonHide={false}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <input id="place-input" type="text" className="form__input form__input_type_place" name="place" placeholder="Название" minLength="2" maxLength="30" value={name} onChange={handleChangeName} required />
      <span className="form__input-error place-input-error"></span>
      <input id="link-input" type="url" className="form__input form__input_type_link" name="link" placeholder="Ссылка на картинку" value={link} onChange={handleChangeLink} required />
      <span className="form__input-error link-input-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;