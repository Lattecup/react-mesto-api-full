import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <a href="https://Lattecup.github.io/react-mesto-auth/">
        <img src={logo} className="header__logo" alt="Логотип" />
      </a>
      {props.loggedIn ? (
        <div className="header__content">
          <p className="header__email">{props.email}</p>
          <Link className="header__link header__link_signout" to="/sign-in" onClick={props.onSignOut}>Выйти</Link>
        </div>
      ) : (
        <>
          {location.pathname === "/sign-in" ?
            <Link className="header__link" to="/sign-up">Регистрация</Link> :
            <Link className="header__link" to="/sign-in">Войти</Link>
          }
        </>
      )
      }
    </header>
  );
};

export default Header;
