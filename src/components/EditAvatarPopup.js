import React from 'react';
import PopupWithForm from './PopupWithForm';

class EditAvatarPopup extends React.Component {
    constructor(props) {
        super(props);
        this.avatarRef = React.createRef();
    }
    handleSubmit = (e) => {
        e.preventDefault();
      
        this.props.onUpdateAvatar({
          avatar: this.avatarRef.current.value
        });
        this.avatarRef.current.value = "";
      }
      closePopup = () => {
        this.props.closeAllPopups();
        this.avatarRef.current.value = "";
      }
    render() {
        return (
            <PopupWithForm onSubmit={this.handleSubmit} buttonText="Сохранить" name="avatar" title="Обновить аватар" isOpen={this.props.isOpen} closeAllPopups={this.closePopup}>
                <input className="popup__entry" ref={this.avatarRef} id="avatar-input" type="text" placeholder="ссылка на фото" name="firstname" required />
                <span className="avatar-input-error popup__span popup__input-error"></span>
            </PopupWithForm>
        )
    }
}
export default EditAvatarPopup;