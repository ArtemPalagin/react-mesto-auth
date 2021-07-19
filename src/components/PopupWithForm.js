
function PopupWithForm(props) {

    return (
        <div className={`popup popup_${props.name} ${!props.isOpen ? ('popup_closed') : ('popup_opened')}`}>
            <div className="popup__container">
                <button className={`popup__icon popup__${props.name}-close-icon popup__close-icon`} type="button" onClick={props.closeAllPopups}></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" onSubmit={props.onSubmit} name={props.name}>
                    {props.children}
                    <button className="popup__button" type="submit">{props.buttonText}</button>
                </form>
            </div>
        </div>
    )

}
export default PopupWithForm;