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

  getUserInfo(token) {
    return fetch(this._url + '/users/me', {
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    })
    .then(this._handleResponse);
  };

  setUserInfo(data, token) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._handleResponse);
  };

  getInitialCards(token) {
    return fetch(this._url + '/cards', {
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    })
    .then(this._handleResponse);
  };

  postCard(data, token) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._handleResponse);
  };

  removeCard(id, token) {
    return fetch(this._url + `/cards/${id}`, {
      method: 'DELETE',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    })
    .then(this._handleResponse);
  };

  changeLikeCardStatus(id, isLiked, token) {
    return fetch(this._url + `/cards/${id}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    })
    .then(this._handleResponse);
  };

  setLike(id, token) {
    return fetch(this._url + `/cards/${id}/likes`, {
      method: 'PUT',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    })
    .then(this._handleResponse);
  };

  removeLike(id, token) {
    return fetch(this._url + `/cards/${id}/likes`, {
      method: 'DELETE',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    })
    .then(this._handleResponse);
  };

  changeAvatar(data, token) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._handleResponse);
  };
};

export const api = new Api({
  url: 'https://api.avshchipakina.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json'
  }
});