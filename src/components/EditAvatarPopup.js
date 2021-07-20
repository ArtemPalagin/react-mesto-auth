import React from 'react';
import PopupWithForm from './PopupWithForm';

class EditAvatarPopup extends React.Component {
    constructor(props) {
        super(props);
        this.avatarRef = React.createRef();
    }
    componentDidUpdate(){
      // Я конечно сделал обнуление попапа при его открытии, но попап же закроется при 
      // if(this.props.isOpen){
      //   this.avatarRef.current.value = "";
      // }
      
    }
    handleSubmit = (e) => {
        e.preventDefault();
      
        this.props.onUpdateAvatar({
          avatar: this.avatarRef.current.value
        });
        this.avatarRef.current.value = "";
      }
    render() {
        return (
            <PopupWithForm onSubmit={this.handleSubmit} buttonText="Сохранить" name="avatar" title="Обновить аватар" isOpen={this.props.isOpen} closeAllPopups={this.props.closeAllPopups}>
                <input className="popup__entry" ref={this.avatarRef} id="avatar-input" type="url" placeholder="ссылка на фото" name="firstname" required />
                <span className="avatar-input-error popup__span popup__input-error"></span>
            </PopupWithForm>
        )
    }
}
export default EditAvatarPopup;