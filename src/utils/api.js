import {handleStatus} from "./utils.js";

export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        }).then(handleStatus);
    }
    getInitialProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then(handleStatus)
    }
    setProfileData(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then(handleStatus)
    }
    setNewCard(name, link){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(handleStatus)
    }
    deliteCard(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(handleStatus)
    }
    addLike(cardId){
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        }).then(handleStatus)
    }
    deliteLike(cardId){
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(handleStatus)
    }
    setAvatar(link){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        }).then(handleStatus)
    }
}
const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-24",
    headers: {
      authorization: "78888a42-fe2c-4a90-b29f-ece4386d0aa4",
      "Content-Type": "application/json",
    },
  });

 export default api;