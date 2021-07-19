import cross from '../images/cross.svg';
import checkMark from '../images/check-mark.svg'

function InfoTooltip(props){
    return(
        <div className={`popup infoTooltip ${!props.isOpen ? ('popup_closed') : ('popup_opened')}`}>
        <div className="popup__container">
            <button className={`popup__icon popup__close-icon`} type="button" onClick={props.closeAllPopups}></button>
            <img className="infoTooltip__image" src={props.isGood ? checkMark : cross} alt={props.isGood ? "галочка" : "крестик"} />
            <h2 className="infoTooltip__info">{props.isGood ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
        </div>
    </div>
    )
}
export default InfoTooltip;