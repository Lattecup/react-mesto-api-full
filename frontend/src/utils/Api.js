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

  setJwt(jwt) {
    this._jwt = jwt;
  };

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      credentials: 'include',
      headers: {
        ...this._headers,
        token: this._jwt || localStorage.getItem('jwt'),
      }
    })
    .then(this._handleResponse);
  };

  setUserInfo(data) {
    return fetch(this._url + '/users/me', {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        ...this._headers,
        token: this._jwt || localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._handleResponse);
  };

  getInitialCards() {
    return fetch(this._url + '/cards', {
      credentials: 'include',
      headers: {
        ...this._headers,
        token: this._jwt || localStorage.getItem('jwt'),
      }
    })
    .then(this._handleResponse);
  };

  postCard(data) {
    return fetch(this._url + '/cards', {
      credentials: 'include',
      method: 'POST',
      headers: {
        ...this._headers,
        token: this._jwt || localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._handleResponse);
  };

  removeCard(id) {
    return fetch(this._url + `/cards/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        ...this._headers,
        token: this._jwt || localStorage.getItem('jwt'),
      }
    })
    .then(this._handleResponse);
  };

  changeLikeCardStatus(id, isLiked) {
    return fetch(this._url + `/cards/likes/${id}`, {
      credentials: 'include',
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
        ...this._headers,
        token: this._jwt || localStorage.getItem('jwt'),
      }
    })
    .then(this._handleResponse);
  };

  setLike(id) {
    return fetch(this._url + `/cards/likes/${id}`, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        ...this._headers,
        token: this._jwt || localStorage.getItem('jwt'),
      }
    })
    .then(this._handleResponse);
  };

  removeLike(id) {
    return fetch(this._url + `/cards/likes/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        ...this._headers,
        token: this._jwt || localStorage.getItem('jwt'),
      }
    })
    .then(this._handleResponse);
  };

  changeAvatar(data) {
    return fetch(this._url + '/users/me/avatar', {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        ...this._headers,
        token: this._jwt || localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._handleResponse);
  };
};

export const api = new Api({
  url: 'https://api.avshchipakina.nomoredomains.rocks',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});