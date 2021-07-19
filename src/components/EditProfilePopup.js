import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm';

class EditProfilePopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: ""
        }
    }
    static contextType = CurrentUserContext;
    componentDidMount() {
        // debugger
        this.setState({ name: this.context.name, description: this.context.about });
    }
    nameChange = (e) => {
        // debugger
        this.setState({ name: e.target.value });
    }
    descriptionChange = (e) => {
        this.setState({ description: e.target.value });
    }
    handleSubmit = (e) => {

        e.preventDefault();
        
        this.props.onUpdateUser({
            name: this.state.name,
            about: this.state.description
        });
    }
    closePopup = () => {
        this.props.closeAllPopups();

        this.setState({ name: this.context.name, description: this.context.about });
    }
    render() {
        return (
            <PopupWithForm onSubmit={this.handleSubmit} buttonText="Сохранить" name="profile" title="Редактировать профиль" isOpen={this.props.isOpen} onChange={this.nameChange} closeAllPopups={this.closePopup}>
                <input className="popup__entry popup__username-profile" value={this.state.name} onChange={this.nameChange} id="username-input" type="text" placeholder="Имя" name="firstname" required minLength="2" maxLength="40" />
                <span className="username-input-error popup__span popup__input-error"></span>
                <input className="popup__entry popup__himself-profile" value={this.state.description} onChange={this.descriptionChange} id="himself-input" type="text" placeholder="Кем являетесь" name="lastname" required minLength="2" maxLength="200" />
                <span className="himself-input-error popup__span popup__input-error"></span>
            </PopupWithForm>
        )
    }
}
export default EditProfilePopup;