import React from 'react';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import InfoTooltip from './InfoTooltip.js'
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Route, Switch, withRouter } from 'react-router-dom';
import * as mestoAuth from '../utils/mestoAuth.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            isRegistrationPopupOpen: false,
            isInfoTooltipGood: true,
            selectedCard: {
                isImagePopupOpen: false,
                cardLink: "",
                cardName: ""
            },
            currentUser: {},
            cards: [],
            loggedIn: false,
            email: "",
            loginEmail: ''
        };
    }


    componentDidMount() {
        this.tokenCheck();
    }
    registrationRequest = (password, email) => {
        mestoAuth.register(password, email).then((resp) => {
            this.suggestLogin(resp.data.email);
            this.infoTooltipOpen(true);
            this.props.history.push('/sign-in');
        }).catch((err) => {
            this.infoTooltipOpen(false);
            console.log(err);
        });
    }
    loginRequest = (password ,email) => {

        mestoAuth.authorize(password, email).then((data) => {
          if (data.token) {
              localStorage.setItem('token', data.token);
    
              this.handleLogin({ email: email });
              this.props.history.push('/');
          } else {
              throw new Error();
          }
      })
          .catch((err) => {
              console.log(err)
          })
            
      }
    tokenCheck = () => {
        const jwt = localStorage.getItem('token');
        if (!jwt) {
            return
        }
        
        const profileProm = mestoAuth.getContent(jwt)

        profileProm.then((res) => {
            if (res) {

                this.setState({
                    loggedIn: true,
                    email: res.data.email
                }, () => {
                    this.props.history.push("/");
                });
            }
        }).catch((err) => {
            console.log(err)
        })

        Promise.all([
            profileProm,
            api.getInitialCards()
        ])
            .then(([profile, card]) => {
                this.setState({ currentUser: profile, cards: card, ready: true })
            })
            .catch((err) => {
                console.log(err);
            })
    }
    suggestLogin = (email) => {
        this.setState({ loginEmail: email })
    }

    handleLogin = ({ email } = {}) => {
        if (!this.state.loggedIn) {
            this.setState({
                email: email,
                loggedIn: true,
                loginEmail: '',
            })
        } else {
            this.setState({
                loggedIn: false,
                email: '',
            }, () => { localStorage.removeItem('token'); })
        }

    }

    handleCardLike = (card, profileId) => {
        const isLiked = card.likes.some(i => i._id === profileId);
        if (isLiked) {
            api.deliteLike(card._id).then(
                (newCard) => {
                    const newCards = this.state.cards.map((c) => c._id === card._id ? newCard : c);
                    this.setState({ cards: newCards })
                }).catch((err) => {
                    console.log(err);
                })
        } else {
            api.addLike(card._id).then(
                (newCard) => {
                    this.setState((state) => ({cards: state.cards.map((c) => c._id === card._id ? newCard : c)}))
                }).catch((err) => {
                    console.log(err);
                })
        }
    }
    handleCardDelete = (card) => {
        api.deliteCard(card._id).then(
            () => {
                const newCards = this.state.cards.filter((c) => c._id === card._id ? false : true);
                this.setState({ cards: newCards })
            }).catch((err) => {
                console.log(err);
            })
    }
    handleAddPlaceSubmit = (card) => {
        api.setNewCard(card.text, card.link).then(
            (newCard) => {
                this.setState({ cards: [newCard, ...this.state.cards] });
                this.closeAllPopups();
            }).catch((err) => {
                console.log(err);
            })
    }

    handleEditAvatarClick = () => {
        this.setState({ isEditAvatarPopupOpen: true });
    };
    handleEditProfileClick = () => {
        this.setState({ isEditProfilePopupOpen: true });
    };
    handleAddPlaceClick = () => {
        this.setState({ isAddPlacePopupOpen: true });
    };
    infoTooltipOpen = (good) => {
        if (good) {
            this.setState({ isRegistrationPopupOpen: true, isInfoTooltipGood: true });
        } else {
            this.setState({ isRegistrationPopupOpen: true, isInfoTooltipGood: false });
        }

    }
    handleCardClick = (link, name) => {
        this.setState({ selectedCard: { isImagePopupOpen: true, cardLink: link, cardName: name } });
    };

    closeAllPopups = () => {
        this.setState({ isEditProfilePopupOpen: false, isAddPlacePopupOpen: false, isEditAvatarPopupOpen: false, selectedCard: { isImagePopupOpen: false, cardLink: "" }, isRegistrationPopupOpen: false });
    };
    handleUpdateUser = (value) => {
        api.setProfileData(value.name, value.about).then((profile) => {
            this.setState({ currentUser: profile })
            this.closeAllPopups();
        }).catch((err) => {
            console.log(err);
        })
    };
    handleUpdateAvatar = (obj) => {
        api.setAvatar(obj.avatar).then((profile) => {
            this.setState({ currentUser: profile })
            this.closeAllPopups();
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        return (
            <div className="body">
                <CurrentUserContext.Provider value={this.state.currentUser}>
                    <div className="page">
                        <Header email={this.state.email} handleLogin={this.handleLogin} />

                        <Switch>


                            <Route path="/sign-up">
                                <Register registrationRequest={this.registrationRequest} />
                            </Route>
                            <Route path="/sign-in">
                                <Login loginRequest={this.loginRequest} suggestedEmail={this.state.loginEmail}/>
                            </Route>

                            <ProtectedRoute
                                path="/"
                                loggedIn={this.state.loggedIn}
                                component={Main}
                                email={this.state.email} cards={this.state.cards} onCardDelete={this.handleCardDelete} onCardLike={this.handleCardLike} onCardClick={this.handleCardClick} onEditAvatar={this.handleEditAvatarClick} onEditProfile={this.handleEditProfileClick} onAddPlace={this.handleAddPlaceClick} />

                        </Switch>

                        <Footer />
                    </div>

                    <InfoTooltip isOpen={this.state.isRegistrationPopupOpen} isGood={this.state.isInfoTooltipGood} closeAllPopups={this.closeAllPopups} />

                    {this.state.ready ? <EditProfilePopup onUpdateUser={this.handleUpdateUser} isOpen={this.state.isEditProfilePopupOpen} closeAllPopups={this.closeAllPopups} />
                        : null}

                    <AddPlacePopup onAddPlace={this.handleAddPlaceSubmit} isOpen={this.state.isAddPlacePopupOpen} closeAllPopups={this.closeAllPopups} />


                    <EditAvatarPopup onUpdateAvatar={this.handleUpdateAvatar} isOpen={this.state.isEditAvatarPopupOpen} closeAllPopups={this.closeAllPopups} />



                    {/* <div className="popup popup_deletion popup_closed">
                        <div className="popup__container">
                            <button className="popup__icon popup__deletion-close-icon popup__close-icon" type="button"></button>
                            <h2 className="popup__title">Вы уверены?</h2>
                            <form className="popup__form" name="editprofile">
                                <button className="popup__button" type="submit">Да</button>
                            </form>
                        </div>
                    </div> */}

                    <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups}></ImagePopup>
                </CurrentUserContext.Provider>
            </div>
        );
    }
}

export default withRouter(App);
