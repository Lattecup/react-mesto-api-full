class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  };

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    };

    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      headers: this._headers,
    })
    .then(this._handleResponse);
  };

  setUserInfo(data) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._handleResponse);
  };

  getInitialCards() {
    return fetch(this._url + '/cards', {
      headers: this._headers,
    })
    .then(this._handleResponse);
  };

  postCard(data) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._handleResponse);
  };

  removeCard(id) {
    return fetch(this._url + `/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._handleResponse);
  };

  changeLikeCardStatus(id, isLiked) {
    return fetch(this._url + `/cards/likes/${id}`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
    })
    .then(this._handleResponse);
  };

  setLike(id) {
    return fetch(this._url + `/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._handleResponse);
  };

  removeLike(id) {
    return fetch(this._url + `/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers, 
    })
    .then(this._handleResponse);
  };

  changeAvatar(data) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._handleResponse);
  };
};

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-28',
  headers: {
    authorization: 'd5f4b13b-5ee9-4277-b0be-f215cd379279',
    'Content-Type': 'application/json'
  }
});