import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  };

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  };
  
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegistration(email, password);
  };

  React.useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input id="email-input" type="email" className="auth__input auth__input_type_email" name="email" placeholder="Email" value={email} onChange={handleChangeEmail} required />
        <span className="auth__input-error email-input-error"></span>
        <input id="password-input" type="password" className="auth__input auth__input_type_password" name="password" placeholder="Пароль" minLength="6" maxLength="20" value={password} onChange={handleChangePassword} required />
        <span className="auth__input-error password-input-error"></span>
        <button type="submit" className="auth__submit-button">Зарегистрироваться</button>
      </form>
      <p className="auth__text">Уже зарегистрированы? <Link className="auth__link" to="/sign-in">Войти</Link></p>
    </section>
  );
};

export default Register;