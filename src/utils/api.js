import {handleStatus, findToken} from "./utils.js";

export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        // this._headers = options.headers;
        this.contentType = options.contentType;
    }
    
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                'authorization': findToken(),
                'Content-Type': this.contentType
            }
        }).then(handleStatus);
    }
    getInitialProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'authorization': findToken(),
                'Content-Type': this.contentType
            }
        }).then(handleStatus)
    }
    setProfileData(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'authorization': findToken(),
                'Content-Type': this.contentType
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then(handleStatus)
    }
    setNewCard(name, link){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                'authorization': findToken(),
                'Content-Type': this.contentType
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(handleStatus)
    }
    deliteCard(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'authorization': findToken(),
                'Content-Type': this.contentType
            }
        }).then(handleStatus)
    }
    addLike(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                'authorization': findToken(),
                'Content-Type': this.contentType
            }
        }).then(handleStatus)
    }
    deliteLike(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                'authorization': findToken(),
                'Content-Type': this.contentType
            }
        }).then(handleStatus)
    }
    setAvatar(link){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'authorization': findToken(),
                'Content-Type': this.contentType
            },
            body: JSON.stringify({
                avatar: link
            })
        }).then(handleStatus)
    }
}
const api = new Api({
    baseUrl: "//api.plg.mesto.students.nomoredomains.rocks",
    contentType: "application/json",
  });
//   https://mesto.nomoreparties.co/v1/cohort-24
//   78888a42-fe2c-4a90-b29f-ece4386d0aa4

 export default api;