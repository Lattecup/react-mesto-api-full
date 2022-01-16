import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import { api } from '../utils/Api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isLoadingButtontext, setIsLoadingButtontext] = React.useState(false);
  const [cardToRemove, setCardToRemove] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory();

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleAddPlaceSubmit(data) {
    setIsLoadingButtontext(true);
    api.postCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingButtontext(false);
      });
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleCardDelete(card) {
    setIsLoadingButtontext(true);
    api.removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id))
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingButtontext(false);
      });
  };

  function handleUpdateUser(data) {
    setIsLoadingButtontext(true);
    api.setUserInfo(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingButtontext(false);
      });
  };

  function handleUpdateAvatar(data) {
    setIsLoadingButtontext(true);
    api.changeAvatar(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingButtontext(false);
      });
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  };

  function handleConfirmDeleteClick(card) {
    setCardToRemove(card);
    setIsConfirmDeletePopupOpen(true);
  };

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') 
        closeAllPopups();
      };
      document.addEventListener('keydown', handleEscClose);
      return () => document.removeEventListener('keydown', handleEscClose);
  }, []);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  };

  function handleRegistration(email, password) {
    auth.register(email, password)
    .then(() => {
      setIsSuccess(true);
      history.push('/sign-in');
    })
    .catch((err) => {
      console.log(err);
      setIsSuccess(false);
    })
    .finally(() => {
      setIsInfoTooltipOpen(true);
    });
  };

  function handleAuthorization(email, password) {
    auth.authorize(email, password)
    .then((res) => {
      setLoggedIn(true);
      history.push('/');
      localStorage.setItem('token', res.token);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  React.useEffect(() => {
    function handleTokenCheck() {
      const token = localStorage.getItem('token');
      if (token) {
        auth.checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            history.push('/');
          };
        })
        .catch((err) => {
          console.log(err);
        });
      };
    };
    handleTokenCheck();
  }, [history]);

  function handleSignOut() {
    localStorage.removeItem('token');
    history.push('/sign-in');
    setLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} email={email} onSignOut={handleSignOut}/>
      <Switch>
        <Route path="/sign-up">
          <Register
            onRegistration={handleRegistration}
          />
        </Route>
        <Route path="/sign-in">
          <Login
            onAuthorization={handleAuthorization}
          />
        </Route>
        <ProtectedRoute
          path="/"
          loggedIn={loggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleConfirmDeleteClick}
          cards={cards}
        />
      </Switch>
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoadingButtontext}
      /> 
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoadingButtontext}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoadingButtontext}
      /> 
      <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <ConfirmDeletePopup
        isOpen={isConfirmDeletePopupOpen}
        onClose={closeAllPopups}
        onCardDelete={handleCardDelete}
        card={cardToRemove}
        isLoading={isLoadingButtontext}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        onState={isSuccess}
      />
  </CurrentUserContext.Provider>
  );
};

export default App;