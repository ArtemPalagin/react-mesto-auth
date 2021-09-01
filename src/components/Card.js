import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import binTop from '../images/bin-top.svg';
import binBottom from '../images/bin-bottom.svg'

function Card(props) {
    const contextType = React.useContext(CurrentUserContext);

    // if (!props.card || !props.card.likes) {
    //     debugger
    // }

    const handleLikeClick = () => {
        props.onCardLike(props.card, contextType._id);
    }

    return (
        <div className="element">
            <button className="element__image" onClick={() => props.onCardClick(props.card.link, props.card.name)} style={{ backgroundImage: `url(${props.card.link})` }} type="button"></button>
            {(props.card.owner === contextType._id) ? (
                <button onClick={() => props.onCardDelete(props.card)} className="element__delete-button" type="button">
                    <img className="element__bin_top" src={binTop} alt="Крашка мусорки (Удалить)" />
                    <img className="element__bin_bottom" src={binBottom} alt="Бочонок мусорки (часть кнопки удаления карточки)" />
                </button>) : (<></>)}
            <div className="element__wrapper">
                <h3 className="element__text">{props.card.name}</h3>
                <div className="element__group-wrapper">
                    <button onClick={handleLikeClick} className={`element__group ${(props.card.likes.some(i => i === contextType._id)) ? ("element__group_black") : ("")}`} type="button"></button>
                    <p className="element__group-number">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}
export default Card;