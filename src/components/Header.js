import logo from '../images/logo.svg';
import { Route, Switch, Link } from 'react-router-dom';

function Header(props) {
    return (
        <header className="header">
            <div className="header__wrapper">
                <img className="header__logo" src={logo} alt="Не получислось загрузить картинку логотипа" />
                <div className="header__link-wrapper">
                    
                    <Switch>
                        <Route path="/sign-up">
                            <Link to="/sign-in" className="header__link">Войти</Link>
                        </Route>
                        <Route path="/sign-in">
                            <Link to="/sign-up" className="header__link">Регистрация</Link>
                        </Route>
                        <Route exact path="/">
                            <p className="header__mail">{props.email}</p>
                            <Link to="/sign-in" onClick={props.handleLogin} className="header__link">Выйти</Link>
                        </Route>
                    </Switch>

                </div>
            </div>
            <div className="header__line"></div>
        </header>
    )
}

export default Header;
