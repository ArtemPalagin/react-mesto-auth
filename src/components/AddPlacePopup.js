import React from 'react';
import PopupWithForm from './PopupWithForm';

class AddPlacePopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            link: ""
        }
    }
    textChange = (e) => {
        this.setState({ text: e.target.value });
    }
    linkChange = (e) => {
        this.setState({ link: e.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // debugger
        this.props.onAddPlace({
            text: this.state.text,
            link: this.state.link
        });
      }

    render() {
        return (
            <PopupWithForm onSubmit={this.handleSubmit} buttonText="Создать" name="places" title="Новое место" isOpen={this.props.isOpen} closeAllPopups={this.props.closeAllPopups}>
                <input className="popup__entry popup__name-places" value={this.state.text} onChange={this.textChange} id="name-input" type="text" placeholder="Название" name="firstname" required minLength="2" maxLength="30" />
                <span className="name-input-error popup__span popup__input-error"></span>
                <input className="popup__entry popup__link-places" value={this.state.link} onChange={this.linkChange} id="link-input" type="url" placeholder="Ссылка на картинку" name="lastname" required />
                <span className="link-input-error popup__span popup__input-error"></span>
            </PopupWithForm>
        )
    }
}
export default AddPlacePopup;