import React from 'react';
import editButton from '../images/edit-button.svg';
import addButton from '../images/add-button.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import Card from './Card.js';

function Main(props) {

    const contextType = React.useContext(CurrentUserContext);






    return (
        <>
            <section className="profile">
                <button className="profile__avatar-button" onClick={props.onEditAvatar} type="button">
                    <div className="profile__avatar-vector-wrapper">
                        <img className="profile__avatar-vector" src={editButton} alt="Изображение не загрузилось" />
                    </div>
                    <img className="profile__avatar" src={contextType.avatar} alt="Не получислось загрузить вашу фотографию" />
                </button>
                <div className="profile__intro">
                    <h1 className="profile__username">{contextType.name}</h1>
                    <button className="profile__edit-button-wrapper" onClick={props.onEditProfile} type="button">
                        <img className="profile__edit-button" src={editButton} alt="Редактировать профиль" />
                    </button>
                    <p className="profile__himself">{contextType.about}</p>
                </div>
                <button className="profile__add-button-wrapper" onClick={props.onAddPlace} type="button">
                    <img className="profile__add-button" src={addButton} alt="Добавить место" />
                </button>
            </section>
            <section className="elements">
                {props.cards.map((card) => (
                    <Card key={card._id} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} onCardClick={props.onCardClick} card={card} />
                ))}
            </section>

        </>
    )

}

export default Main;