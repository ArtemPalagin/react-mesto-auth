
function ImagePopup(props) {
    return (
        <div className={`popup image-popup ${!props.card.isImagePopupOpen ? ('popup_closed') : ('popup_opened')}`}>
            <div className="image-popup__wrapper">
                <button className="popup__icon image-popup__close-icon" onClick={props.onClose}></button>
                <img className="image-popup__image" src={props.card.cardLink} alt="Не получислось загрузить картинку места" />
                <h3 className="image-popup__text">{props.card.cardName}</h3>
            </div>
        </div>
    )
}
export default ImagePopup;